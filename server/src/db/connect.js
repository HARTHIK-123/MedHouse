const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((e)=>{
        console.log(`Error during DB Connection ${e}`)
    })
}

module.exports = connectDB;