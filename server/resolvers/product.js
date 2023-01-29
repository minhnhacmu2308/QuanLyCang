import { ProductModel,UnitModel,CategoryModel } from "../models/index.js";
import { ROLE_USER } from "../constants/index.js";
export default {
  Query: {
    Products: async () => {
      const Products = await ProductModel.find();
      return Products;
    },
  },
  Product:{
    unit: async(parent, args) =>{
      const unitId = parent.unitId;
      const units = await UnitModel.find();
      return  units.find(unit => unit.id === unitId)
    },
    category: async(parent, args) =>{
        const categoryId = parent.categoryId;
        const categorys = await CategoryModel.find();
        return  categorys.find(category => category.id === categoryId)
    }
  },
  Mutation: {
    //Product
    addProduct: async (parent, args) => {
      const newProduct = new ProductModel(args);
      await newProduct.save();
      return newProduct;
    },
    deleteProduct: async (parent, args) => {
      let ProductId = args._id;
      const result = await ProductModel.deleteOne({ _id: ProductId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateProduct: async (parent, args) => {
      const productId = args._id;
      console.log("args",args)
      const result = await ProductModel.findByIdAndUpdate(productId, {
        name: args.name,
        code: args.code,
        size:args.size,
        color:args.color,
        unitId:args.unitId,
        categoryId:args.categoryId
      });
      const users = await ProductModel.findOne({ _id: productId });
      console.log("re",users)
      return users;
    },
  },
};
