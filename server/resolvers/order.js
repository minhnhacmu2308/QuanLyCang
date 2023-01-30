import {
  OrderModel,
  WarehouseModel,
  VehicleModel,
  UnitModel,
  TransequipmentModel,
  CategoryModel,
  PackageModel,
  ProductModel,
} from "../models/index.js";
import { ROLE_DRIVER, ROLE_USER } from "../constants/index.js";
export default {
  Query: {
    orders: async () => {
      const orders = await OrderModel.find();
      return orders;
    },
  },
  Order: {
    warehouse: async (parent, args) => {
      const warehouseId = parent.warehouseId;
      const warehouses = await WarehouseModel.find();
      return warehouses.find((warehouse) => warehouse.id === warehouseId);
    },
    vehicle: async (parent, args) => {
      const vehicleId = parent.vehicleId;
      const vehicles = await VehicleModel.find();
      return vehicles.find((vehicle) => vehicle.id === vehicleId);
    },
    driver: async (parent, args) => {
      const userId = parent.userId;
      const users = await UnitModel.find({ role: ROLE_DRIVER });
      return users.find((user) => user.id === userId);
    },
    transequipment: async (parent, args) => {
      const transequipmentId = parent.transequipmentId;
      const transequipments = await TransequipmentModel.find();
      return transequipments.find(
        (transequipment) => transequipment.id === transequipmentId
      );
    },
    // orderInput: async (parent, args) => {
    //   console.log("resolver", parent);
    // },
  },
  Mutation: {
    //Order
    addOrder: async (parent, args) => {
      const newOrder = new OrderModel(args);
      await newOrder.save();
      return newOrder;
    },
    deleteOrder: async (parent, args) => {
      let OrderId = args._id;
      const result = await OrderModel.deleteOne({ _id: OrderId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateOrder: async (parent, args) => {
      const OrderId = args._id;
      console.log("args", args);
      const result = await OrderModel.findByIdAndUpdate(OrderId, {
        name: args.name,
        code: args.code,
        userId: args.userId,
      });
      const users = await OrderModel.findOne({ _id: OrderId });
      console.log("re", users);
      return users;
    },
  },
};
