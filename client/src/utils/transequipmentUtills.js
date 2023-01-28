
import { GRAPHQL_SERVER } from "../constants";
export const transequipmentLoader = async() => {
    const query = `query transequipments {
        transequipments {
          _id
          createdAt
          type
          code
          owner
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
    return data;
}

export const addTransequipment = async(payload) => {
    const query = `mutation Mutation($code: String!, $type: String!, $owner: String!) {
        addTransequipment(code: $code, type: $type, owner: $owner) {
          _id
          code
          createdAt
          owner
          type
          updatedAt
        }
      }
      `
    const variables = {
        code: payload.code,
        type: payload.type,
        owner:payload.owner
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

export const deleteTransequipment = async(payload) => {
    const query = `mutation UpdateTransequipment($id: String!) {
        deleteTransequipment(_id: $id)
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

export const updateTransequipment = async(payload) => {
    const query = `mutation UpdateTransequipment($id: String!, $code: String!, $type: String!, $owner: String!) {
        updateTransequipment(_id: $id, code: $code, type: $type, owner: $owner) {
          _id
          code
          createdAt
          owner
          type
          updatedAt
        }
      }`
    const variables = {
        id: payload._id,
        code: payload.code,
        type: payload.type,
        owner:payload.owner
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