import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const OtherUser = ({user}) => {

  const dispatch = useDispatch()


  const {selectedUser,onlineUsers} = useSelector(store=>store.myUser)
  const isOnline = onlineUsers.includes(user._id);
 
  const selectedUserHandler = (user) =>{
    dispatch(setSelectedUser(user))
  }
     return (
          <>
              <div 
              onClick={()=>selectedUserHandler(user)}
              className={` ${selectedUser?._id === user?._id ? 'bg-zinc-700 text-black':''} flex gap-3 items-center text-white hover:bg-zinc-200 rounded-md px-2 py-1 cursor-pointer hover:text-black`}>
                <div 
                // className='avatar online'
                className={`avatar ${isOnline ? 'online':''}`}
                >
                  <div className='w-12 rounded-full'>
                    <img src={user.profilephoto} 
                      alt='userProfile'
                    />
                  </div>
                </div>
      
                <div className='flex flex-col flex-1'>
                  <div className='flex justify-between items-center gap-2 flex-1'>
                    <p>{user?.fullname}</p>
                  </div>
                </div>
              </div>
              <div className='divider m-0 p-0 h-2'></div>
          </>
        )
}

export default OtherUser