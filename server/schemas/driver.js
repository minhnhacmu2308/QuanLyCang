import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: String
    fullName: String
    birthday: String
    code:String!
    workingAt: String
    phone:String
    role: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    drivers: [User]
  }
  extend type Mutation {
    addDriver(
      code:String!
      fullName: String!
      birthday: String!
      workingAt: String!
      phone:String!
      role: String!
    ): User
    deleteDriver(_id: String!): Boolean!
    updateDriver(
      _id: String!
      code:String!
      fullName: String!
      birthday: String!
      workingAt: String!
      phone:String!
    ): User
  }
`;
