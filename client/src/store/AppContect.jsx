import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const GLOBAL_INITIAL_STATE = {
  chat_history: [],
  chat_response: "",
  loading: false,
};
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, GLOBAL_INITIAL_STATE);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
