import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({message}) => {
  const scroll = useRef()

  const {authUser} = useSelector(store=>store.myUser)
  const {selectedUser} = useSelector(store=>store.myUser)

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])

const date = new Date(message?.createdAt);
// Format with `toLocaleString`
const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short', // Full month name
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Optional: true for 12-hour format, false for 24-hour format
});
  
  return (
    <div>
      <div ref={scroll} className={` ${authUser?._id === message.senderId ? "chat chat-start" : "chat chat-end"} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message?.senderId === authUser?._id ? authUser?.profilephoto : selectedUser?.profilephoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">{formattedDate}</time>
        </div>
        <div className={` ${authUser?._id === message.senderId ? "text-white bg-purple-700" : ""} chat-bubble`}>{message?.message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
