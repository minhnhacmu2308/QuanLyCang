import { gql } from "apollo-server-express";

export default gql`
  type Category {
    _id: String
    name: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    categorys: [Category]
  }
  extend type Mutation {
    addCategory(name: String!): Category
    deleteCategory(_id: String!): Boolean!
    updateCategory(_id: String!, name: String!): Category
  }
`;
