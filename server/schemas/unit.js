import { gql } from "apollo-server-express";

export default gql`
  type Unit {
    _id: String
    name: String
    code:String
    description: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    units: [Unit]
  }
  extend type Mutation {
    addUnit(code:String!,name: String!, description: String!): Unit
    deleteUnit(_id: String!): Boolean!
    updateUnit(_id: String!,code:String!, name: String!, description: String!): Unit
  }
`;
