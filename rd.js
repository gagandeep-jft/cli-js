import { existsSync, rmdirSync, unlinkSync, readdirSync, statSync } from "fs";
import path from "path";

const rmDir = (source) => {
  if (statSync(source).isFile()) {
    // copyFileSync(source);
    unlinkSync(source);
    return;
  }
  readdirSync(source, { withFileTypes: true }).forEach((entry) => {
    let sourcePath = path.join(source, entry.name);
    rmDir(sourcePath);
  });
  rmdirSync(source);
};

if (process.argv.length <= 2) {
  console.log("Usage: node rd.js <source_path>");
  process.exit(1);
}

let source = process.argv[2];

if (!existsSync(source)) {
  console.log(`[Error] Destination path not found "${source}"`);
  process.exit(1);
}

rmDir(source);
