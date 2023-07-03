import { addDoc } from "firebase/firestore"
import { PostsCollection, storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export const addPostToCollection = (text, file, user) => {
    const upload = ref(storage, `posts/${Date.now()}`)
    uploadBytes(upload, file).then((snapshot) => {
        getDownloadURL(upload).then((url) => {
            addDoc(PostsCollection, {
                postid: Date.now(),
                createdBy: user,
                date: new Date(),
                Likes: [{ count: 0 }],
                comments: [],
                type: file.type,
                src: url,
                description: text
            })
            console.log('added')

        })
    })
}