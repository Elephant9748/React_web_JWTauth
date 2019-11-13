import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Loadpage } from "./loadpage";
import { ApolloProvider } from "@apollo/react-hooks";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          console.log("INDEX=", accessToken);
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        fetch(process.env.REACT_APP_URI_REFRESH_TOKEN, {
          method: "POST",
          credentials: "include"
        });
      },
      handleFetch: accessToken => {
        setAccessToken(accessToken);
      },

      handleError: err => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      }
    }),

    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: process.env.REACT_APP_URI_LOCAL,
      credentials: "include"
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Loadpage />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
