import { promises as fs } from "fs";
const [mkdir, readdir, copyFile, stat] = [
  fs.mkdir,
  fs.readdir,
  fs.copyFile,
  fs.stat,
];
import path from "path";

const copyDirectory = async (source, destination) => {
  source = path.resolve(source);
  destination = path.resolve(destination);

  if (destination == source){
    return;
  }
  if (stat(source).isFile) {
    await copyFile(source, destination);
    return;
  }
  await mkdir(destination);

  let dir = await readdir(source, { withFileTypes: true });

  dir.forEach(async (entry) => {
    let sourcePath = path.join(source, entry.name);
    let destinationPath = path.join(destination, entry.name);

    entry.isDirectory()
      ? await copyDirectory(sourcePath, destinationPath)
      : await copyFile(sourcePath, destinationPath);
  });
};

if (process.argv.length !== 4) {
  console.log("Usage: node cp.js <source_path> <destination_path>");
  process.exit(1);
}

let source = process.argv[2];
let destination = process.argv[3];

copyDirectory(source, destination);
