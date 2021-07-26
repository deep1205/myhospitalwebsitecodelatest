import React,{useState,createContext} from 'react'

export const AppContext=createContext()

export const AppProvider=(props)=>{
    const [notifications,setNotifications]=useState([])
    const [bookedData,setBookedData]=useState({})

    return <AppContext.Provider value={{notificationData:[notifications,setNotifications],AssignData:[bookedData,setBookedData]}}>
        {props.children}
    </AppContext.Provider>
}
