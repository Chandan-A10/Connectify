import { getDocs, query, setDoc, where } from "firebase/firestore"
import { UserCollection, storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { UpdatePostProfile } from "./UpdatePostProfile"


export const UpdateProfilePic = ( name ,file, userid,setImg,handlepic) => {
    const upload = ref(storage, `user/${userid}`)
    uploadBytes(upload, file).then((snapshot) => {
        getDownloadURL(upload).then(async(url) => {
            const q=query(UserCollection,where('userID','==',userid))
            const docs=await getDocs(q)
            docs.forEach((x)=>{
                setDoc(x.ref,{name:name,pic:url},{merge:true})
            })
            setImg(url)
            handlepic(url)
            UpdatePostProfile(userid,url)
            console.log('Profile Pic Updated')
        })
    })
}