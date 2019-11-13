import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormInput,
  FormGroup
} from "shards-react";
import { LOGIN } from "./query";
import { useMutation } from "@apollo/react-hooks";
import { setAccessToken, getAccessToken } from "../accessToken";

const Login = ({ useHistory }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPasword] = React.useState("");
  const [logIn] = useMutation(LOGIN);
  let history = useHistory();

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 50 }}>
        <Row>
          <Col md={{ size: 4, order: 4, offset: 4 }}>
            <Card>
              <CardHeader style={{ textAlign: "center" }}>
                <h3>Sign In</h3>
              </CardHeader>

              <CardBody>
                <Form
                  onSubmit={async e => {
                    e.preventDefault();
                    console.log("form submitted");
                    const save = await logIn({
                      variables: {
                        name: username,
                        password: password
                      },
                      // if u need update the cache
                      // update: (store, {data}) => {
                      //   if(!data){
                      //     return null;
                      //   }

                      //   store.writeQuery({
                      //     query: ME,
                      //     data: data.logIn.user
                      //   })
                      // }
                    });

                    console.log(save.data.logIn.accessToken);

                    //set access token
                    if(save && save.data){
                      setAccessToken(save.data.logIn.accessToken);
                      // accessToken = save.data.logIn.accessToken
                    }
                    console.log("LOGIN = ",getAccessToken());
                    history.push("/");

                  }}
                >
                  <FormGroup>
                    <label htmlFor="#username">Username</label>
                    <FormInput
                      id="#username"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#password">Password</label>
                    <FormInput
                      type="password"
                      id="#password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPasword(e.target.value)}
                    />
                  </FormGroup>
                  <Row>
                    <Col md={{ size: 12 }}>
                      <Button theme="success" type="submit">Login</Button>
                      <span style={{ marginLeft: 130 }}>Forgot Password ?</span>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
