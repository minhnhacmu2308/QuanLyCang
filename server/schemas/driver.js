import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: String
    fullName: String
    birthday: Date
    workingAt: String
    role: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    drivers: [User]
  }
  extend type Mutation {
    addDriver(
      fullName: String!
      birthday: Date!
      workingAt: String!
      role: String!
    ): User
    deleteDriver(_id: String!): Boolean!
    updateDriver(
      _id: String!
      fullName: String!
      birthday: Date!
      workingAt: String!
    ): User
  }
`;
