'use client'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";



export const Providers = ({children} : {children: React.ReactNode}) => {
  const URI = "http://localhost:3000/api/graphql"
  const client = new ApolloClient({
    uri:URI,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
