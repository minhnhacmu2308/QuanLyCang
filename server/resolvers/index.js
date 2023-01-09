import {CategoryModel} from '../models/index.js';

export const resolvers = {
    Query:{
        categorys : async () =>{
            const categorys = await CategoryModel.find();
            return categorys;
        }
    },
    Mutation:{
        addCategory:async (parent, args) =>{
            const newCategory = new CategoryModel(args);
            console.log(newCategory);
            await newCategory.save();
            return newCategory;
        },
        deleteCategory : async (parent, args) =>{
            let categoryId = args._id;
            console.log(categoryId);
            const result = await CategoryModel.deleteOne({_id:categoryId});
            return result.deletedCount.toString();
        },
        updateCategory : async (parent, args) =>{
            console.log(args);
            const categoryId = args._id;
            console.log(categoryId);
            const result = await CategoryModel.findByIdAndUpdate(categoryId,{name:args.name,code : args.code});
            console.log(result);
            return result;
        }
    }
};