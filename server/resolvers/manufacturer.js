import { ManufacturerModel, CategoryModel } from "../models/index.js";

export default {
  Query: {
    manufacturers: async () => {
      const manufactures = await ManufacturerModel.find();
      return manufactures;
    },
  },
  Manufacturer: {
    category: async (parent, args) => {
      const categoryId = parent.categoryId;
      const categorys = await CategoryModel.find();
      return categorys.find((category) => category.id === categoryId);
    },
  },
  Mutation: {
    //manufacture
    addManufacturer: async (parent, args) => {
      const newmanufacture = new ManufacturerModel(args);
      await newmanufacture.save();
      return newmanufacture;
    },
    deleteManufacturer: async (parent, args) => {
      let manufactureId = args._id;
      const result = await ManufacturerModel.deleteOne({ _id: manufactureId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateManufacturer: async (parent, args) => {
      const manufactureId = args._id;
      const result = await ManufacturerModel.findByIdAndUpdate(manufactureId, {
        name: args.name,
        code: args.code,
        producer: args.producer,
        categoryId: args.categoryId,
      });
      const manufactures = await ManufacturerModel.findOne({
        _id: manufactureId,
      });
      return manufactures;
    },
  },
};
