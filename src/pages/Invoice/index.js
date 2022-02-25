import React, { useState, useEffect, useMemo, useContext } from "react";
import { TableHeader, Search } from "../../components/DataTable/index";
import { useParams } from "react-router-dom";
import { API_INVOICES } from "../../global/constants";
import AutoComplete from "../../components/AutoComplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import EditableTable from "../../components/Table/EditableTable";
import { itemTableConstants } from "./itemTableConstants";
import AddLineItem from "../../components/AddLineItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./styles.css";
import _ from "lodash";
import usersContext from "../../context/users/users-context";
import invoicesContext from "../../context/invoices/invoices-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateInvoiceAPI } from "../../services/invoiceApi";

const schema = yup.object().shape({
  description: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
});

const flattenLineItems = (invoice) => {
  let flattenLineItems = invoice.lineItems;
  const lineItemsArray = [];

  for (const lineItemId in flattenLineItems) {
    let lineItem = {};
    if (!flattenLineItems.hasOwnProperty(lineItemId)) continue;

    if (
      typeof flattenLineItems[lineItemId] == "object" &&
      flattenLineItems[lineItemId] !== null
    ) {
      for (const item in flattenLineItems[lineItemId]) {
        lineItem["id"] = lineItemId;
        lineItem[item] = flattenLineItems[lineItemId][item];
      }
    }
    lineItemsArray.push(lineItem);
  }

  return lineItemsArray;
};

const calculateTotal = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.quantity * item.price;
  });

  return total;
};

const formatDate = (UNIX_timestamp) => {
  const date = new Date(UNIX_timestamp * 1000);
  var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  var yyyy = date.getFullYear();
  return yyyy + "-" + MM + "-" + dd;
};

const Invoice = () => {
  const { slug } = useParams();
  const { users } = useContext(usersContext);
  const { invoices, editInvoice } = useContext(invoicesContext);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [invoice, setInvoice] = useState({
    customerAddress: {
      street: "street",
      city: "city",
      zipcode: "zipcode",
    },
  });

  const [inputUser, setInputUser] = useState({
    address: {
      street: "street",
      city: "city",
      zipcode: "zipcode",
    },
  });

  const [flattenedLineItems, setFlattenedLineItems] = useState([]);
  const [AddLineItemModalVisibility, setAddLineItemModalVisibility] =
    useState(false);
  const toggleAddLineItemModalVisibility = () =>
    setAddLineItemModalVisibility((visibility) => !visibility);

  const [invoiceId, setInvoiceId] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [editLineItemId, setEditLineItemId] = useState(null);
  const [editLineItemInput, setEditLineItemInput] = useState({
    id: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const [total, setTotal] = useState(0);

  const headers = [
    { name: "No#", field: "id", sortable: false, type: "string" },
    {
      name: "Description",
      field: "description",
      sortable: true,
      type: "string",
    },
    { name: "Quantity", field: "quantity", sortable: true, type: "number" },
    { name: "Price", field: "price", sortable: true, type: "number" },
    { name: "Actions", field: "actions", sortable: false, type: null },
  ];

  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalItems, setTotalItems] = useState("");

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function titleBlur() {
    callUpdateInvoiceAPI({ title: title });
  }

  function customerNameSelect(customer) {
    callUpdateInvoiceAPI({
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: {
        street: customer.street,
        city: customer.city,
        zipcode: customer.zipcode,
      },
      customerEmail: customer.email,
      customerId: customer.id,
    });
  }

  function createDateChange(e) {
    setCreateDate(e.target.value);
  }

  function createDateSelect() {
    const splitDate = createDate.split("-");
    const year = +splitDate[0];
    const month = +(splitDate[1] - 1);
    const date = +splitDate[2];
    callUpdateInvoiceAPI({
      createDate: Math.floor(new Date(year, month, date).getTime() / 1000),
    });
  }

  function dueDateChange(e) {
    setDueDate(e.target.value);
  }

  function dueDateSelect() {
    const splitDate = dueDate.split("-");
    const year = +splitDate[0];
    const month = +(splitDate[1] - 1);
    const date = +splitDate[2];
    callUpdateInvoiceAPI({
      dueDate: Math.floor(new Date(year, month, date).getTime() / 1000),
    });
  }

  function isPaidChange(e) {
    setIsPaid(e.target.value);
    callUpdateInvoiceAPI({ isPaid: isPaid });
  }

  function notesChange(e) {
    setNotes(e.target.value);
  }

  function notesBlur() {
    callUpdateInvoiceAPI({ notes: notes });
  }

  function callUpdateInvoiceAPI(update, cb) {
    const copyInvoice = _.cloneDeep(invoice);
    const editedInvoice = {
      ...copyInvoice,
      ...update,
    };

    updateInvoiceAPI(slug, editedInvoice)
      .then((update) => {
        setFlattenedLineItems(flattenLineItems(update));
        setTotal(calculateTotal(flattenLineItems(update)));
        setEditLineItemId(null);
        setEditLineItemInput({
          id: "",
          description: "",
          quantity: 0,
          price: 0,
        });

        editInvoice(update);
        cb();
      })
      .catch((error) => {
        console.log(`error in updating invoice`, error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceResponse = await fetch(`${API_INVOICES}/${slug}`);
        const invoiceJson = await invoiceResponse.json();

        setInvoice(invoiceJson);
        setFlattenedLineItems(flattenLineItems(invoiceJson));
        setTotal(calculateTotal(flattenLineItems(invoiceJson)));
        setTitle(invoiceJson.title);
        setNotes(invoiceJson.notes);
        setDueDate(formatDate(invoiceJson.dueDate));
        setCreateDate(formatDate(invoiceJson.createDate));
        setInvoiceId(invoiceJson.id);
      } catch (error) {
        console.log(`error`, error);
      }
    };

    fetchData();
  }, [slug, invoices]);

  const lineItemsData = useMemo(() => {
    let computedLineItems = flattenedLineItems;
    setTotalItems(computedLineItems.length);

    if (search) {
      computedLineItems = computedLineItems.filter(
        (item) =>
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.quantity.toString().includes(search.toLowerCase()) ||
          item.price.toString().includes(search.toLowerCase())
      );
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedLineItems = computedLineItems.sort((a, b) => {
        if (typeof a[sorting.field] === "number")
          return reversed * (a[sorting.field] - b[sorting.field]);
        else
          return (
            reversed *
            a[sorting.field]
              .toString()
              .localeCompare(b[sorting.field].toString())
          );
      });
    }

    return computedLineItems;
  }, [sorting, flattenedLineItems, search]);

  const clickEditHandler = (event, item) => {
    event.preventDefault();
    setEditLineItemId(item.id);
    const formValues = {
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    };
    setEditLineItemInput(formValues);
  };

  const editLineItemChangeHandler = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newLineItemData = { ...editLineItemInput };
    newLineItemData[fieldName] = fieldValue;
    setEditLineItemInput(newLineItemData);
  };

  const submitForm = (item) => {
    const editedLineItem = {};
    editedLineItem[editLineItemId] = {
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    };

    const copyLineItems = _.cloneDeep(invoice.lineItems);
    const updateLineItem = { ...copyLineItems, ...editedLineItem };

    callUpdateInvoiceAPI({ lineItems: updateLineItem });
  };

  const clickDeleteHandler = (item) => {
    deleteLineItem(item.id);
  };

  function deleteLineItem(id) {
    const copyLineItems = _.cloneDeep(invoice.lineItems);
    delete copyLineItems[id];
    callUpdateInvoiceAPI({ lineItems: copyLineItems });
  }

  const clickCancelHandler = (event) => {
    event.preventDefault();
    setEditLineItemId(null);
  };

  return (
    <>
      <Container data-testid="Invoice-test">
        <h1 className="pt-3">Invoice Details ({invoiceId})</h1>
        <Row className="mb-3 pt-3">
          <Col sm={1}>
            <Form.Label htmlFor="title">Title</Form.Label>
          </Col>
          <Col sm={5}>
            <Form.Control
              type="text"
              id="title"
              value={title || ""}
              onChange={titleChange}
              onBlur={titleBlur}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={1}>
            <Form.Label>Customer</Form.Label>
          </Col>
          <Col sm={5}>
            <div className="search-bar-container">
              <AutoComplete
                data={users}
                onSelect={(user) => setInputUser(user)}
                customerName={invoice.customerName || ""}
                customerNameSelect={customerNameSelect}
              />
              <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
            </div>
          </Col>
        </Row>
        <Row>
          <div>{invoice.customerName}</div>
          <div>{invoice.customerPhone}</div>
          <div>
            {" "}
            {invoice.customerAddress.street +
              ", " +
              invoice.customerAddress.city +
              ", " +
              invoice.customerAddress.zipcode}{" "}
          </div>
          <div>{invoice.customerEmail}</div>
        </Row>
        <Row className="mb-3 pt-3">
          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label>Invoice #</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control value={invoiceId} disabled />
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Status</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Select onChange={isPaidChange} value={invoice.isPaid}>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3 pt-3">
          <Col sm={6}>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Create Date</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  onChange={createDateChange}
                  onSelect={createDateSelect}
                  value={createDate}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="mb-3">
              <Col sm={3}>
                <Form.Label>Due Date</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  onChange={dueDateChange}
                  onSelect={dueDateSelect}
                  value={dueDate}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Search
              onSearch={(value) => {
                setSearch(value);
              }}
            />
          </Col>
        </Row>
        <Row>
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
                  cols={itemTableConstants(editLineItemInput)}
                  data={lineItemsData}
                  editId={editLineItemId}
                  clickEditHandler={clickEditHandler}
                  editChangeHandler={editLineItemChangeHandler}
                  clickCancelHandler={clickCancelHandler}
                  clickDeleteHandler={clickDeleteHandler}
                  schema={schema}
                  register={register}
                />
              </tbody>
            </Table>
          </Form>
        </Row>
        <div className="float-end" onClick={toggleAddLineItemModalVisibility}>
          <Button className="btn btn-success">
            <i className="fas fa-plus"></i> Add item
          </Button>
        </div>
        <br />
        <Row className="mb-3">
          <Col sm={1}>
            <Form.Label>Notes</Form.Label>
          </Col>
          <Col sm={5}>
            <textarea
              className="form-control"
              id="notes"
              rows="3"
              value={notes}
              onChange={notesChange}
              onBlur={notesBlur}
            ></textarea>
          </Col>
        </Row>
        <br />
        <Row className="mb-3">
          <Col sm={10}></Col>
          <Col sm={2}>
            <Row>
              <Col md={6}>Total($)</Col>
              <Col md={6}>{total}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {AddLineItemModalVisibility && (
        <AddLineItem
          data={invoice}
          onClose={toggleAddLineItemModalVisibility}
          setInvoice={setInvoice}
          setFlattenedLineItems={setFlattenedLineItems}
          setTotal={setTotal}
          setAddLineItemModalVisibility={setAddLineItemModalVisibility}
          callUpdateInvoiceAPI={callUpdateInvoiceAPI}
        />
      )}
    </>
  );
};

export default Invoice;
