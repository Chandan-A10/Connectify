import React, { useEffect, useState } from 'react'
import { styles } from '../assests/stylesheets/Dashboard'


const DisplayNotification = ({ notification }) => {
    console.log(notification)
    return (
        <>
            <div style={{height:'100vh'}}>
            
                {notification.length===0 ?<h1 style={{color:'white'}}>No Notifications</h1>:
                    notification[0].notifications.map((y)=>{
                        return(
                            <>
                            <div style={{backgroundColor:'#313338', color:'white', display: 'flex', marginTop: '-1%', alignItems: 'center', height: 50 }}>
                                <p style={{marginLeft:'20px'}}>{y?.msg}</p>
                            </div>
                            <br/>
                            </>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default DisplayNotification