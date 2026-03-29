import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://user_admin:123456789abcdef@ac-xrbaozf-shard-00-00.glytjrt.mongodb.net:27017,ac-xrbaozf-shard-00-01.glytjrt.mongodb.net:27017,ac-xrbaozf-shard-00-02.glytjrt.mongodb.net:27017/food-del?ssl=true&replicaSet=atlas-ftfva0-shard-0&authSource=admin&appName=Cluster0"
    );
    console.log("DB connected");
  } catch (err) {
    console.error(err);
  }
};