import mongoose from "mongoose";

const dataModel = new mongoose.Schema({
  valor: Number,
  descricao: String,
});

export default mongoose.model("dataModel", dataModel);
