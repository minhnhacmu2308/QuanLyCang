import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ManufacturerModel = mongoose.model("Manufacturer", manufacturerSchema);
export default ManufacturerModel;
