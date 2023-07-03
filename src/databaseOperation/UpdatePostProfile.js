import { getDocs, query, setDoc, where } from "@firebase/firestore"
import { PostsCollection } from "../firebase/firebase"


export const UpdatePostProfile=async(userid,url)=>{
    const q=query(PostsCollection,where('createdBy.id','==',userid))
    const docs=await getDocs(q)
    docs.forEach((x)=>{
        console.log(x.data())
        setDoc(x.ref,{createdBy:{pic:url}},{merge:true})
        console.log('updated pic')
    })
}