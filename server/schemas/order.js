import { gql } from "apollo-server-express";

export default gql`
  type Order {
    _id: String
    receiptNo: String
    warehouse: Warehouse
    warehouseId: String
    vehicleId: String
    vehicle: Vehicle
    driverId: String
    driver: Driver
    transequipmentId: String
    transequipment: Transequipment
    shipFrom: String
    shipTo: String
    receivingDate: String
    loadingDate: String
    finishTime: String
    createdBy: String
    description: String
    typeInput: String
    orderInput: ProductOrder
    createdAt: Date
    updatedAt: Date
  }
  type Warehouse {
    _id: String
    name: String
  }
  type Vehicle {
    _id: String
    name: String
    owner: String
  }
  type Transequipment {
    _id: String
    name: String
  }
  type Container {
    _id: String
    name: String
    packages: [Package]
  }
  type Package {
    _id: String
    name: String
    products: [Product]
  }
  type Product {
    _id: String
    name: String
  }
  type Driver {
    _id: String
    name: String
  }
  type ProductOrder {
    containers: [Container]
  }
  input ContainerInput {
    _id: String
    name: String
    packages: [PackageInput]
  }
  input PackageInput {
    _id: String
    name: String
    products: [ProductInput]
  }
  input ProductInput {
    _id: String
    name: String
  }
  input ProductOrderInput {
    containers: [ContainerInput]
  }
  extend type Query {
    orders: [Order]
  }
  extend type Mutation {
    addOrder(
      receiptNo: String!
      shipFrom: String!
      shipTo: String!
      warehouseId: String!
      vehicleId: String!
      driverId: String!
      transequipmentId: String!
      receivingDate: String!
      loadingDate: String!
      finishTime: String!
      createdBy: String!
      orderInput: ProductOrderInput!
      description: String!
      typeInput: String!
      type: String!
    ): Order
    deleteOrder(_id: String!): Boolean!
    updateOrder(_id: String!, name: String!, userId: String!): Order
  }
`;
