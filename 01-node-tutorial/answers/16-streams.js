const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size
const stream = createReadStream('../content/big.txt', { highWaterMark: 200, encoding: 'utf8'} )
let counter = 0;

stream.on('data', (chunk) => {
    counter++;
    console.log('Chunk number:', counter);
    console.log('Received chunk:', chunk);
});

stream.on('end', () => {
    // Report the number of chunks received
    console.log('Number of chunks received:', counter);
});

stream.on('error', (err) => {
    // Log any errors to the console
    console.error('An error occurred:', err);
});