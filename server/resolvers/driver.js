import { UserModel } from "../models/index.js";
import { ROLE_DRIVER } from "../constants/index.js";
export default {
  Query: {
    drivers: async () => {
      const drivers = await UserModel.find({ role: ROLE_DRIVER });
      return drivers;
    },
  },
  Mutation: {
    //Driver
    addDriver: async (parent, args) => {
      const newDriver = new UserModel(args);
      await newDriver.save();
      return newDriver;
    },
    deleteDriver: async (parent, args) => {
      let driverId = args._id;
      const result = await UserModel.deleteOne({ _id: driverId });
      if(result.deletedCount == 1 ){
        return true;
      }
      return false;
    },
    updateDriver: async (parent, args) => {
      const driverId = args._id;
      const result = await UserModel.findByIdAndUpdate(driverId, {
        fullName: args.fullName,
        code: args.code,
        birthday: args.birthday,
        workingAt: args.workingAt,
      });
      return result;
    },
  },
};
