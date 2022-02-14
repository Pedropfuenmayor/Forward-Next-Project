import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getChallengesByProject: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
