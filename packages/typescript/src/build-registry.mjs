/**
 * Build script: compiles models/*.yaml and providers/*.yaml to JSON registries.
 * Run via `pnpm build:registry` or `pnpm prepare`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYAML } from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 3 levels up from src/ → repo root
const repoRoot = path.resolve(__dirname, "../../../");

const MODELS_DIR = path.join(repoRoot, "models");
const PROVIDERS_DIR = path.join(repoRoot, "providers");
const SRC_DIR = __dirname;
const OUT_MODELS = path.join(SRC_DIR, "registry.json");
const OUT_PROVIDERS = path.join(SRC_DIR, "providers.json");

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) =>
      parseYAML(fs.readFileSync(path.join(dir, f), "utf8")),
    );
}

const models = readDir(MODELS_DIR);
const providers = readDir(PROVIDERS_DIR);

fs.writeFileSync(OUT_MODELS, JSON.stringify(models, null, 2));
fs.writeFileSync(OUT_PROVIDERS, JSON.stringify(providers, null, 2));

console.log(`Wrote ${models.length} models, ${providers.length} providers`);