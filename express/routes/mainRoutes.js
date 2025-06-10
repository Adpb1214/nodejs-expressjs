const express=require("express")
const router=express.Router();
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

// File filter: only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only JPEG and PNG files are allowed"), false);
  }
};

// Final multer config
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});
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
  router.post("/upload", upload.single("myFile"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
  
    res.send({
      message: "File uploaded successfully",
      file: req.file, // contains info like filename, path, etc.
    });
  });
  router.post("/upload-multiple", upload.array("myFiles", 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded");
    }
  
    res.send({
      message: "Files uploaded successfully",
      files: req.files.map((f) => ({
        filename: f.filename,
        size: f.size,
        type: f.mimetype,
      })),
    });
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