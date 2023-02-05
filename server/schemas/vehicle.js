import { gql } from "apollo-server-express";

export default gql`
  type Vehicle {
    _id: String
    code: String
    type: String
    licensePlates: String
    image: String
    owner: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    vehicles: [Vehicle]
  }
  extend type Mutation {
    addVehicle(
      code: String!
      type: String!
      owner: String!
      licensePlates: String!
      image: String!
    ): Vehicle
    deleteVehicle(_id: String!): Boolean!
    updateVehicle(
      _id: String!
      code: String!
      type: String!
      licensePlates: String!
      owner: String!
    ): Vehicle
  }
`;
