import React from "react";
import "./App.css";
import Layout from "./pages/_layouts/Home";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import Users from "./pages/Users";
import Navbar from "./pages/_layouts/Home/Navbar";
import UsersState from "./context/users/UsersState";
import InvoicesState from "./context/invoices/InvoicesState";

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <UsersState>
          <InvoicesState>
            <Routes>
              <Route path="/" element={<Layout />} ></Route>
              <Route path="/users" element={<Users />} ></Route>
              <Route path="invoices" element={< InvoicesOutlet />}>
                <Route path="/invoices" element={<Invoices />}></Route>
                <Route path="/invoices/new" element={<Invoice />}></Route>
                <Route path="/invoices/:slug" element={<Invoice />}></Route>
              </Route>
            </Routes>
          </InvoicesState>
        </UsersState>
      </Router>
    </>
  );
}

function InvoicesOutlet() {
  return (
    <div>
      {/* render any matching child */}
      <Outlet />
    </div>
  );
}

export default App;
