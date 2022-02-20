import {
  FETCH_INVOICES,
  ADD_INVOICE,
  DELETE_INVOICE,
  EDIT_INVOICE,
} from "./invoices-actions";
import _ from "lodash";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INVOICES:
      const { invoices } = action.payload;
      return { ...state, invoices };
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
      };
    case EDIT_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map((invoice) => {
          if (invoice.id === action.payload.id) {
            const copyInvoice =  _.cloneDeep(invoice);
            return { ...copyInvoice, ...action.payload };
          } else {
            return invoice;
          }
        }),
      };
    default:
      return state;
  }
};

export default invoicesReducer;
