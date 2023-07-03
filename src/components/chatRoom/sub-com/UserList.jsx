import React from 'react'
import styles from './UserList.module.css'
import { Card, Image } from 'react-bootstrap'
import image from '../../../assests/images/avatar.png'
import online from '../../../assests/images/online.png'
import offline from '../../../assests/images/offline.png'
import { useSelector } from 'react-redux'

const UserList=React.memo(({data,setid})=> {
    console.log('UserListCmp')
    const Curruser=useSelector(state=>state.user.id)
    const setchatId=(ID)=>{
        setid(ID)
    }
    return (
    <>
    <div className={styles.main} style={{maxHeight:'83%',overflow:'scroll'}}>
        {data?
        data.map((user,i)=>{
            return(
            <>
            {user.userID!==Curruser &&
            <Card className={styles.card} onClick={()=>setchatId(user.userID)} style={{backgroundColor:'transparent',border:'none'}}>
                <Card.Body style={{display:'flex',height:'80px'}}>
                    <div style={{display:'flex',flexDirection:"column"}}>
                        <Image src={image} className={styles.image}></Image>
                    </div>
                    <div>
                        <p className={styles.name} style={{width:"150px",height:"20px",overflow:'hidden',whiteSpace:'nowrap',color:'white'}}>{user.name}</p>
                        <p className={styles.lastmsg} style={{width:"150px",height:"20px",overflow:'hidden',whiteSpace:'nowrap'}}><img style={{borderRadius:'50%'}} height='7px' width='7px' src={user.online?online:offline} alt='on'/>&nbsp;{user.online?'online':'offline'}</p>
                    </div>
                    <p className={styles.time}>14.20&nbsp;PM</p>
                </Card.Body>
            </Card>
            }
            </>
            )
        })
        :
        <div class={styles.custom_Loaders}></div>}
        </div>
    </>
  )
})

export default UserList