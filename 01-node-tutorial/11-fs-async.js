const { readFile, writeFile } = require('fs');
const path = require('path');

console.log('start');

// Read the first file
readFile(path.join(__dirname, 'content', 'first.txt'), 'utf8', (err, first) => {
  if (err) {
    console.log(err);
    return;
  }
console.log(first);
  // Read the second file
  readFile(path.join(__dirname, 'content', 'second.txt'), 'utf8', (err, second) => {
    if (err) {
      console.log(err);
      return;
    }
console.log(second)
    // Write the result to a new file
    writeFile(
      path.join(__dirname, 'content', 'result-async.txt'),
      `Here is the result: ${first}, ${second}`,
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('done with this task');
      }
    );
  });
});

console.log('starting next task');
