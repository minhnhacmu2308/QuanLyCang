import { GRAPHQL_SERVER } from "../constants";
export const vehicleLoader = async () => {
  const query = `query Vehicles {
        vehicles {
          _id
          createdAt
          type
          code
          image
          licensePlates
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

export const addVehicle = async (payload) => {
  const query = `mutation Mutation($code: String!, $type: String!, $owner: String!,$image:String!,$licensePlates:String!) {
        addVehicle(code: $code, type: $type, owner: $owner,image:$image,licensePlates:$licensePlates) {
          _id
          code
          createdAt
          owner
          image
          licensePlates
          type
          updatedAt
        }
      }
      `;
  const variables = {
    code: payload.code,
    type: payload.type,
    image: payload.image,
    licensePlates: payload.licensePlates,
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

export const deleteVehicle = async (payload) => {
  const query = `mutation UpdateVehicle($id: String!) {
        deleteVehicle(_id: $id)
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

export const updateVehicle = async (payload) => {
  const query = `mutation UpdateVehicle($id: String!, $code: String!, $type: String!, $owner: String!,$licensePlates:String!) {
        updateVehicle(_id: $id, code: $code, type: $type, owner: $owner,licensePlates:$licensePlates) {
          _id
          code
          createdAt
          licensePlates
          owner
          type
          updatedAt
        }
      }`;
  console.log("payload", payload);
  const variables = {
    id: payload._id,
    code: payload.code,
    type: payload.type,
    licensePlates: payload.licensePlates,
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
