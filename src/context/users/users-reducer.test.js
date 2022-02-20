import { FETCH_USERS } from "./users-actions";
import usersReducer from "./users-reducer";

describe("Reducer function test", ()=> {
  it("Should fetch users when FETCH_USERS action is dispatched", ()=> {
    const usersState = {
      users:[],
    }
    
    const action = {
      type: FETCH_USERS,
      payload: {
        users: [ { id: 'abc', name: 'Ting' }, { id: 'def', name: 'Shane' } ]
      }
    }

    const updatedState = usersReducer(usersState, action);
    const users = {
      users:  [ { id: 'abc', name: 'Ting' }, { id: 'def', name: 'Shane' } ]
    }

    expect(updatedState).toEqual(users)

  });
});

