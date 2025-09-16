import express, { request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dataModel from "../model/dataModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoBD successfully");
  } catch (error) {
    console.log("Error to connect to MongoDB", error);
  }
};

connectDB();

// CREATE
app.post("/data", async (request, response) => {
  try {
    const newData = await dataModel.create(request.body);
    response.json(newData);
  } catch {
    response.json({ error: error.mensage });
  }
});

// READ
app.get("/data", async (request, response) => {
  try {
    const datas = await dataModel.find();
    response.json(datas);
  } catch (error) {
    response.json({ error: error.message });
  }
});

// UPDATE
app.put("data/:id", async (request, response) => {
  try {
    const newdata = await dataModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.json(newData);
  } catch (error) {
    response.json({ error: error.message });
  }
});

// DELETE
app.delete("/data/:id", async (request, response) => {
  try {
    const deletedData = await dataModel.findByIdAndDelete(request.params.id);
    response.json(deletedData);
  } catch (error) {
    response.json({ error: error.message });
  }
});

app.get("/", (request, response) => {
  response.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
