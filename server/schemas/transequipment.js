import { gql } from "apollo-server-express";

export default gql`
  type Transequipment {
    _id: String
    type: String
    owner: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    transequipments: [Transequipment]
  }
  extend type Mutation {
    addTransequipment(name: String!, owner: String!): Transequipment
    deleteTransequipment(_id: String!): Boolean!
    updateTransequipment(
      _id: String!
      name: String!
      owner: String!
    ): Transequipment
  }
`;
