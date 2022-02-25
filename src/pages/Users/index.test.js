import React from "react";
import Users from "./index";
import { render, screen, waitFor } from '../../test-utils/testing-library-utils';

describe("<Users />", ()=> {

  test("Should render Users component without crashing", ()=> {
    render(<Users />);

    const UsersComponent = screen.getByTestId('Users-test');
    expect(UsersComponent).toBeInTheDocument();
  
  });

});


