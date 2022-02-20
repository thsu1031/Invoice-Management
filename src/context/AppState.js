import React from 'react';
import AppContext from './app-context';

const AppState = (props) => {
  return (
    <AppContext.Provider value={{
      message: "This is from the context"
    }}> {props.children}
    </AppContext.Provider>

  )
}

export default AppState

