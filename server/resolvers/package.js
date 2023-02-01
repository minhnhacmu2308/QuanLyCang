import { PackageModel } from "../models/index.js";
export default {
  Query: {
    packages: async () => {
      const packages = await PackageModel.find();
      return packages;
    },
  },
  Mutation: {
    //Package
    addPackage: async (parent, args) => {
      const newPackage = new PackageModel(args);
      await newPackage.save();
      return newPackage;
    },
    deletePackage: async (parent, args) => {
      let packageId = args._id;
      const Package = await PackageModel.findById(packageId);

      if (Package != null) {
        await Package.remove();
        return true;
      } else {
        return false;
      }
    },
    updatePackage: async (parent, args) => {
      const packageId = args._id;
      const result = await PackageModel.findByIdAndUpdate(packageId, {
        name: args.name,
        color: args.color,
        owner: args.owner,
        size: args.size,
      });
      return result;
    },
  },
};
