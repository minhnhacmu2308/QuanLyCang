import { GRAPHQL_SERVER } from "../constants";
import { userLoader } from "./userUtils.js";
export const warehouseLoader = async() => {
    const query = `query Query {
        warehouses {
          _id
          name
          code
          userId
          user {
            _id
            userName
            fullName
          }
          createdAt
          updatedAt
        }
      }`;
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await res.json();
    const user = await userLoader();
    return {
        data,
        user
    };
}

export const addWarehouse = async(payload) => {
    const query = `mutation Mutation($code: String!, $name: String!, $userId: String!) {
        addWarehouse(code: $code, name: $name, userId: $userId) {
          _id
          name
          code
          user {
            _id
            fullName
            userName
          }
          createdAt
          updatedAt
        }
      }
      `
    const variables = {
        code: payload.code,
        name: payload.name,
        userId:payload.userId
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const deleteWarehouse = async(payload) => {
    const query = `mutation Mutation($id: String!) {
        deleteWarehouse(_id: $id)
      }
      `
    const variables = {
        id: payload.id,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const updateWarehouse = async(payload) => {
  console.log("payload",payload)
    const query = `mutation Mutation($id: String!, $name: String!, $userId: String!) {
      updateWarehouse(_id: $id, name: $name, userId: $userId) {
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
    }`
    const variables = {
        id: payload._id,
        code: payload.code,
        name: payload.name,
        userId:payload.userId
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}