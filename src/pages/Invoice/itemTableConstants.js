import React from "react";

export const itemTableConstants = (input) => {
  return [
    {
      title: "#",
      type: "text",
      name: "id",
      value: input.id,
      isEditable: false,
      render: (rowData) => {
        return <span>{rowData.id}</span>;
      }
    },
    {
      title: "Description",
      type: "text",
      name: "description",
      value: input.description,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.description}</span>;
      }
    },
    {
      title: "Quantity",
      type: "number",
      name: "quantity",
      value: input.quantity,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.quantity}</span>;
      }
    },
    {
      title: "Price",
      type: "number",
      name: "price",
      value: input.price,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.price}</span>;
      }
    }
  ]
}