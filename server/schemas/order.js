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
    customerId: String
    customer: Customer
    shipFrom: String
    shipTo: String
    type: String
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
    userId: String
  }
  type Vehicle {
    _id: String
    type: String
    owner: String
  }
  type Transequipment {
    _id: String
    type: String
  }
  type Container {
    containerId: String
    name: String
    packages: [Package]
  }
  type Package {
    _id: String
    code: String
    color: String
    createdAt: Date
    updatedAt: Date
    size: String
    name: String
    owner: String
    products: [Product]
  }
  type Product {
    _id: String
    name: String
  }
  type Customer {
    _id: String
    fullName: String
  }
  type Driver {
    _id: String
    fullName: String
  }
  type ProductOrder {
    containers: [Container]
  }
  input ContainerInput {
    containerId: String
    name: String
    packages: [PackageInput]
  }
  input PackageInput {
    _id: String
    code: String
    color: String
    createdAt: Date
    owner: String
    updatedAt: Date
    size: String
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
  type ProductOrderNew {
    products :[Product]
  }
  input ProductOrderNewInput {
    products :[ProductInput]
  }
  extend type Query {
    orders: [Order]
    orderByWarehouse(userId: String!): [Order]
    orderOutputs: [Order]
    order(id: String!): Order
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
    addOrderNew(
      receiptNo: String!
      shipFrom: String!
      shipTo: String!
      customerId: String!
      vehicleId: String!
      driverId: String!
      transequipmentId: String!
      receivingDate: String!
      loadingDate: String!
      finishTime: String!
      createdBy: String!
      orderInput: ProductOrderNewInput!
      description: String!
      typeInput: String!
    ): Order
    deleteOrder(_id: String!): Boolean!
    updateOrder(_id: String!, typeInput: String!, customerId: String!,shipTo:String!): Order
  }
`;
