import mongoose from "mongoose";
import moment from 'moment';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    createdAt:{
      type:Date
    }
  },
  { timestamps: true }
);
categorySchema.pre("save", async function () {
  this.createdAt = await this.formatDate();
});

categorySchema.methods.formatDate = async function () {
  return await moment(this.createdAt).format("MMM Do YY");
};
const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
