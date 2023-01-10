import mongoose from "mongoose";

const containerSchema = new mongoose.Schema(
  {
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

const ContainerModel = mongoose.model("Container", containerSchema);
export default ContainerModel;
