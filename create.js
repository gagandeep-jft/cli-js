import { appendFileSync } from "fs";
import { stdin as input, stdout as output } from "process";
import * as ReadLine from "readline";

if (process.argv.length <= 2) {
  console.log("Usage: node create.js <filename>");
  process.exit(1);
}

let filename = process.argv[2];

const rl = ReadLine.createInterface({ input, output });

rl.question("Write Stuff: [Press CTRL+C to save and exit!]");

rl.on("SIGINT", () => {
  console.log("Writing", rl.history.length, "lines in", filename);

  for (let i = rl.history.length - 1; i >= 0; i--) {
    appendFileSync(filename, rl.history[i] + "\n");
  }
  console.log("Success] Content Saved! Exiting...");
  process.exit(0);
});
