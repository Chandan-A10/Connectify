import { getDocs, query, setDoc,where } from "firebase/firestore"
import { ChatRoomCollection } from "../firebase/firebase"


export const SetTypinginChatRoomTrue=async(chatid,userid)=>{

    const qry=query(ChatRoomCollection,where('chatID','==',chatid))
    const chats=await getDocs(qry)

    chats.forEach((e)=>{
        if(e.data().chatID===chatid){
            let obj={}
            obj[userid]=true
            setDoc(e.ref,obj,{merge:true})
        }
    })
    console.log('Updated typing ',userid)
}

export const SetTypinginChatRoomFalse=async(chatid,userid)=>{

    const qry=query(ChatRoomCollection,where('chatID','==',chatid))
    const chats=await getDocs(qry)

    chats.forEach((e)=>{
        if(e.data().chatID===chatid){
            let obj={}
            obj[userid]=false
            setDoc(e.ref,obj,{merge:true})
        }
    })
    console.log('Updated typing ' ,userid)
}