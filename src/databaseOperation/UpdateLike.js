import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { NotificationCollection, PostsCollection } from "../firebase/firebase"

export const UpdateLike=async(postid,userid,name,toid)=>{
    const qry=query(PostsCollection,where('postid','==',postid))
    const posts=await getDocs(qry)
    let likes=[]
    let ref;
    posts.forEach((x)=>{
        likes=x.data().Likes
        ref=x.ref
    })
    let value;
    let msg=`${name} has liked your post`
    const index = likes.findIndex((obj) => obj.userID === userid);
    if (index !== -1) {
        likes[index].value===true?likes[0].count=likes[0].count-1:likes[0].count=likes[0].count+1
        likes[index].value = !likes[index].value;
        value=likes[index].value
    } else {
        likes[0].count=likes[0].count+1
        likes.push({ userID: userid, value: true });
        value=true;
    }
    updateDoc(ref,{Likes:likes})
    console.log('like updated')
    const q=query(NotificationCollection,where('userid','==',toid))
    const docs=await getDocs(q)
    if(!docs.empty){
        let no=[];
        docs.forEach((x)=>{
            no=x.data().notifications
            no.push({userid:userid,msg:msg})
            updateDoc(x.ref,{notifications:no})
        })
    }
    else{
        addDoc(NotificationCollection,{
            userid:toid,
            notifications:[{userid:userid,msg:msg}]
        })
    }
    return value;
}