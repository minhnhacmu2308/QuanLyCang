import categoryResolver from "./category.js";
import unitResolver from "./unit.js";
import customerResolver from "./customer.js";
import driverResolver from "./driver.js";
import manufacturerResolver from "./manufacturer.js";
import userResolver from "./user.js";
import warehouseResolver from "./warehouse.js";
import transequipmentResolver from "./transequipment.js";
import vehicleResolver from "./vehicle.js";
import packageResolver from "./package.js";
import containerResolver from "./container.js";
import productResolver from "./product.js";
import orderResolver from "./order.js";
import { GraphQLScalarType } from "graphql";
import GraphQLUpload from "./graphql-upload/GraphQLUpload.mjs";

const customResolver = {
  Upload: GraphQLUpload,
  Date: new GraphQLScalarType({
    name: "Date",
    parsevvalue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
};

export default [
  customResolver,
  categoryResolver,
  unitResolver,
  customerResolver,
  driverResolver,
  manufacturerResolver,
  userResolver,
  warehouseResolver,
  transequipmentResolver,
  vehicleResolver,
  packageResolver,
  containerResolver,
  productResolver,
  orderResolver,
];
