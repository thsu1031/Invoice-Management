import React from "react";

const Invoices = React.lazy(()=> import("pages/Invoice"));
const Users = React.lazy(()=> import("pages/Users"));

const routes = [
  { enable:  true,
    path: "users",
    element: Users,
    navbar: "Users",
  },
  { enable: true,
    path: "invoices",
    element: Invoices,
    navbar: "Invoices" 
  }
];

export default routes.filter((enable) => routes.enable);



