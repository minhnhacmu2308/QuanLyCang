import { gql } from "apollo-server-express";

export default gql`
  type Package {
    _id: String
    code: String
    name: String
    size: String
    color: String
    owner: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    packages: [Package]
  }
  extend type Mutation {
    addPackage(
      code: String!
      size: String!
      name: String!
      color: String!
      owner: String!
    ): Package
    deletePackage(_id: String!): Boolean!
    updatePackage(
      _id: String!
      code: String!
      size: String!
      name: String!
      color: String!
      owner: String!
    ): Package
  }
`;
