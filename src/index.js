const connectdb = require("./db");
const cookieParser = require("cookie-parser");
const express = require("express");
// const app=express()
const app = require("./app");
const userRouter = require("./routes/user");

// Middleware
app.use(cookieParser()); // Add cookie-parser middleware
app.use(express.json()); // Set JSON body limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api/v1/user", userRouter);

// Database connection
connectdb();

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
