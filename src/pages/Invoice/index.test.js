import {render, screen}  from "../../test-utils/testing-library-utils";
import Invoice from "./index";

describe("<Invoice / >", ()=> {
  test("Should render Invoice component without crushing", ()=> {
    render(<Invoice />)
    const InvoiceComponent = screen.getByTestId('Invoice-test');
    expect(InvoiceComponent).toBeInTheDocument();
  });
});



