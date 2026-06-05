import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse } from "yaml";

const [schemaPath, dataDir] = process.argv.slice(2);

if (!schemaPath || !dataDir) {
  console.error("Usage: node scripts/validate-yaml-schema.mjs <schema.json> <data-dir>");
  process.exit(2);
}

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(schema);
const yamlFiles = fs
  .readdirSync(dataDir)
  .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
  .sort();

let hasErrors = false;

for (const file of yamlFiles) {
  const filePath = path.join(dataDir, file);
  const data = parse(fs.readFileSync(filePath, "utf8"));

  if (validate(data)) {
    console.log(`${filePath} valid`);
    continue;
  }

  hasErrors = true;
  console.error(`${filePath} invalid`);

  for (const error of validate.errors ?? []) {
    const location = error.instancePath || "/";
    console.error(`  ${location} ${error.message}`);
  }
}

if (hasErrors) {
  process.exit(1);
}
