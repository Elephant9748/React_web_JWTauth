import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "./query";

const Me = () => {
  const [open, setOpen] = React.useState(true);
  const getme = useMe();

  if (!getme) {
    return (
      <Modal open={open} toggle={() => setOpen(!open)}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody> Data Not Found ! </ModalBody>
      </Modal>
    );
  }

  if (getme.ok) {
    return (
      <Modal open={open} toggle={() => setOpen(!open)}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody> {getme.msg} </ModalBody>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col
            md={{ size: 12 }}
            style={{ paddingTop: 40, textAlign: "center" }}
          >
            <h3>{getme.ok ? "" : getme.me.name} Page</h3>
          </Col>
          <Col
            md={{ size: 10, order: 1, offset: 1 }}
            sm={{ size: 12 }}
            style={{
              paddingTop: 20
            }}
          >
            <Card style={{ textAlign: "center" }}>
              <CardHeader>Data User</CardHeader>
              <CardBody>
                <ul>
                  <li>
                    {getme.ok ? "" : `${getme.me.userId} ${getme.me.name}`}{" "}
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const useMe = () => {
  const { data, error } = useQuery(ME, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });

  if (!data) {
    return null;
  }

  if (error) {
    return {
      ok: true,
      msg: error.graphQLErrors[0].message
    };
  }

  return data;
};

export default Me;
