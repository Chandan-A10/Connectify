import { getDocs, onSnapshot, query, where } from "firebase/firestore"
import { ChatRoomCollection } from "../firebase/firebase"

export const GetChats=async(chatid,onSnapshotCallback)=>{
    const qry=query(ChatRoomCollection,where('chatID','==',chatid))
    const chats=await getDocs(qry)
    let chatdata;
    chats.forEach((e)=>{
        console.log('get chats')
        chatdata=e.data().chats
        onSnapshot(e.ref,(docsnapshot)=>{
            if(docsnapshot.exists()){
                const newdata=docsnapshot.data().chats
                if( newdata!==chatdata){
                    chatdata=newdata
                    onSnapshotCallback(newdata)
                    return;
                }
            }
        })
        console.log('chats')
    })
    return chatdata;
}