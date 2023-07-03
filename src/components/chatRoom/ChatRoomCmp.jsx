import React, { useState } from 'react'
import SideToolbar from './sub-com/SideToolbar'
import CurrChat from './sub-com/CurrChat'
import { Container } from 'react-bootstrap'
import styles from './ChatRoom.module.css'
import { useSelector } from 'react-redux'
import { CreateChatRoom } from '../../databaseOperation/CreateChatroom'

const ChatRoomCmp=React.memo(({data})=> {
  console.log('ChatRoomCmp')
  const [chatID, setchatID] = useState(null)
  const [recieverId, setrecieverId] = useState(null)
  const userid=useSelector(state=>state.user.id)
  const seId=async(id)=>{
    setrecieverId(id)
    console.log(recieverId,userid)
    if(id>userid){
      setchatID(userid+id)
      await CreateChatRoom(userid+id,userid,id)
    }
    else{
      setchatID(id+userid)
      await CreateChatRoom(id+userid,userid,id)
    }
  }
  return (
    <div className={styles.container} style={{height:'100vh'}}>
        <Container className={styles.sub_container} style={{backgroundColor:'#1F1E23',height:'80vh',width:'80vw'}}>
        <SideToolbar data={data} setid={seId}></SideToolbar>
        <CurrChat recieverId={recieverId} chatID={chatID}></CurrChat>
        </Container>
    </div>
  )
})

export default ChatRoomCmp