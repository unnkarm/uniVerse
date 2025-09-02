import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://universe:yourStrongPassword123@cluster0.abcd.mongodb.net/universe?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🌌 MongoDB Atlas Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));
