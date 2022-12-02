import { existsSync, readFileSync, lstatSync } from "fs";

if (process.argv.length <= 2) {
  console.log("Usage: node type.js <filename>");
  process.exit(1);
}

let filename = process.argv[2];

if (existsSync(filename) && lstatSync(filename).isFile) {
  console.log(readFileSync(filename, "utf8"));
} else {
  console.log("[Error] File does not exist! Exiting...");
  process.exit(1);
}
