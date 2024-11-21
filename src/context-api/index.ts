import React, { createContext, useContext } from "react";
import { Action, State } from "./actions";

// Define the initial state
export const initialState: State = {
  loadingStates: {},
  user: {
    email: "Imthiaz",
    password: "imthiazragib@gmail.com",
  },
  error: null,
  Forget_pass: null,
  Reset_Password: null,
  profile: null,
  failedToken:false,
  product:null
};

// Create the context
export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};