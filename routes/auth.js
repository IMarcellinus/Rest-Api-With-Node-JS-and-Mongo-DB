// import packages
import express from "express";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";

// import validation
import { registerValidation } from "../configs/validation.js";

// import models
import User from "../models/user.js";

// initialisasi router express
const router = express.Router();

router.post("/register", async (req,res) => {
    const { error } = registerValidation(req.body);
    if(error)
        return res.status(400).json({
            status: res.statusCode,
            message: error.details[0].message,
        });
    // if email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).json({
            status: res.statusCode,
            message: "Email Sudah digunakan !",
        });
    
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: "Gagal membuat user baru",
        });
    }
});


// Login
router.post("/login", async (req,res) => {
    // if email exist
    const user = await User.findOne({ email: req.body.email });
    if(!user)
        return res.status(400).json({
            status: res.statusCode,
            message: "Email Anda Salah!",
        });
    
    // check password
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd)
        return res.status(400).json({
            status: res.statusCode,
            message: "Password Anda Salah!",
        });
    
    // membuat token menggunakan JWT
    const token = jwt.sign({ _id: user._id }, "pccclass");
    res.header("auth-token", token).json({
        token: token,
    });
});

export default router;