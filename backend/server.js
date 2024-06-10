// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js"
// import messageRoutes from "./routes/message.routes.js"
// import userRoutes from "./routes/user.routes.js"

// import connectToMongoDB from "./db/connectToMongoDB.js";

// import { app, server } from "./socket/socket.js";


// const PORT = process.env.PORT || 5000;




// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth",authRoutes)
// app.use("/api/messages",messageRoutes)
// app.use("/api/users",userRoutes)


// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`server is running on port ${PORT}`);
// });


// import dotenv from "dotenv";
// dotenv.config(); // This line should be right after importing dotenv
// console.log("MongoDB URI from .env:", process.env.MONGO_DB_URI);


// import dotenv from 'dotenv';
// dotenv.config();


// import express from "express";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js"
// import messageRoutes from "./routes/message.routes.js"
// import userRoutes from "./routes/user.routes.js"

// import connectToMongoDB from "./db/connectToMongoDB.js";

// import { app, server } from "./socket/socket.js";

// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth",authRoutes)
// app.use("/api/messages",messageRoutes)
// app.use("/api/users",userRoutes)

// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`server is running on port ${PORT}`);
// });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
 
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
 
import connectToMongoDB from "./db/connectToMongoDB.js";
 
import { app, server } from "./socket/socket.js";
 
 
const PORT = process.env.PORT || 5000;
 
const __dirname = path.resolve();
 
dotenv.config();
 
app.use(express.json());
app.use(cookieParser());
 
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
 
app.use(express.static(path.join(__dirname,"/frontend/dist")));
 
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});
 
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});