import {CategoryModel} from '../models/index.js';
import  {GraphQLScalarType} from 'graphql';

export const resolvers = {
    Date: new GraphQLScalarType({
        name:'Date',
        parsevvalue(value){
            return new Date(value);
        },
        serialize(value){
            return value.toISOString();
        }
    }),   
    Query:{
        categorys : async () =>{
            const categorys = await CategoryModel.find();
            return categorys;
        }
    },
    Mutation:{
        addCategory:async (parent, args) =>{
            const newCategory = new CategoryModel(args);
            await newCategory.save();
            return newCategory;
        },
        deleteCategory : async (parent, args) =>{
            let categoryId = args._id;
            const result = await CategoryModel.deleteOne({_id:categoryId});
            return result.deletedCount.toString();
        },
        updateCategory : async (parent, args) =>{
            const categoryId = args._id;
            const result = await CategoryModel.findByIdAndUpdate(categoryId,{name:args.name,code : args.code});
            return result;
        }
    }
};