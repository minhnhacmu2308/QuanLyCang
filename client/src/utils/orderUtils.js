import { GRAPHQL_SERVER } from "../constants";
import { userLoader } from "./userUtils.js";
import { warehouseLoader } from "./warehouseUtils.js";
import { vehicleLoader } from "./vehicleUtil.js";
import { containerLoader } from "./containerUtils";
import { packageLoader } from "./packageUtils";
import { driverLoader } from "./userUtils.js";
import { transequipmentLoader } from "./transequipmentUtills.js";
export const orderLoader = async () => {
  const query = `query Query {
        orders {
          _id
          receiptNo
          warehouse {
            _id
            name
          }
          warehouseId
          vehicleId
          vehicle {
            _id
            name
          }
          driverId
          driver {
            _id
            name
          }
          transequipmentId
          transequipment {
            _id
            name
          }
          shipFrom
          shipTo
          receivingDate
          loadingDate
          finishTime
          createdBy
          description
          typeInput
          orderInput {
            containers {
              _id
              name
              packages {
                _id
                name
                products {
                  _id
                  name
                }
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  const warehouses = await warehouseLoader();
  const vehicles = await vehicleLoader();
  const drivers = await driverLoader();
  const transequipments = await transequipmentLoader();
  const containers = await containerLoader();
  const packages = await packageLoader();
  return {
    data,
    warehouses,
    vehicles,
    drivers,
    transequipments,
    containers,
    packages
  };
};

export const addOrder = async (payload) => {
  const query = `mutation Mutation($receiptNo: String!, $shipFrom: String!, $shipTo: String!, $warehouseId: String!, $vehicleId: String!, $driverId: String!, $transequipmentId: String!, $receivingDate: String!, $loadingDate: String!, $finishTime: String!, $createdBy: String!, $orderInput: ProductOrderInput!, $description: String!, $typeInput: String!, $type: String!) {
    addOrder(receiptNo: $receiptNo, shipFrom: $shipFrom, shipTo: $shipTo, warehouseId: $warehouseId, vehicleId: $vehicleId, driverId: $driverId, transequipmentId: $transequipmentId, receivingDate: $receivingDate, loadingDate: $loadingDate, finishTime: $finishTime, createdBy: $createdBy, orderInput: $orderInput, description: $description, typeInput: $typeInput, type: $type) {
      _id
      receiptNo
      warehouse {
        _id
        name
      }
      warehouseId
      vehicleId
      vehicle {
        _id
        name
      }
      driverId
      driver {
        _id
        name
      }
      transequipmentId
      transequipment {
        _id
        name
      }
      shipFrom
      shipTo
      receivingDate
      loadingDate
      finishTime
      createdBy
      description
      typeInput
      orderInput {
        containers {
          _id
          name
          packages {
            _id
            name
            products {
              _id
              name
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }`;
  const variables = {
    receiptNo: payload.receiptNo,
    shipFrom: payload.shipFrom,
    shipTo: payload.shipTo,
    warehouseId: payload.warehouseId,
    vehicleId: payload.vehicleId,
    driverId: payload.driverId,
    transequipmentId: payload.transequipmentId,
    receivingDate: payload.receivingDate,
    loadingDate: payload.loadingDate,
    finishTime: payload.finishTime,
    createdBy: payload.createdBy,
    orderInput: payload.orderInput,
    description: payload.description,
    typeInput: payload.typeInput,
    type: payload.type,
  };
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};

export const deleteOrder = async (payload) => {
  const query = `mutation Mutation($id: String!) {
        deleteorder(_id: $id)
      }
      `;
  const variables = {
    id: payload.id,
  };
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};

export const updateOrder = async (payload) => {
  console.log("payload", payload);
  const query = `mutation Mutation($id: String!, $name: String!, $userId: String!) {
      updateorder(_id: $id, name: $name, userId: $userId) {
        _id
        name
        code
        userId
        createdAt
        updatedAt
        user {
          fullName
          _id
          userName
        }
      }
    }`;
  const variables = {
    id: payload._id,
    code: payload.code,
    name: payload.name,
    userId: payload.userId,
  };
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};
