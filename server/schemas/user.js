import { gql  } from "apollo-server-express";


export default gql`
  type Token {
    token: String!
  }
  type File {
    url:String!
  }
  type User {
    _id: String
    userName: String!
    fullName: String!
    birthday: String!
    address: String!
    image: String!
    password: String!
    code:String!
    workingAt: String
    role: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    users: [User]
    user(id: String!): User
    usersByRole(role:String!): [User]
    fileUpload:String!
  }
  extend type Mutation {
    signUp(role:String!,userName: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: String!): Boolean!
    changePassword(id: String!, password: String!): Boolean!
    addUser(code:String!,userName:String!,fullName:String!,birthday:String!,address:String!,image:String!,role:String!,password:String!):User!
    updateUser(_id: String!,userName:String!,fullName:String!,birthday:String!,address:String!,image:String!,password:String!):User!
    updateProfile(_id: String!,fullName:String!,birthday:String!,address:String!,image:String!):User!
    uploadFile(file:Upload!):File!
  }
`;
