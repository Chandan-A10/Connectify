import { addDoc, getDocs, query, where } from "firebase/firestore"
import { ChatRoomCollection } from "../firebase/firebase"

export const CreateChatRoom=async(chatid,usr1,usr2)=>{
    const qry=query(ChatRoomCollection,where('chatID','==',chatid))
    const data=await getDocs(qry)
    if(data.empty){
        let obj={
            chatID:chatid,
            chats:[],
        }
        obj[usr1]=false
        obj[usr2]=false
        await addDoc(ChatRoomCollection,obj)
        console.log('Room Created')
    }
}