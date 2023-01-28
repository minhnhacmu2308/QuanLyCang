import { WarehouseModel,UserModel } from "../models/index.js";
import { ROLE_USER } from "../constants/index.js";
export default {
  Query: {
    warehouses: async () => {
      const warehouses = await WarehouseModel.find();
      return warehouses;
    },
  },
  Warehouse:{
    user: async(parent, args) =>{
      const userId = parent.userId;
      const users = await UserModel.find({ role: ROLE_USER });
      return  users.find(user => user.id === userId)
    }
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
      console.log("args",args)
      const result = await WarehouseModel.findByIdAndUpdate(warehouseId, {
        name: args.name,
        code: args.code,
        userId:args.userId
      });
      const users = await WarehouseModel.findOne({ _id: warehouseId });
      console.log("re",users)
      return users;
    },
  },
};
