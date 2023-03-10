import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    owner: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const PackageModel = mongoose.model("Package", packageSchema);
export default PackageModel;
