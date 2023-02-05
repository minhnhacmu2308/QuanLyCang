import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    licensePlates: {
      type: String,
      require: true,
    },
    type: {
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

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
export default VehicleModel;
