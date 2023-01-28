import { gql } from "apollo-server-express";

export default gql `
  type Container {
    _id: String
    code: String
    size: String
    color: String
    owner: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    containers: [Container]
  }
  extend type Mutation {
    addContainer(code:String!,size: String!,color: String!,owner: String!): Container
    deleteContainer(_id: String!): Boolean!
    updateContainer(_id: String!,code:String!, size: String!,color: String!,owner: String!): Container
  }
`;