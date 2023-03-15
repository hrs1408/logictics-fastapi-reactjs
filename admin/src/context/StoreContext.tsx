import React, { createContext, useState } from 'react'

type StateType = {
  searchKey: string
}
export type StoreContextType = {
  state: StateType
  setState: React.Dispatch<React.SetStateAction<StateType>>
}

export const StoreContext = createContext<StoreContextType | null>(null)

interface IStoreProvider {
  children: React.ReactNode
}

const StoreProvider: React.FC<IStoreProvider> = ({ children }) => {
  const [state, setState] = useState<StateType>({
    searchKey: '',
  })

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
