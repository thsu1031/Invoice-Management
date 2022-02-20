import React, { useState, useMemo,  useContext} from "react";
import {
  TableHeader,
  Search,
  PaginationComponent,
} from "../../components/DataTable/index";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import invoicesContext from "../../context/invoices/invoices-context";
import { createInvoiceAPI, deleteInvoiceAPI } from "../../services/invoiceApi";

const timeConverter = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + " " + month + " " + year;
  return time;
};

const Invoices = () => {
  const { invoices, addInvoice, deleteInvoice } = useContext(invoicesContext);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;
  const navigate = useNavigate();

  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Customer Name", field: "customerName", sortable: true },
    { name: "Title", field: "title", sortable: true },
    { name: "Due Date", field: "dueDate", sortable: true },
    { name: "Status", field: "isPaid", sortable: true },
    { name: "Actions", field: "actions", sortable: false },
  ];

  const invoicesData = useMemo(() => {
    let computedInvoices = invoices;

    setTotalItems(computedInvoices.length);

    if (search) {
      computedInvoices = computedInvoices.filter(
        (invoice) =>
          (invoice.hasOwnProperty("title") &&
            invoice.title.toLowerCase().includes(search.toLowerCase())) ||
          (invoice.hasOwnProperty("customerName") &&
            invoice.customerName
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (invoice.hasOwnProperty("dueDate") &&
            timeConverter(invoice.dueDate)
              .toLowerCase()
              .includes(search.toLowerCase())) || 
          (invoice.hasOwnProperty("id") && invoice.id.toLowerCase().includes(search.toLocaleLowerCase()))
      );
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      // eslint-disable-next-line array-callback-return
      computedInvoices = computedInvoices.sort((a, b) => {
        if (a[sorting.field] && b[sorting.field]) {
          return (
            reversed *
            a[sorting.field]
              .toString()
              .localeCompare(b[sorting.field].toString())
          );
        }
      });
    }

    return computedInvoices.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [sorting, invoices, search, currentPage]);

  const clickDeleteHandler = (id) => {
    deleteInvoiceAPI(id)
      .then((result) => {
        if (!result.ok) {
          const message = `An error has occured: ${result.status}`;
          throw new Error(message);
        }
        deleteInvoice(id);
      })
      .catch((error) => {
        console.log(`error in deleting invoice`, error);
      });
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

  return (
    <Container>
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
            <Button onClick={callAddInvoiceAPI}>
              <FontAwesomeIcon icon={faFileInvoiceDollar}></FontAwesomeIcon>
            </Button>
          </div>
        </div>
        <Table responsive>
          <TableHeader
            className="table align-middle"
            headers={headers}
            onSorting={(field, order) => {
              setSorting({ field, order });
            }}
          />
          <tbody>
            {invoicesData.map((invoice) => (
              <tr key={invoice.id}>
                <th scope="row">{invoice.id}</th>
                <td>{invoice.customerName}</td>
                <td>{invoice.title}</td>
                <td>{timeConverter(invoice.dueDate)}</td>
                <td>
                  {invoice.isPaid === true ? (
                    <span className="badge bg-primary">Paid</span>
                  ) : (
                    <span className="badge bg-danger">Unpaid</span>
                  )}
                </td>
                <td>
                  <Link to={`/invoices/${invoice.id}`}>
                    <Button
                      className="action-button"
                      size="sm"
                      type="button"
                      key={invoice.id}
                      to={`/invoices/${invoice.id}`}
                    >
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </Button>
                  </Link>
                  <Button
                    className="action-button"
                    size="sm"
                    type="button"
                    onClick={() => clickDeleteHandler(invoice.id)}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Invoices;
