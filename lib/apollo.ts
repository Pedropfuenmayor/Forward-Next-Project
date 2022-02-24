import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.URI}/api/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getChallengesByProject: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          getIdeasByChallenge:{
            merge(existing, incoming) {
              return incoming;
            },
          },
          getActionsByUserId:{
            merge(existing, incoming) {
              return incoming;
            },
          },
          getProjectByUserId:{
            merge(existing, incoming) {
              return incoming;
            },
          }
        },
      },
    },
  }),
});
