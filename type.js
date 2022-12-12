import { promises as fs } from "fs";

async function readfile(filename) {
  let status = await fs.stat(filename);
  if (status.isFile()) console.log(await fs.readFile(filename, "utf8"));
  else {
    console.log("[Error] File does not exist! Exiting...");
    process.exit(1);
  }
}
if (process.argv.length <= 2) {
  console.log("Usage: node type.js <filename>");
  process.exit(1);
}

let filename = process.argv[2];
readfile(filename);
