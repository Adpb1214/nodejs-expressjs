const http = require("http");
const fs = require("fs");
const { URLSearchParams } = require("url");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html"); 
    res.write(`<!DOCTYPE html>`); 
    res.write(`<html>`); 
    res.write(`<head><title>Simple Form</title></head>`); 
    res.write(`<body>`); 
    res.write(`<form action="/submit" method="POST">`);
    res.write(
      '<input type="text" name="name" placeholder="Enter your name" required><br><br>'
    ); 
    res.write(
      '<input type="text" name="surname" placeholder="Enter your surname" required><br><br>'
    ); 
    res.write(
      '<input type="email" name="email" placeholder="Enter your email" required><br><br>'
    ); 

    res.write('<label for="male">Male</label>'); 
    res.write('<input type="radio" id="male" name="gender" value="male"><br>');   

    res.write('<label for="female">Female</label>');        
    res.write(
      '<input type="radio" id="female" name="gender" value="female"><br><br>'
    );  

    res.write('<button type="submit">Submit</button>'); 
    res.write(`</form>`); 
    res.write(`</body>`); 
    res.write(`</html>`); 
    return res.end(); // Send response after all res.write() calls
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end",()=>{
      const fullbody=Buffer.concat(body).toString()
      console.log(fullbody)
      const parmas=new URLSearchParams(fullbody)
      const fullbodyprint=Object.fromEntries(parmas)
      console.log(fullbodyprint)
      fs.appendFileSync(
        "userdata.txt",
        `\n----- New Entry -----\n${JSON.stringify(fullbodyprint, null, 2)}\n----------------------\n`
      );
      
    })

    res.statusCode = 302;
    res.setHeader("Location", "/");
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Complete Coding</title></head>");
  res.write("<body><h1>Like / Share / Subscribe</h1></body>");
  res.write("</html>");
  res.end();
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
