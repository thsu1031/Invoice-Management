import React, { useState, useMemo, useContext } from "react";
import {
  TableHeader,
  Search,
  PaginationComponent,
} from "../../components/DataTable/index";
import EditableTable from "../../components/Table/EditableTable";
import AddUser from "../../components/AddUser";
import { userTableConstants } from "./userTableConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import usersContext from "../../context/users/users-context";
import { deleteUserAPI, updateUserAPI } from "../../services/userApi";

const schema = yup.object().shape({
  name: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  zipcode: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

const Users = () => {

  const  { users, editUser, deleteUser } = useContext(usersContext);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;
  const [editUserId, setEditUserId] = useState(null);
  const [editUserInput, setEditUserInput] = useState({
    name: "",
    street: "",
    city: "",
    zipcode: "",
    phone: "",
    email: "",
  });

  const [addNewUserFormVisibility, setAddNewUserFormVisibility] =
    useState(false);

  const headers = [
    { name: "Name", field: "name", sortable: true },
    { name: "Phone", field: "phone", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Street", field: "street", sortable: true },
    { name: "City", field: "city", sortable: true },
    { name: "Zip Code", field: "zipcode", sortable: true },
    { name: "Actions", field: "actions", sortable: false },
  ];

  const toggleAddUserFormVisibility = () =>
    setAddNewUserFormVisibility((visibility) => !visibility);

  const usersData = useMemo(() => {
    let computedUsers = users;
    setTotalItems(users.length);
    if (search) {
      computedUsers = computedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.phone.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.street.toLowerCase().includes(search.toLowerCase()) ||
          user.city.toLowerCase().includes(search.toLowerCase()) ||
          user.zipcode.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedUsers = computedUsers.sort((a, b) => {
        return (
          reversed *
          a[sorting.field].toString().localeCompare(b[sorting.field].toString())
        );
      });
    }

    return computedUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [sorting, users, search, currentPage]);

  const submitForm = (data) => {
    const editedUser = {
      id: editUserId,
      name: data.name,
      street: data.street,
      city: data.city,
      zipcode: data.zipcode,
      phone: data.phone,
      email: data.email,
    };

    updateUserAPI(editUserId, editedUser)
      .then((update) => {
        editUser(update);
        setEditUserInput({
          name: "",
          street: "",
          city: "",
          zipcode: "",
          phone: "",
          email: "",
        });
        setEditUserId(null);
      })
      .catch((error) => {
        console.log(`error in updating user`, error);
      });
  };

  const clickEditHandler = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);
    const formValues = {
      name: user.name,
      street: user.street,
      city: user.city,
      zipcode: user.zipcode,
      phone: user.phone,
      email: user.email,
    };
    setEditUserInput(formValues);
  };

  const clickCancelHandler = (event) => {
    event.preventDefault();
    setEditUserId(null);
  };

  const clickDeleteHandler = (user) => {
    deleteUserAPI(user.id)
      .then((result) => {
        if (result.ok === true) {
          deleteUser(user.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container data-testid="Users-test">
  
      <Row>
        <Col md={6} className="d-flex pt-2">
          <PaginationComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
        <Col md={6} className="d-flex flex-row-reverse pt-2">
          <Search
            onSearch={(value) => {
              setSearch(value);
            }}
          />
        </Col>
        <div className="pt-3">
          <div className="float-end">
            <Button className="float-end" onClick={toggleAddUserFormVisibility}>
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
      </Row>
      <h1>Users</h1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Table className="text-center">
          <TableHeader
            className="table"
            headers={headers}
            onSorting={(field, order) => {
              setSorting({ field, order });
            }}
          />
          <tbody>
            <EditableTable
              cols={userTableConstants(editUserInput)}
              data={usersData}
              editId={editUserId}
              clickEditHandler={clickEditHandler}
              // editChangeHandler={editUserChangeHandler}
              clickCancelHandler={clickCancelHandler}
              clickDeleteHandler={clickDeleteHandler}
              schema={schema}
              register={register}
            />
          </tbody>
        </Table>
      </Form>
      {addNewUserFormVisibility && (
        <AddUser
          onClose={toggleAddUserFormVisibility}
          setAddNewUserFormVisibility={setAddNewUserFormVisibility}
        />
      )}
    </Container>
  );
};

export default Users;
