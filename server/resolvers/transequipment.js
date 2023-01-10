import { TransequipmentModel } from "../models/index.js";
export default {
  Query: {
    transequipments: async () => {
      const transequipments = await TransequipmentModel.find();
      return transequipments;
    },
  },
  Mutation: {
    //Transequipment
    addTransequipment: async (parent, args) => {
      const newTransequipment = new TransequipmentModel(args);
      await newTransequipment.save();
      return newTransequipment;
    },
    deleteTransequipment: async (parent, args) => {
      let transequipmentId = args._id;
      const result = await TransequipmentModel.deleteOne({
        _id: transequipmentId,
      });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateTransequipment: async (parent, args) => {
      const transequipmentId = args._id;
      const result = await TransequipmentModel.findByIdAndUpdate(
        transequipmentId,
        {
          name: args.name,
          code: args.code,
        }
      );
      return result;
    },
  },
};
