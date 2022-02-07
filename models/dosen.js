import mongoose from "mongoose";

// schema DB
const dosenDB = mongoose.Schema({
    nama:{
        type:String,
        required:true,
    },
    nip:{
        type:Number,
        required:true,
    },
    matkul:{
        type:String,
        required:true,
    },
});

export default mongoose.model("Dosen", dosenDB);