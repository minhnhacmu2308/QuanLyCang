import { CategoryModel } from "../models/index.js";
export default {
  Query: {
    categorys: async () => {
      const categorys = await CategoryModel.find();
      return categorys;
    },
  },
  Mutation: {
    //category
    addCategory: async (parent, args) => {
      const newCategory = new CategoryModel(args);
      await newCategory.save();
      return newCategory;
    },
    deleteCategory: async (parent, args) => {
      let categoryId = args._id;
      const category = await CategoryModel.findById(categoryId);

      if (category != null) {
        await category.remove();
        return true;
      } else {
        return false;
      }
    },
    updateCategory: async (parent, args) => {
      const categoryId = args._id;
      const result = await CategoryModel.findByIdAndUpdate(categoryId, {
        name: args.name,
        code: args.code,
      });
      return result;
    },
  },
};
