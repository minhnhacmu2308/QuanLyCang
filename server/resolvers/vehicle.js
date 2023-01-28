import { VehicleModel } from "../models/index.js";
export default {
  Query: {
    vehicles: async () => {
      const vehicles = await VehicleModel.find();
      return vehicles;
    },
  },
  Mutation: {
    //Vehicle
    addVehicle: async (parent, args) => {
      const newVehicle = new VehicleModel(args);
      await newVehicle.save();
      return newVehicle;
    },
    deleteVehicle: async (parent, args) => {
      let vehicleId = args._id;
      const result = await VehicleModel.deleteOne({
        _id: vehicleId,
      });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateVehicle: async (parent, args) => {
      const vehicleId = args._id;
      const result = await VehicleModel.findByIdAndUpdate(
        vehicleId,
        {
          type: args.type,
          code: args.code,
          owner:args.owner
        }
      );
      return result;
    },
  },
};
