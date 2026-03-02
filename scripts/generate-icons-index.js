import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "../src/assets/icons");
const files = fs.readdirSync(iconsDir).filter((f) => f.endsWith(".svg"));

function toPascalCase(str) {
  return str
    .replace(/[-_\s]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

const imports = [];
const exports = [];

for (const file of files) {
  const baseName = path.basename(file, ".svg");
  const componentName = toPascalCase(baseName) + "Icon";
  const importPath = `@/assets/icons/${file}`;
  imports.push(`import ${componentName} from "${importPath}";`);
  exports.push(`  ${componentName},`);
}

const content = `/**
 * Custom icon library - icons from designer
 * Usage: import { AddIcon, SearchIcon } from "@/components/icons"
 */

${imports.join("\n")}

export {
${exports.join("\n")}
};
`;

const outputDir = path.join(__dirname, "../src/components/icons");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.ts"), content);

console.log(`Generated icons index with ${files.length} icons`);
