import mongoose from "mongoose";

const transequipmentSchema = new mongoose.Schema(
  {
    code:{
      type:String,
      require:true
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

const TransequipmentModel = mongoose.model(
  "Transequipment",
  transequipmentSchema
);
export default TransequipmentModel;
