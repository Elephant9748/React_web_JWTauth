import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, ME, LOGOUT } from "./query";
import { getAccessToken, setAccessToken } from "../accessToken";

const Home = ({ Link }) => {
  const [click, setClick] = React.useState(false);
  const [usersmodal, setUsersmodal] = React.useState(false);
  const [logout] = useMutation(LOGOUT);
  //graphql
  const mequery = useMequery();
  const { error, data } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network"
  });

  if (!data) {
    return null;
  }

  if (error) {
    return <h1>Error {error.message}</h1>;
  }

  const selectLink = map => {
    switch (map) {
      case "Login":
        return "/login";
      case "Register":
        return "/register";
      case "Me":
        return "/me";
      default:
        return "/";
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col
            md={{ size: 12 }}
            style={{ paddingTop: 40, textAlign: "center" }}
          >
            <h3>Simple Page</h3>
          </Col>
          <Col
            md={{ size: 10, order: 1, offset: 1 }}
            sm={{ size: 12 }}
            style={{
              paddingTop: 20
            }}
          >
            <Card style={{ textAlign: "center" }}>
              <CardHeader>Data Users</CardHeader>
              <CardBody>
                <div>
                  {usersmodal ? (
                    <table align="center">
                      <thead style={{ textAlign: "left" }}>
                        <tr>
                          <th>UserId</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.Users.map((user, key) => {
                          return (
                            <tr key={key}>
                              <td style={{ textAlign: "left" }}>
                                {user.userId}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                {user.name}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                </div>
                <br />
                <div>
                  {[
                    "Logout",
                    "Login",
                    "Register",
                    "Me",
                    "Users",
                    "Access Token"
                  ].map((map, key) => {
                    return (
                      <Link key={key} to={selectLink(map)}>
                        <Button
                          style={{ marginLeft: 10 }}
                          theme={
                            map === "Login"
                              ? "primary"
                              : map === "Me"
                              ? "light"
                              : map === "Users"
                              ? "warning"
                              : map === "Access Token"
                              ? "danger"
                              : map === "Logout"
                              ? "danger"
                              : "dark"
                          }
                          key={key}
                          onClick={async () => {
                            if (map === "Access Token") {
                              return setClick(!click);
                            }
                            if (map === "Users") {
                              return setUsersmodal(!usersmodal);
                            }

                            if (map === "Logout") {
                              await logout();
                              setAccessToken("");
                            }

                            return false;
                          }}
                        >
                          {map}
                        </Button>
                      </Link>
                    );
                  })}

                  <Modal open={click} toggle={() => setClick(!click)}>
                    <ModalHeader>Acess Token </ModalHeader>
                    <ModalBody>
                      {" "}
                      {getAccessToken() === ""
                        ? "!No access token"
                        : getAccessToken()}{" "}
                      <br />
                      <p style={{ color: "blue" }}>
                        {mequery
                          ? `* ${mequery.me.name} ${mequery.me.userId} `
                          : ""}
                      </p>
                    </ModalBody>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const useMequery = () => {
  const { data, error } = useQuery(ME, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });

  if (!data) {
    return null;
  }

  if (error) {
    return null;
  }

  return data;
};

export default Home;
