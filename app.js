// import express
import express from "express";
// import mongoose
import mongoose from "mongoose";
// // import mahasiswa router
import mahasiswaRoutes from "./routes/mahasiswa.js";
// // import dosen router
import dosenRoutes from "./routes/dosen.js";
// // import bodyParser
import bodyParser from "body-parser";
// import Routes
import userRoutes from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// buat server 
app.listen(process.env.PORT,()=> {
    console.log(`Server running in port ${process.env.PORT}`);
});

// // Router
// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

// middleware
app.use(bodyParser());
app.use(cors());

// contoh route
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/dosen", dosenRoutes);
app.use("/api/user", userRoutes);

// Koneksi ke Database
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

let db = mongoose.connection;

db.on("error",console.error.bind(console,"Database koneksi error!!"));
db.once("open",()=>{
    console.log("koneksi database berhasil");
});