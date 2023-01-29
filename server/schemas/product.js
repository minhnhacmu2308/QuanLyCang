import { gql } from "apollo-server-express";


export default gql`
  type Product {
    _id: String
    name: String
    code:String
    size:String
    color:String
    unit:Unit
    unitId:String
    category:Category
    categoryId:String
    createdAt: Date
    updatedAt: Date
  }
  type Unit{
    _id:String
    code:String
    name:String
    createdAt: Date 
  }

  type Category{
    _id:String
    code:String
    name:String
    createdAt: Date 
  }

  extend type Query {
    Products: [Product]
  }
  extend type Mutation {
    addProduct(code:String!,name: String!,size:String!, color:String!,unitId:String!,categoryId:String!): Product
    deleteProduct(_id: String!): Boolean!
    updateProduct(_id: String!, name: String!,size:String!,color:String!,unitId:String!,categoryId:String!): Product
  }
`;
