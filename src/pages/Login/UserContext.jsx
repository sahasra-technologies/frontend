import React, {createContext, useState, useContext} from 'react'

const UserContext = createContext(); 

export const useUser = () => {
  const context = useContext(UserContext);
  console.log('useUser context:', context);  // <- Add this for debugging
  return context;
};


export const UserProvider = ({children}) =>{
    const [names, setNames] = useState('')

    const setUser = (name) => {
    setNames(name);
  };

  return (
    <UserContext.Provider value={{ names, setUser }}>
      {children}
    </UserContext.Provider>
  );
}