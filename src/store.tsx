import { Context, createContext, Dispatch, useContext, useReducer } from 'react'

export type Action =
  | { type: 'root/TOGGLE_VISIBILITY' }
  | { type: 'root/TOGGLE_BORROW_VISIBILITY' }
const initState = { visible: true, borrowVisible: true }
export type State = typeof initState
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'root/TOGGLE_VISIBILITY':
      return { ...state, visible: !state.visible }
    case 'root/TOGGLE_BORROW_VISIBILITY':
      return { ...state, borrowVisible: !state.borrowVisible }
  }
}

// @ts-ignore
const Ctx: Context<[State, Dispatch<Action>]> = createContext()

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return <Ctx.Provider value={[state, dispatch]}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const [state, dispatch] = useContext(Ctx)
  return { state, dispatch }
}
