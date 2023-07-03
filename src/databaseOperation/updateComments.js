import { getDocs, query, updateDoc, where } from "firebase/firestore"
import { PostsCollection } from "../firebase/firebase"

export const updateComments=async(postid,name,text)=>{
    const qry=query(PostsCollection,where('postid','==',postid))
    const docs=await getDocs(qry)
    let comments=[];
    let ref;
    docs.forEach((x)=>{
        comments=x.data().comments
        ref=x.ref;
    })
    comments.push({
        name:name,
        text:text,
    })
    updateDoc(ref,{comments:comments})
    console.log('comments updated')
}