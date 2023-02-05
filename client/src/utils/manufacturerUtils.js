import { GRAPHQL_SERVER } from "../constants";
import { categoryLoader } from "./categoryUtils";
export const manufacturerLoader = async () => {
  const query = `query manufacturers {
        manufacturers {
          _id
          createdAt
          name
          producer
          categoryId
          category{
            _id
            name
          }
          code
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
  const category = await categoryLoader();
  return {
    data,
    category,
  };
};

export const addManufacturer = async (payload) => {
  const query = `mutation Mutation($code: String!, $name: String!,$producer:String!,$categoryId:String!) {
        addManufacturer(code: $code, name: $name,producer:$producer,categoryId:$categoryId) {
          _id
          code
          producer
          categoryId
          category{
            _id
            name
          }
          createdAt
          name
          updatedAt
        }
      }
      
      `;
  const variables = {
    code: payload.code,
    name: payload.name,
    categoryId: payload.categoryId,
    producer: payload.producer,
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

export const deleteManufacturer = async (payload) => {
  const query = `mutation Mutation($id: String!) {
        deleteManufacturer(_id: $id)
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

export const updateManufacturer = async (payload) => {
  const query = `mutation Mutation($id: String!, $code: String!, $name: String!,$producer:String!,$categoryId:String!) {
        updateManufacturer(_id: $id, code: $code, name: $name,producer:$producer,categoryId:$categoryId) {
          _id
          code
          producer
          categoryId
          category{
            _id
            name
          }
          createdAt
          name
          updatedAt
        }
      }`;
  const variables = {
    id: payload._id,
    code: payload.code,
    name: payload.name,
    categoryId: payload.categoryId,
    producer: payload.producer,
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
