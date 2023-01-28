import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code:{
      type:String,
      require:true
    },
    name: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    unitId:{
        type:String
    },
    categoryId:{
        type:String
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
