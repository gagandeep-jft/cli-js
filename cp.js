import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from "fs";
import path from "path";

const copyDirectory = (source, destination) => {
  source = path.resolve(source);
  destination = path.resolve(destination);

  if (!existsSync(destination)) {
    if (statSync(source).isFile()) {
      copyFileSync(source, destination);
      return;
    }
    mkdirSync(destination);

    readdirSync(source, { withFileTypes: true }).forEach((entry) => {
      let sourcePath = path.join(source, entry.name);
      let destinationPath = path.join(destination, entry.name);

      entry.isDirectory()
        ? copyDirectory(sourcePath, destinationPath)
        : copyFileSync(sourcePath, destinationPath);
    });
  }
};

if (process.argv.length !== 4) {
  console.log("Usage: node cp.js <source_path> <destination_path>");
  process.exit(1);
}

let source = process.argv[2];
let destination = process.argv[3];

if (!(existsSync(source) && !existsSync(destination))) {
  if (!existsSync(source)) {
    console.log(`[Error] Cannot find source path "${source}"`);
  } else {
    console.log(`[Error] Destination path already exists "${destination}"`);
  }
  process.exit(1);
}

copyDirectory(source, destination);
