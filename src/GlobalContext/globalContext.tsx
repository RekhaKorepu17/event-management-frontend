import React from "react";
import { createContext, ReactNode, useState } from "react";

const StateContext = createContext<any>({
    user: '',
    setUser: ()=> {},
    events: '',
    setEvents: ()=> {}

});
export const StateProvider =({children}: {children: ReactNode}) => {
    const [user, setUser]= useState(null);
    const [events, setEvents] = useState([]);
    return (
        <StateContext.Provider
          value={{user, setUser, events, setEvents}}
        >
          {children}
        </StateContext.Provider>
      );
}
export const useGlobalState = () => {
   const context = React.useContext(StateContext);
    return context;
};