import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const {authUser} = useSelector(store=>store.myUser)
  const {selectedUser} = useSelector(store=>store.myUser)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   return ()=> dispatch(setSelectedUser(null))
  // },[])

  if(!authUser) return;

  return (
    <>
      {
        selectedUser !== null ? (
          <div className="md:min-w-[450px] flex flex-col">
      <div className="flex gap-3 items-center text-white rounded-md px-4 py-2 mb-2 bg-zinc-700">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={authUser?.profilephoto}
              alt="userProfile"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2 flex-1">
            <p>{authUser.fullname}</p>

            <div className="flex items-center gap-3">
            <img src={selectedUser?.profilephoto} className="w-12 rounded-full" />
            <p>{selectedUser?.fullname}</p>
            </div>

          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
        ) : (
          <div className="md:min-w-[450px] flex flex-col justify-center items-center text-2xl">
          <p className="font-bold">Hi, {authUser?.fullname}</p>
          <h1>Let's Start a conversation ...</h1>
          </div>
        )
      }
    </>
  
  );
};

export default MessageContainer;
