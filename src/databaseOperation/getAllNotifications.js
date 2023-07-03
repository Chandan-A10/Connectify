import { onSnapshot, query, where } from "firebase/firestore";
import { NotificationCollection } from "../firebase/firebase";

export const getAllNotification = (onSnapshotCallback,userid) => {
    const qry = query(NotificationCollection, where('userid','==',userid))
    const unsubscribe = onSnapshot(qry, snapshot => {
        let notification = []
        snapshot.docs.forEach((doc) => {
            notification.push({ ...doc.data() })
        })
        onSnapshotCallback(notification)
    })
    return unsubscribe
}

