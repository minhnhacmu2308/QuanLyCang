import { GRAPHQL_SERVER } from "../constants";
export const packageLoader = async () => {
  const query = `query packages {
        packages {
          _id
          createdAt
          color
          code
          name
          size
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

export const addPackage = async (payload) => {
  const query = `mutation Mutation($code: String!, $size: String!, $name: String!, $color: String!, $owner: String!) {
    addPackage(code: $code, size: $size, name: $name, color: $color, owner: $owner) {
      _id
      code
      name
      size
      color
      owner
      createdAt
      updatedAt
    }
  }
      `;
  const variables = {
    code: payload.code,
    color: payload.color,
    size: payload.size,
    name: payload.name,
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

export const deletePackage = async (payload) => {
  const query = `mutation Mutation($id: String!) {
        deletePackage(_id: $id)
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

export const updatePackage = async (payload) => {
  const query = `mutation Mutation($id: String!, $code: String!, $size: String!, $name: String!, $color: String!, $owner: String!) {
    updatePackage(_id: $id, code: $code, size: $size, name: $name, color: $color, owner: $owner) {
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
    color: payload.color,
    size: payload.size,
    name: payload.name,
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
