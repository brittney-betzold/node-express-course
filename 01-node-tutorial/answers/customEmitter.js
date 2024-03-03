const http = require('http');
const EventEmitter = require('events');
const customEmitter = new EventEmitter();

customEmitter.on('response', (name, email, id) => {
    console.log(`data recieved user: ${name}, Email : ${email} with id:${id}`)
  })
  
  const funCoding = async () => {
    try{
        console.log('Executing funCoding...')
        await new Promise(resolve => setTimeout(resolve, 2000));
        customEmitter.emit('funCodingCompleted', "Learning about emitters", "March First")
    }catch(error){
        console.log('an error has occured in funCoding:', error);
    }
  };

funCoding();

customEmitter.on('funCodingCompleted', (lesson, date) => {
    console.log('funCoding has completed !', lesson, date)

});
  
  customEmitter.emit('response', 'Brittney', 'brittney.betzold2022@gmail.com', 22)

  const server = http.createServer();
  server.on('request', (req,res) => {
    res.end('Welcome ! ');
  })
  server.listen(1000);