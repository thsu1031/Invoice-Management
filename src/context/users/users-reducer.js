import { FETCH_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "./users-actions";

const usersReducer = (state, action) => {

  switch (action.type) {
    case FETCH_USERS:
      const { users } = action.payload;
      return { ...state, users };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    default:
      return state;
  }
};

export default usersReducer;
