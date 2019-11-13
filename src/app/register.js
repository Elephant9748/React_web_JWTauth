import React from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";
import { useMutation } from "@apollo/react-hooks";
import { NEW_USER } from "./query";

const Register = ({ useHistory }) => {
  const [newUser] = useMutation(NEW_USER);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let history = useHistory();

  return (
    <div>
      {/* <Container> */}
      <Row>
        <Col md={{ size: 4 }} style={{ paddingTop: 20 }}>
          <Card>
            <CardHeader>
              <h3>Register</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={async e => {
                e.preventDefault();
                console.log("form submited");
                const save = await newUser({
                  variables: {
                    name: username,
                    password: password
                  }
                });
                console.log(save);

                history.push("/");
              }}>
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
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <Button theme="success" type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* </Container> */}
    </div>
  );
};

export default Register;
