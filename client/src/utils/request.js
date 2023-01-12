import { GRAPHQL_SERVER } from "../constants/index.js";

export const graphQLRequest = async(payload, options = {}) => {
    console.log(GRAPHQL_SERVER);
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options
        },
        body: JSON.stringify(payload)
    });
    const { data } = await res.json();
    return data;
}