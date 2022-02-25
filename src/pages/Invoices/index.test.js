import React from "react";
import Invoices from "./index";
import {render, screen}  from "../../test-utils/testing-library-utils";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
 useNavigate: () => mockedUsedNavigate,
}));

describe("<Invoices />", ()=> {
  test("Should render Invocies component without crashing", ()=> {
    
    render( <Invoices />);
  
    const InvoicesComponent = screen.getByTestId('Invoices-test');
    expect(InvoicesComponent).toBeInTheDocument();

  });
})


