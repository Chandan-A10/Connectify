import React, { useEffect, useState } from 'react'
import { styles } from '../assests/stylesheets/Dashboard'
import { getAllPosts } from '../databaseOperation/getAllPosts'
import DisplayNotification from './displayNotification'
import { getAllNotification } from '../databaseOperation/getAllNotifications'

const Notifications = ({ user }) => {
    const [notification, setnotification] = useState([])

    useEffect(() => {
        const onSnapshotCallback = (newdata) => {
            setnotification(newdata);
        };
        const unsubscribe = getAllNotification(onSnapshotCallback,user.id);
        return () => {
            unsubscribe();
        };
    }, []);
    console.log(notification)
    return (
        <>
            <div style={{height:'100vh'}}>
            <div style={styles.post} >
                <DisplayNotification notification={notification}/>
                </div>
            </div>
        </>
    )
}

export default Notifications