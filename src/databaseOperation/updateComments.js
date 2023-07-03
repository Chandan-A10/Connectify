import { getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { PostsCollection } from "../firebase/firebase"

export const updateComments=async(postid,name,text,pic)=>{
    const qry=query(PostsCollection,where('postid','==',postid))
    const docs=await getDocs(qry)
    let comm=[];
    docs.forEach((x)=>{
        comm=x.data().comments
        comm.push({
            name:name,
            text:text,
            pic:pic || '',
        })
        console.log(comm)
        setDoc(x.ref,{comments:comm},{merge:true})
    })
    console.log('comments updated')
}