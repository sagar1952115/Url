const mongoose=require("mongoose")

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://1234sagarkumar12:aqyAPU4bwyrhpLOE@cluster0.ps7c5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((data) => {
        console.log("Db is connected successfully.")
    })
    .catch((err) => {
        console.log("Error connecting with Database!")
        console.log(err)
    });
};

module.exports=connectDB