import { getDocs, query, setDoc } from "firebase/firestore"
import { ChatRoomCollection,  } from "../firebase/firebase"


export const DeleteChats=async(chatid,id)=>{
    
    const qry=query(ChatRoomCollection)
    const chats=await getDocs(qry)
    chats.forEach((e)=>{
        if(e.data().chatID===chatid){
            let chatArray=e.data().chats || []
            chatArray.forEach((x)=>{
                x[id]=true
            })
            console.log(chatArray)
            setDoc(e.ref,{ chats:chatArray },{merge:true})
        }
    })
    console.log('Deleted')
}