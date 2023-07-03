import { getDocs, query, setDoc } from "firebase/firestore"
import { ChatRoomCollection,  } from "../firebase/firebase"


export const UpdateChats=async(chatid,obj)=>{
    
    console.log(obj)
    const qry=query(ChatRoomCollection)
    const chats=await getDocs(qry)
    chats.forEach((e)=>{
        if(e.data().chatID===chatid){
            let chatArray=e.data().chats || []
            console.log(typeof chatArray)
            chatArray.push(obj)
            console.log(chatArray)
            setDoc(e.ref,{ chats:chatArray },{merge:true})
        }
    })
    console.log('updated')
}