import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { PostsCollection } from "../firebase/firebase";

export const getAllPosts = (onSnapshotCallback) => {
    const qry = query(PostsCollection, orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(qry, snapshot => {
        let posts = []
        snapshot.docs.forEach((doc) => {
            posts.push({ ...doc.data() })
        })
        onSnapshotCallback(posts)
    })
    return unsubscribe
}

