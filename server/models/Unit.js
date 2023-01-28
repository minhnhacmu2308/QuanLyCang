import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    code:{
      type:String,
      require:true
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const UnitModel = mongoose.model("Unit", unitSchema);
export default UnitModel;
