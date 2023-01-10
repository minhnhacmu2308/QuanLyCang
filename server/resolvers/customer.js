import { UserModel } from "../models/index.js";
import { ROLE_CUSTOMER } from "../constants/index.js";
export default {
  Query: {
    customers: async () => {
      const customers = await UserModel.find({ role: ROLE_CUSTOMER });
      return customers;
    },
  },
  Mutation: {
    //Customer
    addCustomer: async (parent, args) => {
      const newCustomer = new UserModel(args);
      await newCustomer.save();
      return newCustomer;
    },
    deleteCustomer: async (parent, args) => {
      let customerId = args._id;
      const customer = await UserModel.findById(customerId);

      if (customer != null) {
        await customer.remove();
        return true;
      } else {
        return false;
      }
    },
    updateCustomer: async (parent, args) => {
      const customerId = args._id;
      const result = await UserModel.findByIdAndUpdate(customerId, {
        fullName: args.fullName,
        taxCode: args.taxCode,
        phone: args.phone,
        address: args.address,
        fax: args.fax,
        email: args.email,
      });
      return result;
    },
  },
};
