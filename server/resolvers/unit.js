import { UnitModel } from "../models/index.js";
export default {
  Query: {
    units: async () => {
      const units = await UnitModel.find();
      return units;
    },
  },
  Mutation: {
    //unit
    addUnit: async (parent, args) => {
      const newUnit = new UnitModel(args);
      await newUnit.save();
      return newUnit;
    },
    deleteUnit: async (parent, args) => {
      let unitId = args._id;
      const result = await UnitModel.deleteOne({ _id: unitId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateUnit: async (parent, args) => {
      const unitId = args._id;
      const result = await UnitModel.findByIdAndUpdate(unitId, {
        name: args.name,
        code: args.code,
        description: args.description,
      });
      return result;
    },
  },
};
