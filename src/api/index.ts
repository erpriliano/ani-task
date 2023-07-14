import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
