import { AppContext } from './index';
import { useReducer, ReactNode } from "react"
import { appReducer, initialState } from "./reducers"
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}