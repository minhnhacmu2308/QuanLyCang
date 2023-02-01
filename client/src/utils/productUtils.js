import { GRAPHQL_SERVER } from "../constants";
import { unitLoader } from "./unitUtils.js";
import { categoryLoader } from "./categoryUtils.js";
export const productLoader = async () => {
  const query = `query Query {
        Products {
          _id,
          unit {
            _id,name,code
          },
          name,
          code,
          color,size,
          category {
            _id,name,code
          },
          unitId,
          categoryId
        }
      }
      `;
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  const units = await unitLoader();
  const categorys = await categoryLoader();
  return {
    data,
    units,
    categorys,
  };
};

export const addProduct = async (payload) => {
  const query = `mutation Mutation($code: String!, $name: String!, $size: String!, $color: String!, $unitId: String!, $categoryId: String!) {
        addProduct(code: $code, name: $name, size: $size, color: $color, unitId: $unitId, categoryId: $categoryId) {
          _id
          category {
            _id
            code
            name
          }
          categoryId
          code
          color
          createdAt
          name
          size
          unitId
          updatedAt
          unit {
            _id
            code
            name
          }
        }
      }
      `;
  const variables = {
    code: payload.code,
    name: payload.name,
    unitId: payload.unitId,
    categoryId: payload.categoryId,
    color: payload.color,
    size: payload.size,
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

export const deleteProduct = async (payload) => {
  const query = `mutation DeleteProduct($id: String!) {
        deleteProduct(_id: $id)
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

export const updateProduct = async (payload) => {
  console.log("payload", payload);
  const query = `mutation DeleteProduct($id: String!, $name: String!, $size: String!, $color: String!, $unitId: String!, $categoryId: String!) {
        updateProduct(_id: $id, name: $name, size: $size, color: $color, unitId: $unitId, categoryId: $categoryId) {
            _id
            category {
              _id
              code
              name
            }
            categoryId
            code
            color
            createdAt
            name
            size
            unitId
            updatedAt
            unit {
              _id
              code
              name
            }
        }
      }`;
  const variables = {
    id: payload._id,
    code: payload.code,
    name: payload.name,
    unitId: payload.unitId,
    categoryId: payload.categoryId,
    size: payload.size,
    color: payload.color,
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
