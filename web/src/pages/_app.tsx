import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import "../styles/IndexMap.css";

import { AppProps } from "next/app";
import {
  createClient,
  dedupExchange,
  Provider,
  subscriptionExchange,
} from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { createClient as createWSClient } from "graphql-ws";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const wsClient = process.browser
  ? createWSClient({
      url: process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL as string,
    })
  : null;

const exchanges = [
  dedupExchange,
  cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({ me: null })
          );
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            {
              query: MeDocument,
            },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user,
                };
              }
            }
          );
        },
        // register: (_result, args, cache, info) => {
        //   betterUpdateQuery<RegisterMutation, MeQuery>(
        //     cache,
        //     {
        //       query: MeDocument,
        //     },
        //     _result,
        //     (result, query) => {
        //       if (result.register.errors) {
        //         return query;
        //       } else {
        //         return {
        //           me: result.register.user,
        //         };
        //       }
        //     }
        //   );
        // },
      },
    },
  }),
  multipartFetchExchange,
];

if (wsClient) {
  exchanges.push(
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = wsClient?.subscribe(operation, sink as any);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    })
  );
}

const client = createClient({
  url: process.env.NEXT_PUBLIC_SERVER_API_URL as string,
  fetchOptions: {
    credentials: "include",
  },
  exchanges: exchanges,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        {/* @ts-expect-error Server Component */}
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
