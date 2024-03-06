const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = decodeURIComponent(partArray[1]);
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let title = "Fill out this form to be added to our mailing list for magazine subscriptions.";
let message = "Thank you for your submission!";
let fname = "";
let lname = "";
let item = "";
let address = "";
let state = "";
let zip = ""

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center; /* Center align all text */
       }
     h2 {
        color: #333; /* Set color for headings */
      }
     h3 {
        color: #666; /* Set color for paragraphs */
      }
      .form-container {
        display: flex;
        flex-direction: column; /* Arrange items vertically */
        align-items: center; /* Center align items horizontally */
      }
      input {
        width: 30%; /* Set width of input fields */
        padding: 5px;
        margin: 5px;
        text-align: center; /* Center align text within input fields */
      }
      button {
        width: 10%;
        padding: 10px;
        margin: 10px;
      }
 
    </style>
    </head>
  <body>
  <h2>${title}</h2>
  <form method="POST">
    First Name:<input name ="fname" type = "text"></input><br>
    Last Name: <input name ="lname" type = "text"></input><br>
    Address: <input name = "address" type = "text"></input><br>
    State: <input name = "state" type = "text"></input><br>
    Zip: <input name = "zip" type = "number"></input><br>
    Magazine Name: <input name="item"></input><br>
  <button type="submit">Submit</button>
  </form>
  </body>
  </html>
  `;
};

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      if (body.fname && body.lname && body.item && body.address && body.state && body.zip) {
        fname = body.fname;
        lname = body.lname;
        item = body.item;
        address = body.address;
        state  = body.state;
        zip = body.zip
        console.log("first name:", fname)
        console.log("Last name:", lname)
        console.log("Magazine name:", item)
        
       // Send the updated form with the submitted data
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.write(form());
       res.end( 
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${message}</title>
        <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center; /* Center align all text */
             }
           h2 {
              color: #333; /* Set color for headings */
            }
           h3 {
              color: #666; /* Set color for paragraphs */
            }
          </style>
          </head>
       <body>
       <h2>${message}</h2>
       <h3>${fname} ${lname} Has been submitted to recieve ${item} Magazine within the next few weeks 
       to ${address.replace(/\+/g, ' ')} ${state} ${zip} !!</h3>
       </body>
       </html>
       `);
     } else {
       console.log("Incomplete data provided.")
       res.writeHead(400, { 'Content-Type': 'text/plain' });
       res.end('Incomplete data provided.');
     }
   });
   
 } 
 else {
   // Send the initial form
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.write(form());
   res.end();
 }
});

server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});  

server.listen(3000);
console.log("The server is listening on port 3000.");
