import { gql } from "apollo-server-express";


export default gql`
  type Warehouse {
    _id: String
    name: String
    code:String
    user:User
    userId:String
    createdAt: Date
    updatedAt: Date
  }
  type User{
    _id:String
    userName:String
    fullName:String
    createdAt: Date 
  }
  extend type Query {
    warehouses: [Warehouse]
  }
  extend type Mutation {
    addWarehouse(code:String!,name: String!,userId:String!): Warehouse
    deleteWarehouse(_id: String!): Boolean!
    updateWarehouse(_id: String!, name: String!,userId:String!): Warehouse
  }
`;
