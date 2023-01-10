import { gql } from "apollo-server-express";

export default gql`
  type Warehouse {
    _id: String
    name: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    warehouses: [Warehouse]
  }
  extend type Mutation {
    addWarehouse(name: String!): Warehouse
    deleteWarehouse(_id: String!): Boolean!
    updateWarehouse(_id: String!, name: String!): Warehouse
  }
`;
