import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    code:{
      type:String,
      require:true
    },
    name: {
      type: String,
      require: true,
    },
    userId:{
      type:String,
      require:true
    },
  },
  { timestamps: true }
);

const WarehouseModel = mongoose.model("Warehouse", warehouseSchema);
export default WarehouseModel;
