import React from "react";

export const userTableConstants = (input) => {
  return [
    {
      title: "Name",
      type: "text",
      name: "name",
      value:  input.name,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: "Phone",
      type: "text",
      name : "phone",
      value: input.phone,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.phone}</span>;
      },
    },
    {
      title: "Email",
      type: "text",
      name: "email",
      value: input.email,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      title: "Street",
      type: "text",
      name: "street",
      value: input.street,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.street}</span>;
      },
    },
    {
      title: "City",
      type: "text",
      name: "city",
      value: input.city,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.city}</span>;
      },
    },
    {
      title: "Zip code",
      type: "text",
      name: "zipcode",
      value: input.zipcode,
      isEditable: true,
      render: (rowData) => {
        return <span>{rowData.zipcode}</span>;
      },
    },
  ];
};
