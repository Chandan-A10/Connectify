import { getDocs, query, setDoc,where } from "firebase/firestore"
import { UserCollection  } from "../firebase/firebase"


export const SetOffline=async(userid)=>{

    const qry=query(UserCollection,where('userID','==',userid))
    const users=await getDocs(qry)

    users.forEach((e)=>{
        if(e.data().userID===userid){
            setDoc(e.ref,{ online:false },{merge:true})
        }
    })
    console.log('Updated offline')
}

export const SetOnline=async(userid)=>{

    const qry=query(UserCollection,where('userID','==',userid))
    const users=await getDocs(qry)

    users.forEach((e)=>{
        if(e.data().userID===userid){
            setDoc(e.ref,{ online:true },{merge:true})
        }
    })
    console.log('Updated online')
}