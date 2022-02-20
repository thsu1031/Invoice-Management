import React, { useContext } from "react";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import usersContext from "../../context/users/users-context";
import {  createUserAPI } from "../../../src/services/userApi"

const schema = yup.object().shape({
  name: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  zipcode: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

const AddUser = ({ onClose, setAddNewUserFormVisibility }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addUser } = useContext(usersContext);

  const submitForm = (data) => {
    const id = v4();

    const newUser = {
      id: id,
      name: data.name,
      street: data.street,
      city: data.city,
      zipcode: data.zipcode,
      phone: data.phone,
      email: data.email,
    };

    createUserAPI(newUser).then((result)=> {
      if (!result.ok) {
        const message = `An error has occured: ${result.status}`;
        throw new Error(message);
      }
      addUser(newUser);
      setAddNewUserFormVisibility(false);

    })
    .catch((error) => {
      console.log(`error adding new user`, error);
    })
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body id="add-user-modal">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoComplete="off"
              {...register("name", { required: true })}
            />
            <p>{errors.name?.message}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              autoComplete="off"
              {...register("street", { required: true })}
            />
          </Form.Group>
          <p>{errors.street?.message}</p>
          <Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                autoComplete="off"
                {...register("city", { required: true })}
              />
              <p>{errors.city?.message}</p>
            </Col>

            <Col>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                autoComplete="off"
                {...register("zipcode", { required: true })}
              />
              <p>{errors.zipcode?.message}</p>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              autoComplete="off"
              {...register("phone", { required: true })}
            />
          </Form.Group>
          <p>{errors.phone?.message}</p>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              autoComplete="off"
              {...register("email", { required: true })}
            />
          </Form.Group>
          <p> {errors.email && errors.email.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddUser;
