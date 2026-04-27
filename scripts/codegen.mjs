/**
 * Codegen: generates TypeScript types and Python Pydantic models from JSON Schema.
 * Single source of truth — edit the schemas, run `node scripts/codegen.mjs`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Schema loading ────────────────────────────────────────────────────────────

const modelSchema = JSON.parse(
  fs.readFileSync(path.join(ROOT, "model-metadata.schema.json"), "utf8"),
);
const providerSchema = JSON.parse(
  fs.readFileSync(path.join(ROOT, "provider.schema.json"), "utf8"),
);

// ─── Helpers ───────────────────────────────────────────────────────────────────

function upperFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toPascalCase(s) {
  return s
    .split("_")
    .map((part) => upperFirst(part))
    .join("");
}

function isRequired(schema, key) {
  return schema.required?.includes(key);
}

// ─── TypeScript codegen ───────────────────────────────────────────────────────

function tsEnumType(key, prop, enums) {
  if (prop.enum) {
    enums.set(upperFirst(key), prop.enum);
  }
}

function tsFieldType(key, prop, defs) {
  if (prop.$ref) {
    const ref = prop.$ref.replace("#/$defs/", "");
    return upperFirst(ref);
  }
  if (prop.type === "string") {
    return prop.enum ? upperFirst(key) : "string";
  }
  if (prop.type === "number" || prop.type === "integer") return "number";
  if (prop.type === "boolean") return "boolean";
  if (prop.type === "array") return "unknown[]";
  if (prop.type === "object") return "Record<string, unknown>";
  return "unknown";
}

function buildTsInterface(name, schema, enums, defs) {
  const lines = [`export interface ${name} {`];
  for (const [key, prop] of Object.entries(schema.properties ?? {})) {
    if (prop.$ref) continue;
    const opt = isRequired(schema, key) ? "" : "?";
    lines.push(`  ${key}${opt}: ${tsFieldType(key, prop, defs)};`);
  }
  lines.push("}");
  return lines.join("\n");
}

const tsEnums = new Map();
const tsDefs = new Map();
const tsInterfaces = new Map();

// Collect enums
for (const [key, prop] of Object.entries(modelSchema.properties ?? {})) {
  tsEnumType(key, prop, tsEnums);
}
for (const [key, prop] of Object.entries(providerSchema.properties ?? {})) {
  tsEnumType(key, prop, tsEnums);
}

// Build $defs interfaces
for (const [name, def] of Object.entries(modelSchema.$defs ?? {})) {
  const tsName = upperFirst(name);
  const lines = [`export interface ${tsName} {`];
  for (const [key, prop] of Object.entries(def.properties ?? {})) {
    const opt = def.required?.includes(key) ? "" : "?";
    lines.push(`  ${key}${opt}: ${tsFieldType(key, prop, tsDefs)};`);
  }
  lines.push("}");
  tsDefs.set(tsName, lines.join("\n"));
}

tsInterfaces.set("ModelMetadata", buildTsInterface("ModelMetadata", modelSchema, tsEnums, tsDefs));
tsInterfaces.set("ProviderMetadata", buildTsInterface("ProviderMetadata", providerSchema, tsEnums, tsDefs));

const tsLines = [
  "/** Generated from JSON Schema — do not edit manually */",
  "",
  "// --- Enums ---",
];
for (const [name, values] of tsEnums) {
  tsLines.push(`export type ${name} = ${values.map((v) => `'${v}'`).join(" | ")};`);
}

tsLines.push("");
tsLines.push("// --- $defs ---");
for (const [, src] of tsDefs) {
  tsLines.push(src);
  tsLines.push("");
}

tsLines.push("// --- Schema types ---");
tsLines.push(tsInterfaces.get("ModelMetadata"));
tsLines.push("");
tsLines.push(tsInterfaces.get("ProviderMetadata"));

const tsOutput = tsLines.join("\n") + "\n";

// ─── Python codegen ───────────────────────────────────────────────────────────

function pyField(key, prop, required) {
  const req = required.includes(key);
  let ann;

  if (prop.$ref) {
    ann = upperFirst(prop.$ref.replace("#/$defs/", ""));
  } else if (prop.type === "string") {
    ann = prop.enum
      ? "Literal[" + prop.enum.map((v) => `'${v}'`).join(", ") + "]"
      : "str";
  } else if (prop.type === "number" || prop.type === "integer") {
    ann = "float";
  } else if (prop.type === "boolean") {
    ann = "bool";
  } else if (prop.type === "array") {
    ann = "list";
  } else if (prop.type === "object") {
    ann = "dict";
  } else {
    ann = "Any";
  }

  if (!req) {
    if (prop.type === "array") return `    ${key}: list | None = None`;
    if (prop.type === "object") return `    ${key}: dict | None = None`;
    return `    ${key}: ${ann} | None = None`;
  } else {
    if (prop.type === "array") return `    ${key}: list = Field()`;
    if (prop.type === "object") return `    ${key}: dict = Field()`;
    return `    ${key}: ${ann}`;
  }
}

const pyLines = [
  "# Generated from JSON Schema — do not edit manually",
  "",
  "from __future__ import annotations",
  "",
  "from typing import Any",
  "from pydantic import BaseModel, Field",
  "",
];

// $defs first (e.g. ProviderReference)
for (const [name, def] of Object.entries(modelSchema.$defs ?? {})) {
  const className = upperFirst(name);
  pyLines.push(`class ${className}(BaseModel):`);
  const req = def.required ?? [];
  for (const [k, v] of Object.entries(def.properties ?? {})) {
    pyLines.push(pyField(k, v, req));
  }
  pyLines.push("");
}

const modelReq = modelSchema.required ?? [];
pyLines.push("class ModelMetadata(BaseModel):");
pyLines.push('    """Generated from model-metadata.schema.json"""');
for (const [key, prop] of Object.entries(modelSchema.properties ?? {})) {
  if (prop.$ref) continue;
  pyLines.push(pyField(key, prop, modelReq));
}

const providerReq = providerSchema.required ?? [];
pyLines.push("");
pyLines.push("class ProviderMetadata(BaseModel):");
pyLines.push('    """Generated from provider.schema.json"""');
for (const [key, prop] of Object.entries(providerSchema.properties ?? {})) {
  if (prop.$ref) continue;
  pyLines.push(pyField(key, prop, providerReq));
}

const pyOutput = pyLines.join("\n") + "\n";

// ─── Write outputs ───────────────────────────────────────────────────────────

const tsOut = path.join(ROOT, "packages/typescript/src/generated/types.ts");
const pyOut = path.join(ROOT, "packages/python/model_metadata/generated/models.py");

fs.writeFileSync(tsOut, tsOutput);
fs.writeFileSync(pyOut, pyOutput);

console.log(`Wrote ${tsOut}`);
console.log(`Wrote ${pyOut}`);