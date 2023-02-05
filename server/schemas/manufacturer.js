import { gql } from "apollo-server-express";

export default gql`
  type Manufacturer {
    _id: String
    code: String
    producer: String
    categoryId: String
    category: Category
    name: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    manufacturers: [Manufacturer]
  }
  type Category {
    _id: String
    name: String
  }
  extend type Mutation {
    addManufacturer(
      code: String!
      name: String!
      producer: String!
      categoryId: String!
    ): Manufacturer
    deleteManufacturer(_id: String!): Boolean!
    updateManufacturer(
      _id: String!
      code: String!
      name: String!
      categoryId: String
      producer: String!
    ): Manufacturer
  }
`;
