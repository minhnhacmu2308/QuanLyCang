import { GRAPHQL_SERVER } from "../constants";
export const containerLoader = async () => {
  const query = `query containers {
        containers {
          _id
          createdAt
          color
          code
          size
          name
          owner
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
  return data;
};

export const addContainer = async (payload) => {
  const query = `mutation Mutation($code: String!, $size: String!, $color: String!, $owner: String!,$name: String!) {
        addContainer(code: $code, size: $size, color: $color, owner: $owner,name:$name) {
          _id
          code
          size
          name
          color
          owner
          createdAt
          updatedAt
        }
      }
      `;
  const variables = {
    code: payload.code,
    name: payload.name,
    color: payload.color,
    size: payload.size,
    owner: payload.owner,
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

export const deleteContainer = async (payload) => {
  const query = `mutation Mutation($id: String!) {
        deleteContainer(_id: $id)
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

export const updateContainer = async (payload) => {
  const query = `mutation Mutation($id: String!, $code: String!, $size: String!, $color: String!, $owner: String!,$name: String!) {
        updateContainer(_id: $id, code: $code, size: $size, color: $color, owner: $owner,name:$name) {
          _id
          code
          name
          size
          color
          owner
          createdAt
          updatedAt
        }
      }`;
  const variables = {
    id: payload._id,
    code: payload.code,
    name: payload.name,
    color: payload.color,
    size: payload.size,
    owner: payload.owner,
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
