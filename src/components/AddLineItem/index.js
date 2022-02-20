import React from "react";
import { nanoid } from 'nanoid'
import { API_INVOICES } from "../../global/constants";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import _ from "lodash";

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

const schema = yup.object().shape({
  description: yup.string().required(),
  quantity: yup.number().required().positive().min(0.01),
  price: yup.number().required().positive().min(0.01),
});

const calculateTotal = (items) => {
  let total = 0;
  items.forEach((item) => {
    total+= item.quantity*item.price;
  });

  return total;
};

const AddLineItem = ({ data, setInvoice, setFlattenedLineItems,  onClose, setAddLineItemModalVisibility, setTotal, callUpdateInvoiceAPI }) => {
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (item) => {
 
    const id = nanoid(7);
    const newLineItem = {};
    newLineItem[id] = {
      description: item.description,
      quantity: +item.quantity,
      price: +item.price,
    };

    const copyExistingLineItems = _.cloneDeep(data.lineItems);
    const newLineItems = {...copyExistingLineItems, ...newLineItem};
  
    callUpdateInvoiceAPI({"lineItems" : newLineItems }, setAddLineItemModalVisibility(false))
  
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Line Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              {...register("description", { required: true})}
            />
          </Form.Group>
          <p>{errors.description?.message}</p>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  name="quantity"
                  {...register("quantity", { required: true})}
                />
                <p>{errors.quantity?.message}</p>
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  {...register("price", { required: true})}
                  />
                  <p>{errors.price?.message}</p>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" type="submit">
            Add Line Item
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddLineItem;
