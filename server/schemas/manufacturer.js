import { gql } from "apollo-server-express";

export default gql`
  type Manufacturer {
    _id: String
    name: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    manufacturers: [Manufacturer]
  }
  extend type Mutation {
    addManufacturer(name: String!): Manufacturer
    deleteManufacturer(_id: String!): Boolean!
    updateManufacturer(_id: String!, name: String!): Manufacturer
  }
`;
