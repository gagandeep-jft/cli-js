import { promises as fs } from "fs";

const [readdir, unlink, stat, rmdir] = [
  fs.readdir,
  fs.unlink,
  fs.stat,
  fs.rmdir,
];

import path from "path";

const rmDirAsync = async (source) => {
  console.log("reading from", source);

  let entries = await readdir(source, { withFileTypes: true });

  for await (const entry of entries) {
    let sourcePath = path.join(source, entry.name);
    let status = await stat(sourcePath);
    if (status.isFile()) {
      unlink(sourcePath);
    } else {
      await rmDirAsync(sourcePath);
    }
  }
  // console.log(source)
  await rmdir(source);

  console.log(source, "deleted!");
};

if (process.argv.length <= 2) {
  console.log("Usage: node rd.js <source_path>");
  process.exit(1);
}

let source = process.argv[2];
rmDirAsync(source);
