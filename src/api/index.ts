import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URI } from "../utils/constants";

export const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
