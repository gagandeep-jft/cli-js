import { access, mkdir, constants } from "fs";
import path from "path";

let c = 0;

const frequencyOf = (c, string) => {
  let frequency = 0;
  for (let i = 0; i < string.length; i++) {
    if (c == string[i]) {
      frequency++;
    }
  }
  return frequency;
};

const mkdirAsync = async (source) => {
  source = path.resolve(source);
  if (c++ == 3) {
    return;
  }
  let paths = [source];
  let numDirs = frequencyOf(path.sep, source);
  for (let i = 0; i < numDirs; i++) {
    paths.unshift(
      source.slice(
        0,
        source.length -
          source
            .split(path.sep)
            .splice(numDirs - i)
            .join(path.sep).length
      )
    );
    // console.log(source.split(path.sep));
  }
  // console.log(paths);
  paths.forEach(async (dirPath) => {
    try {
      access(dirPath, constants.R_OK);
    } catch (err) {
      mkdir(dirPath, (result) => {
        if (result == null) {
          // success
          console.log(`Creating dir: ${dirPath}`);
        }
      });
    }
  });
};

if (process.argv.length <= 2) {
  console.log("Usage: node md.js <path>");
  process.exit(1);
}

let source = process.argv[2];
// console.log(source);
mkdirAsync(source).catch((err) => console.error(err));
