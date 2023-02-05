import { gql } from "apollo-server-express";

export default gql`
  type Transequipment {
    _id: String
    type: String
    code: String
    owner: String
    image: String
    createdAt: Date
    updatedAt: Date
  }
  extend type Query {
    transequipments: [Transequipment]
  }
  extend type Mutation {
    addTransequipment(
      code: String!
      type: String!
      owner: String!
      image: String!
    ): Transequipment
    deleteTransequipment(_id: String!): Boolean!
    updateTransequipment(
      _id: String!
      code: String!
      type: String!
      owner: String!
    ): Transequipment
  }
`;
