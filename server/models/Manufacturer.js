import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
    },
    producer: {
      type: String,
      require: true,
    },
    categoryId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ManufacturerModel = mongoose.model("Manufacturer", manufacturerSchema);
export default ManufacturerModel;
