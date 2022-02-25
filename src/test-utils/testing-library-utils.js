import { render } from "@testing-library/react";
import UsersState from "../context/users/UsersState";
import InvoicesState from "../context/invoices/InvoicesState";

const renderWithContext = (ui, options) => render(ui, {wrapper: UsersState,InvoicesState,...options});


export * from "@testing-library/react";

export {renderWithContext as render}
