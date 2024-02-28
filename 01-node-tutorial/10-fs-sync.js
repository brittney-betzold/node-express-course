const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

console.log('start');
// Would not execute:
// const first = readFileSync('./content/first.txt','utf-8');
const firstFilePath = path.join(__dirname, 'content', 'first.txt');
const secondFilePath = path.join(__dirname, 'content', 'second.txt');
const resultFilePath = path.join(__dirname, 'content', 'results.txt');

const first = readFileSync(firstFilePath, 'utf-8');
const second = readFileSync(secondFilePath, 'utf-8');

console.log(first, second);

writeFileSync(
  resultFilePath,
  `Here is the result: ${first}, ${second}\n`,
  { flag: 'a' }
);

console.log('done with this task');
console.log('starting the next one');

