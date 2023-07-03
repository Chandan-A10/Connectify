import React, { useEffect, useState } from 'react'
import { styles } from '../assests/stylesheets/Dashboard'


const DisplayNotification = ({ notification }) => {
    console.log(notification)
    return (
        <>
            <div style={{height:'100vh'}}>
            <div style={styles.post} >
                {notification.length===0 ?<h1 style={{color:'white'}}>No Notifications</h1>:
                    notification[0].notifications.map((y)=>{
                        return(
                            <div style={{color:'white', display: 'flex', marginTop: '-1%', alignItems: 'center', height: 50 }}>
                                {y?.msg}
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}

export default DisplayNotification