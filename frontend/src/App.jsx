import React, { useEffect, useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/HomePage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage />
  },
  {
    path:"/register",
    element:<SignUp />
  },
  {
    path:"/login",
    element:<Login />
  }
])

const App = () => {
  // const [mySocket,setMySocket] = useState(null)
 const {authUser} = useSelector(store=>store.myUser)
 const {socket} = useSelector(store=>store.socket)

 const dispatch = useDispatch()

 useEffect(()=>{
  if(authUser){
    const socket = io('http://localhost:9000',{
      query:{
        userId:authUser._id,
      }
    });
    dispatch(setSocket(socket))
    socket?.on('getOnlineUsers', (onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
    })
    return ()=> socket.close();
  }else{
    if(socket){
      socket.close();
      dispatch(setSocket(null))
    }
  }
 },[authUser])


  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App