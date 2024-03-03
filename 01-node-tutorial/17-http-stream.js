var http = require('http')
var fs = require('fs')
const { file } = require('loader')
let counter = 0;
http
  .createServer(function (req, res) {
    // const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)
    const fileStream = fs.createReadStream('./content/big.txt', { encoding: 'utf8', highWaterMark: 10 });
   
    fileStream.on('data', (chunk) => {
      counter++;
      console.log('Chunk number:', counter);
      console.log('Received chunk:', chunk);
  });
  
  fileStream.on('error', (err) => {
    res.end(err)
  })
    fileStream.on('open', () => {
      fileStream.pipe(res)
      // console.log(fileStream);
    })


  })
  .listen(5000)
