import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import Config from "./config";

const client = new ApolloClient({
  link: createHttpLink({
    uri: Config.gqlUrl,
    // credentials: 'include',
    // fetchOptions: {
    //   mode: 'no-cors',
    // },
  }),
  cache: new InMemoryCache(),
});

const useApolloProvider = () => {
  return [client, ApolloProvider];
};

export default useApolloProvider;
