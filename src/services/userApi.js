import { API_USERS } from "../global/constants";

export const createUserAPI = async(data)=> {

  const result =  await fetch(API_USERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return result;
}


export const deleteUserAPI = async(id) => {

  const result = await fetch(`${API_USERS}/${id}`, {
    method: "DELETE",
    header: {"Content-Type": "application/json"},
  });

  return result;
}


export const updateUserAPI = async(id, data) => {
  const response  = await fetch(`${API_USERS}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const jsonResponse = response.json();
  return jsonResponse;

}





