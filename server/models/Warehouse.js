import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      userId: {
        type: String,
      },
      fullNme: {
        type: String,
      },
      role: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const WarehouseModel = mongoose.model("Warehouse", warehouseSchema);
export default WarehouseModel;
