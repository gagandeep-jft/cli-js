import { existsSync, mkdirSync, lstatSync } from "fs";
import { exit } from "process";

if (process.argv.length <= 2) {
  console.log("Usage: node md.js <path>");
  process.exit(1);
}

let path = process.argv[2];

if (existsSync(path)) {
  if (lstatSync(path).isFile) {
    console.log(
      "[Error] File with same name already exists, can't create new directory!"
    );
  } else {
    console.log("[Error] Directory already exists!");
  }
  exit(1);
} else {
  mkdirSync(path, { recursive: true });
}
