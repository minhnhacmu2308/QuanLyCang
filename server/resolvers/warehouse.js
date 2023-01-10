import { WarehouseModel } from "../models/index.js";
export default {
  Query: {
    warehouses: async () => {
      const warehouses = await WarehouseModel.find();
      return warehouses;
    },
  },
  Mutation: {
    //Warehouse
    addWarehouse: async (parent, args) => {
      const newWarehouse = new WarehouseModel(args);
      await newWarehouse.save();
      return newWarehouse;
    },
    deleteWarehouse: async (parent, args) => {
      let warehouseId = args._id;
      const result = await WarehouseModel.deleteOne({ _id: warehouseId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateWarehouse: async (parent, args) => {
      const warehouseId = args._id;
      const result = await WarehouseModel.findByIdAndUpdate(warehouseId, {
        name: args.name,
        code: args.code,
      });
      return result;
    },
  },
};
