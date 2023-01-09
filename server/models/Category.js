import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
},{timestamps: true});

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;