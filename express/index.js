
const express=require("express")
const app=express()
const mainroutes=require("./routes/mainRoutes")
const adminroutes=require("./routes/adminRoutes")
const usersroute=require("./routes/userRoutes")
const authroutes=require("./routes/authRoutes")
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Mount your routes
app.use("/", mainroutes);
app.use("/admin",adminroutes)
app.use("/user",usersroute)
app.use("/auth",authroutes)

// 404 and error handlers
app.use((req, res, next) => {
  res.status(404).send("Route not found");
  next()
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something broke on the server. Please try again later.");
});
app.listen(3004,()=>{
  console.log("server running on http://localhost:3004")
})