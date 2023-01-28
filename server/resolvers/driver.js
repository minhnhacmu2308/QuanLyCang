import { UserModel } from "../models/index.js";
import { ROLE_DRIVER } from "../constants/index.js";
import moment from 'moment'
export default {
  Query: {
    drivers: async () => {
      let arr = [];
      let drivers = await UserModel.find({ role: ROLE_DRIVER });
      drivers.forEach(x =>      
         arr.push({"birthday":moment(x.birthday).format("yyyy-MM-DD"),
         "fullName":x.fullName,
         "_id":x._id,
         "phone":x.phone,
         "createdAt":x.createdAt,
         "workingAt":x.workingAt,
         "role":x.role,
         "code":x.code
        }));
      return arr;
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
        phone:args.phone
      });
      return result;
    },
  },
};
