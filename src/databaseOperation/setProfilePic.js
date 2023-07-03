import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase/firebase"

export const setProfilePic = async(file,id)=> {
    const upload = ref(storage, `users/${id}`)
    const url=await uploadBytes(upload, file).then(async(snapshot) => {
        const gr=await getDownloadURL(upload).then((url) => {
            return url
        })
        return gr
    })
    return url
}