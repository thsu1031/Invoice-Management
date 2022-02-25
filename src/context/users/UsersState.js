import React, { useReducer, useEffect, useContext } from "react";
import UsersContext from "./users-context";
import usersReducer from "./users-reducer";
import { FETCH_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "./users-actions";
import { API_USERS } from "../../global/constants";

const UsersState = (props) => {
  const initialState = {
    users: [],
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_USERS);
        const json = await response.json();
        dispatch({
          type: FETCH_USERS,
          payload: { users: json },
        });
      } catch (error) {
        console.log(`error in users in customers page`, error);
      }
    };
    fetchData();
  }, []);

  const addUser = (user) => {
    dispatch({
      type: ADD_USER,
      payload: user,
    });
  };

  const deleteUser = (id) => {
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  };

  const editUser = (update) => {
    dispatch({
      type: EDIT_USER,
      payload: update,
    });
  };

  // console.log(state.users)

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        addUser,
        deleteUser,
        editUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};


export const useUsers = () => useContext(UsersContext);

export default UsersState;



