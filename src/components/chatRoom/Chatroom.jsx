import React, { useEffect, useState } from 'react'
import ChatRoomCmp from './ChatRoomCmp'
import { getAllUser } from '../../databaseOperation/getAllUsers'

const ChatRoom=React.memo(()=> {
  console.log('Chatroom')
  const [userdata, setuserdata] = useState(null)

  useEffect(() => {
    const onSnapshotCallback = (newdata) => {
      setuserdata(newdata);
    };
    const unsubscribe = getAllUser(onSnapshotCallback);
  
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChatRoomCmp data={userdata}/>
  )
})

export default ChatRoom