import { API_INVOICES } from "../global/constants";

export const createInvoiceAPI = async(data) => {
  
  const result = await fetch(API_INVOICES, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  return result;
}

export const deleteInvoiceAPI  = async(id) => {
  const result = await fetch(`${API_INVOICES}/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  });

  return result;
}

export const updateInvoiceAPI = async(id, data) => {
  const response = await fetch(`${API_INVOICES}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const jsonResponse = response.json();
  return jsonResponse;
}




