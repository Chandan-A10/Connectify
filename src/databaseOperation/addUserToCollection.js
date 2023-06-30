import { addDoc, getDocs, query, where } from "firebase/firestore"
import { UserCollection } from "../firebase/firebase"

export const addUserToCollection=async(id,email,name)=>{
    const qry=query(UserCollection,where('userID','==',id))
    const user=await getDocs(qry)
    if(!user.empty){
        return
    }
    const newDoc= await addDoc(UserCollection,{
        userID:id,
        name:name,
        email:email,
        online:true,
    })
    console.log('User Added' ,newDoc)
}