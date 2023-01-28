import { GRAPHQL_SERVER } from "../constants";
export const unitLoader = async () => {
  const query = `query units {
        units {
          _id
          code
          createdAt
          description
          name
          updatedAt
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
  return data;
};

export const addUnit = async (payload) => {
  const query = `mutation Mutation($code: String!, $name: String!, $description: String!) {
    addUnit(code: $code, name: $name, description: $description) {
      _id
      code
      createdAt
      description
      name
      updatedAt
    }
  }
      `;
  const variables = {
    code: payload.code,
    name: payload.name,
    description: payload.description,
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

export const deleteUnit = async (payload) => {
  const query = `mutation Mutation($id: String!) {
    deleteUnit(_id: $id)
  } `;
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

export const updateUnit = async (payload) => {
  const query = `mutation Mutation($id: String!, $code: String!, $name: String!, $description: String!) {
    updateUnit(_id: $id, code: $code, name: $name, description: $description) {
      _id
      code
      createdAt
      description
      name
      updatedAt
    }
  }`;
  const variables = {
    id: payload._id,
    code: payload.code,
    name: payload.name,
    description: payload.description,
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
