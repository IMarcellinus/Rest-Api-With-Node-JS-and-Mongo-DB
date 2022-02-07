import express from "express";
import Dosen from "../models/dosen.js";
import verifyToken from "./verifytoken.js";

const router = express.Router();

// create 
router.post("/", verifyToken, async (req,res) =>{
    const reqDosen = new Dosen({
        nama: req.body.nama,
        nip: req.body.nip,
        matkul: req.body.matkul,
    });
    try {
        const dosen = await reqDosen.save();
        res.json(dosen); 
    } catch(err){
        res.json({message : err});
    }
});

// menampilkan data
router.get("/", verifyToken, async (req,res) => {
    try {
        const dosen = await Dosen.find();
        res.json(dosen);
    } catch (error) {
        res.json({message: error});
    }
});

// Read by id
router.get("/:id", verifyToken, async (req,res) => {
    try {
        const dosen = await Dosen.findOne({_id : req.params.id});
        res.json(dosen);
    } catch (error) {
        res.json({message: error});
    }
});

// Update
router.put("/:id", verifyToken, async (req,res) => {
    try {
        const updateDosen = await Dosen.updateOne(
            {_id : req.params.id},
            {
                nama: req.body.nama,
                nip:  req.body.nip,
                matkul:  req.body.matkul,
            }
        );
        res.json(updateDosen);
    } catch (error) {
        res.json({message:error});
    }
});

// Delete
router.delete("/:id", verifyToken, async (req,res) => {
    try {
        const deletedDosen = await Dosen.deleteOne({_id : req.params.id});
        res.json(deletedDosen);
    } catch (error) {
        res.json({message:error});
    }
})

export default router;