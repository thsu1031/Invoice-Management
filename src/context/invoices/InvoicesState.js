import React, { useReducer, useEffect } from "react";
import InvoicesContext from "./invoices-context";
import invoicesReducer from "../invoices/invoices-reducer";
import {
  FETCH_INVOICES,
  ADD_INVOICE,
  EDIT_INVOICE,
} from "../invoices/invoices-actions";
import { API_INVOICES } from "../../global/constants";
import { DELETE_INVOICE } from "./invoices-actions";

const InvoicesState = (props) => {
  const initialState = {
    invoices: [],
  };

  const [state, dispatch] = useReducer(invoicesReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_INVOICES);
        const json = await response.json();

        dispatch({
          type: FETCH_INVOICES,
          payload: { invoices: json },
        });

      } catch (error) {
        console.log(`error in fetching invoices`);
      }
    };

    fetchData();
  }, []);

  const addInvoice = (invoice) => {
    dispatch({
      type: ADD_INVOICE,
      payload: invoice,
    });
  };

  const deleteInvoice = (id) => {
    dispatch({
      type: DELETE_INVOICE,
      payload: id,
    });
  };

  const editInvoice = (update) => {
    dispatch({
      type: EDIT_INVOICE,
      payload: update,
    });
  };

  return (
    <InvoicesContext.Provider
      value={{
        invoices: state.invoices,
        addInvoice,
        deleteInvoice,
        editInvoice,
      }}
    >
      {props.children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesState; 
