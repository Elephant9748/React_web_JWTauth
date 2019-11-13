import gql from "graphql-tag";

export const GET_USERS = gql`
  {
    Users {
      userId
      name
      password
      tokenversion
    }
  }
`;

export const NEW_USER = gql`
  mutation($name: String!, $password: String!) {
    newUser(name: $name, password: $password) {
      userId
      name
    }
  }
`;

export const LOGIN = gql`
  mutation($name: String!, $password: String!) {
    logIn(name: $name, password: $password) {
      accessToken
      user {
        userId
        name
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      userId
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation{
    logout
  }
`;
