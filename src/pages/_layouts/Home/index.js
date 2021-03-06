import React, { useMemo, useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import invoicesContext from "../../../context/invoices/invoices-context";
import { createInvoiceAPI } from "../../../services/invoiceApi.js";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import AddUser from "../../../components/AddUser";
import {
  calculatePaid,
  calculateUnPaid,
  calculateOverdue,
  calculateRevenue,
} from "./dashboardCalculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenue",
    },
  },
};

const labels = [
  ["Jan", 2022],
  ["Feb", 2022],
  ["Mar", 2022],
  ["Apr", 2022],
  ["May", 2022],
  ["Jun", 2022],
  ["Jul", 2022],
  ["Aug", 2022],
  ["Sep", 2022],
  ["Oct", 2022],
  ["Nov", 2022],
  ["Dec", 2022],
];

const Home = () => {
  const { invoices, addInvoice } = useContext(invoicesContext);
  const paid = useMemo(() => calculatePaid(invoices), [invoices]);
  const unpaid = useMemo(() => calculateUnPaid(invoices), [invoices]);
  const onverdue = useMemo(() => calculateOverdue(invoices), [invoices]);
  const lineChartData = useMemo(() => calculateRevenue(invoices), [invoices]);
  const navigate = useNavigate();

  const data = {
    labels,
    datasets: [
      {
        label: "revenue",
        data: lineChartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  function callAddInvoiceAPI() {
    const id = nanoid(7);
    const newInvoice = {
      id: id,
      lineItems: {},
      title: "",
      customerId: "",
      customerName: "",
      dueDate: Date.now() / 1000,
      createDate: Date.now() / 1000,
      notes:
        "Thank you for your business. Please contact us with any questions regarding this invoice.",
      isPaid: false,
      customerAddress: {
        street: "street",
        city: "city",
        zipcode: "zip",
      },
    };

    createInvoiceAPI(newInvoice)
      .then((result) => {
        if (!result.ok) {
          const message = `An error has occured: ${result.status}`;
          throw new Error(message);
        }

        addInvoice(newInvoice);
        navigate(`/invoices/${id}`);
      })
      .catch((error) => {
        console.log(`error in adding new invoice`, error);
      });
  }
  const [addNewUserFormVisibility, setAddNewUserFormVisibility] =
    useState(false);

  const toggleAddUserFormVisibility = () =>
    setAddNewUserFormVisibility((visibility) => !visibility);

  return (
    <Container data-testid="Home-test">
      <Row className="pt-3">
        <Dropdown>
          <Dropdown.Toggle variant="success">New</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={callAddInvoiceAPI}>
              New Invoice
            </Dropdown.Item>
            <Dropdown.Item onClick={toggleAddUserFormVisibility}>
              Add User
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row className="pt-3">
        <Col className="tile-padding" md={3} xs={12}>
          <Card border="success">
            <Card.Body>
              <Card.Title>Total invoice</Card.Title>
              <Card.Text>{invoices.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="tile-padding" md={3} xs={12}>
          <Card border="warning">
            <Card.Body>
              <Card.Title>Overdue</Card.Title>
              <Card.Text>{onverdue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="tile-padding" md={3} xs={12}>
          <Card border="success">
            <Card.Body>
              <Card.Title>Paid</Card.Title>
              <Card.Text>{paid}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="tile-padding" md={3} xs={12}>
          <Card border="danger">
            <Card.Body>
              <Card.Title>Unpaid</Card.Title>
              <Card.Text>{unpaid}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-3">
        <Line options={options} data={data} />
      </Row>
      {addNewUserFormVisibility && (
        <AddUser
          onClose={toggleAddUserFormVisibility}
          setAddNewUserFormVisibility={setAddNewUserFormVisibility}
        />
      )}
    </Container>
  );
};

export default Home;
