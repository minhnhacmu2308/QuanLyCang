import { GRAPHQL_SERVER } from "../constants";
import { productLoader } from "./productUtils";
import { warehouseLoader } from "./warehouseUtils.js";
import { vehicleLoader } from "./vehicleUtil.js";
import { containerLoader } from "./containerUtils";
import { packageLoader } from "./packageUtils";
import { driverLoader, customerLoader } from "./userUtils.js";
import { transequipmentLoader } from "./transequipmentUtills.js";
export const orderLoader = async () => {
  const query = `query Query {
        orders {
          _id
          receiptNo
          warehouse {
            _id
            name
            userId
          }
          warehouseId
          vehicleId
          vehicle {
            _id
            type
          }
          driverId
          driver {
            _id
            fullName
          }
          customerId
          customer {
            _id
            fullName
          }
          transequipmentId
          transequipment {
            _id
            type
          }
          shipFrom
          shipTo
          receivingDate
          loadingDate
          finishTime
          createdBy
          description
          type
          typeInput
          orderInput {
            containers {
              containerId
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
  const products = await productLoader();
  const customers = await customerLoader();
  return {
    data,
    warehouses,
    vehicles,
    drivers,
    transequipments,
    containers,
    packages,
    products,
    customers,
  };
};

export const orderOutputLoader = async () => {
  const query = `query Query {
        orderOutputs{
          _id
          receiptNo
          warehouse {
            _id
            name
            userId
          }
          warehouseId
          vehicleId
          vehicle {
            _id
            type
          }
          driverId
          driver {
            _id
            fullName
          }
          customerId
          customer {
            _id
            fullName
          }
          transequipmentId
          transequipment {
            _id
            type
          }
          shipFrom
          shipTo
          receivingDate
          loadingDate
          finishTime
          createdBy
          description
          type
          typeInput
          orderInput {
            containers {
              containerId
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
  const products = await productLoader();
  const customers = await customerLoader();
  return {
    data,
    warehouses,
    vehicles,
    drivers,
    transequipments,
    containers,
    packages,
    products,
    customers,
  };
};

export const orderByWarehouse = async (payload) => {
  console.log("userId", payload);
  const query = `query OrderByWarehouse($userId: String!) {
    orderByWarehouse(userId: $userId) {
      _id
      receiptNo
      warehouse {
        _id
        name
        userId
      }
      warehouseId
      vehicleId
      vehicle {
        _id
        type
      }
      customerId
      customer {
        _id
        fullName
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
      }
      shipFrom
      shipTo
      type
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
    userId: payload,
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
  const warehouses = await warehouseLoader();
  const vehicles = await vehicleLoader();
  const drivers = await driverLoader();
  const transequipments = await transequipmentLoader();
  const containers = await containerLoader();
  const packages = await packageLoader();
  const products = await productLoader();
  return {
    data,
    warehouses,
    vehicles,
    drivers,
    transequipments,
    containers,
    packages,
    products,
  };
};

export const orderById = async (payload) => {
  const query = `query Order($orderId: String!) {
    order(id: $orderId) {
      _id
      receiptNo
      warehouse {
        _id
        name
        userId
      }
      warehouseId
      vehicleId
      vehicle {
        _id
        type
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
      }
      shipFrom
      shipTo
      type
      receivingDate
      loadingDate
      finishTime
      createdBy
      description
      typeInput
      orderInput {
         containers {
                containerId
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
    orderId: payload,
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

export const orderByIdNew = async (payload) => {
  const query = `query Order($orderId: String!) {
    order(id: $orderId) {
      _id
      receiptNo
      warehouse {
        _id
        name
        userId
      }
      warehouseId
      vehicleId
      vehicle {
        _id
        type
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
      }
      shipFrom
      shipTo
      type
      receivingDate
      loadingDate
      finishTime
      createdBy
      description
      typeInput
      orderInput {
        products {
          _id
          name
        }
      }
      createdAt
      updatedAt
    }
  }`;
  const variables = {
    orderId: payload,
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

export const addOrder = async (payload) => {
  const query = `mutation Mutation($receiptNo: String!, $shipFrom: String!, $shipTo: String!, $warehouseId: String!, $vehicleId: String!, $driverId: String!, $transequipmentId: String!, $receivingDate: String!, $loadingDate: String!, $finishTime: String!, $createdBy: String!, $orderInput: ProductOrderInput!, $description: String!, $typeInput: String!, $type: String!) {
    addOrder(receiptNo: $receiptNo, shipFrom: $shipFrom, shipTo: $shipTo, warehouseId: $warehouseId, vehicleId: $vehicleId, driverId: $driverId, transequipmentId: $transequipmentId, receivingDate: $receivingDate, loadingDate: $loadingDate, finishTime: $finishTime, createdBy: $createdBy, orderInput: $orderInput, description: $description, typeInput: $typeInput, type: $type) {
      _id
      receiptNo
      warehouse {
        _id
        name
        userId
      }
      warehouseId
      vehicleId
      vehicle {
        _id
        type
      }
      customerId
      customer {
        _id
        fullName
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
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
          containerId
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
  let orderInput = {
    containers: payload.orderInput,
  };
  console.log("orderInpututil", payload);
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
    createdBy: "Admin",
    orderInput: orderInput,
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


export const addOrderNew = async (payload) => {
  const query = `mutation Mutation($receiptNo: String!, $shipFrom: String!, $shipTo: String!,  $vehicleId: String!, $driverId: String!,$customerId: String!, $transequipmentId: String!, $receivingDate: String!, $loadingDate: String!, $finishTime: String!, $createdBy: String!, $orderInput: ProductOrderNewInput!, $description: String!, $typeInput: String!, ) {
    addOrderNew(receiptNo: $receiptNo, shipFrom: $shipFrom, shipTo: $shipTo,  vehicleId: $vehicleId, driverId: $driverId,customerId:$customerId, transequipmentId: $transequipmentId, receivingDate: $receivingDate, loadingDate: $loadingDate, finishTime: $finishTime, createdBy: $createdBy, orderInput: $orderInput, description: $description, typeInput: $typeInput) {
      _id
      receiptNo
      warehouse {
        _id
        name
        userId
      }
      vehicleId
      vehicle {
        _id
        type
      }
      customerId
      customer {
        _id
        fullName
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
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
        products {
          _id
          name
        }
      }
      createdAt
      updatedAt
    }
  }`;
  let orderInput = {
    products: payload.orderInput,
  };
  console.log("orderInpututil", payload);
  const variables = {
    receiptNo: payload.receiptNo,
    shipFrom: payload.shipFrom,
    shipTo: payload.shipTo,
    customerId:payload.customerId,
    vehicleId: payload.vehicleId,
    driverId: payload.driverId,
    transequipmentId: payload.transequipmentId,
    receivingDate: payload.receivingDate,
    loadingDate: payload.loadingDate,
    finishTime: payload.finishTime,
    createdBy: "Admin",
    orderInput: orderInput,
    description: payload.description,
    typeInput: payload.typeInput,
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
  console.log("payload", payload);
  const query = `mutation Mutation($id: String!) {
    deleteOrder(_id: $id)
  }`;
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

export const deleteOrderNew = async (payload) => {
  const query = `mutation DeleteOrder($id: String!) {
        deleteOrder(_id: $id)
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
  const query = `mutation Mutation($id: String!, $typeInput: String!, $customerId: String!,$shipTo: String!) {
    updateOrder(_id: $id, typeInput: $typeInput, customerId: $customerId,shipTo:$shipTo) {
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
        type
      }
      driverId
      driver {
        _id
        fullName
      }
      transequipmentId
      transequipment {
        _id
        type
      }
      customerId
      customer {
        _id
        fullName
      }
      shipFrom
      shipTo
      type
      receivingDate
      loadingDate
      finishTime
      createdBy
      description
      typeInput
      orderInput {
        containers {
          containerId
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
    id: payload._id,
    typeInput: "Xuất hàng",
    shipTo: payload.shipTo,
    customerId: payload.customerId,
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
