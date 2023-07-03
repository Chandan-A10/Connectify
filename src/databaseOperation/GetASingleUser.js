import { getDocs, query, where } from "firebase/firestore"
import { UserCollection } from "../firebase/firebase"


export const GetASingleUser=async(id)=>{
    const qry=query(UserCollection,where('userID','==',id))
    const users=await getDocs(qry)
    let user;
    users.forEach((e)=>{
        user=e?.data().name
    })
    console.log(user)
    return user;
}

