import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from '@testing-library/react-hooks';
import UsersContext from "./users-context";
import UsersState, {useUsers} from "./UsersState";

const state = { users: [] };
const dispatch = jest.fn();

const wrapper = ({ children }) => (
  <UsersContext.Provider value={{ state, dispatch }}>
    {children}
  </UsersContext.Provider>
);

const mockUsersContext = jest.fn().mockImplementation(() => ({ state, dispatch }));
React.useContext =  mockUsersContext;

describe("useUsers test", ()=> {
  test("Should return present users with its state and dispatch functions", ()=> {
    render(<UsersState />);
    const  {result}  = renderHook(() => useUsers(), { wrapper });
    expect(result.current).toEqual({ state, dispatch });
  })
  
})




