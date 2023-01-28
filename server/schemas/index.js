import { gql } from "apollo-server-express";
import categorySchema from "./category.js";
import unitSchema from "./unit.js";
import customerSchema from "./customer.js";
import driverSchema from "./driver.js";
import userSchema from "./user.js";
import warehouseSchema from "./warehouse.js";
import transequipmentSchema from "./transequipment.js"; 
import manufacturerSchema from "./manufacturer.js";
import vehicleSchema from "./vehicle.js"
import packageSchema from "./package.js";
import containerSchema from "./container.js"

const baseSchema = gql`
  scalar Date
  scalar Upload
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [baseSchema, categorySchema, unitSchema,customerSchema,driverSchema,userSchema,manufacturerSchema,warehouseSchema,transequipmentSchema,vehicleSchema,packageSchema,containerSchema];
