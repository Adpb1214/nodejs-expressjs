const express=require("express")
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("hello this is homepage")
  })
  router.get("/about",(req,res)=>{
    res.send("hello this is about page")
  })
  router.get("/contact",(req,res)=>{
    res.send("hello this is contact page")
  })
  router.get("/services", (req, res) => {
    res.send("We provide fullstack development services!");
  });

  
  router.post("/login",(req,res)=>{
    const {username,email,password}=req.body;
    console.log(username,password,email)
    res.send(`hello ${username} your email is ${email} your password is ${password}`)
  })
  router.get("/form", (req, res) => {
    res.send(`
      <form action="/submit-form" method="POST">
        <input name="username" placeholder="Enter your name" />
        <input name="email" placeholder="Enter your email" />
        <input name="password" placeholder="Enter your password" type="password" />
        <button type="submit">Submit</button>
      </form>
    `);
  });
  router.post("/submit-form", (req, res) => {
    const { username, email, password } = req.body;
    console.log("Form submitted:", username, email, password);
    res.send(`Welcome ${username}! We received your email: ${email}`);
  });
  router.get("/styled-form", (req, res) => {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/style.css" />
          <script src="/script.js"></script>
        </head>
        <body>
          <h1>Styled Form</h1>
          <form action="/submit-form" method="POST">
            <input name="username" placeholder="Enter your name" />
            <input name="email" placeholder="Enter your email" />
            <input name="password" placeholder="Enter your password" type="password" />
            <button type="submit">Submit</button>
          </form>
          <img src="/funny.png" width="200"/>
        </body>
      </html>
    `);
  });
  
  
  
  router.get("/error-demo", (req, res) => {
    throw new Error("Intentional test error"); // triggers 500
  });
  module.exports=router