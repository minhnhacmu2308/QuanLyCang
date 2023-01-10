import { gql } from "apollo-server-express";

export default gql`
  type Vehicle {
    _id: String
    type: String
    owner: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    vehicles: [Vehicle]
  }
  extend type Mutation {
    addVehicle(name: String!,owner: String!): Vehicle
    deleteVehicle(_id: String!): Boolean!
    updateVehicle(
      _id: String!
      name: String!
      owner: String!
    ): Vehicle
  }
`;
