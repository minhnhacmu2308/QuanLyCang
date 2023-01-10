import { gql } from "apollo-server-express";

export default gql`
  type Token {
    token: String!
  }
  type User {
    _id: String
    userName: String
    fullName: String
    birthday: Date
    address: String
    image: String
    password: String
    workingAt: String
    role: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    users: [User]
    user(id: String!): User
  }
  extend type Mutation {
    signUp(userName: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: String!): Boolean!
    changePassword(id: String!, password: String!): Boolean!
  }
`;
