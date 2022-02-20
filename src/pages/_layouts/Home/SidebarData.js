import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [

  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Users",
    path: "/users",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text"
  },
  {
    title: "Invoices",
    path: "/invoices",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  }
];