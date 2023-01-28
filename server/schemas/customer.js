import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: String
    fullName: String!
    taxCode: String!
    phone: String!
    code:String!
    role: String!
    address: String!
    fax: String!
    email: String!
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    customers: [User]
  }
  extend type Mutation {
    addCustomer(
      fullName: String!
      taxCode: String!
      phone: String!
      role: String!
      code:String!
      address: String!
      fax: String!
      email: String!
    ): User
    deleteCustomer(_id: String!): Boolean!
    updateCustomer(
      _id: String!
      fullName: String!
      taxCode: String!
      phone: String!
      code:String!
      address: String!
      fax: String!
      email: String!
    ): User
  }
`;
