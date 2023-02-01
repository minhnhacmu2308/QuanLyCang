import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    warehouseId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    vehicleId: {
      type: String,
    },
    driverId: {
      type: String,
    },
    transequipmentId: {
      type: String,
    },
    shipFrom: {
      type: String,
    },
    shipTo: {
      type: String,
    },
    receivingDate: {
      type: String,
    },
    loadingDate: {
      type: String,
    },
    finishTime: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    description: {
      type: String,
    },
    typeInput: {
      type: String,
    },
    orderInput: {
      type: Object,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
