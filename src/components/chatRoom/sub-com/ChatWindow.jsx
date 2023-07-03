import React, { useEffect, useState } from 'react'
import styles from './ChatWindow.module.css'
import { GetChats } from '../../../databaseOperation/GetChats'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../firebase/Datehandler'
import { Divider } from 'antd'

const ChatWindow=React.memo(({chatID})=>{
    let date={
        today:true,
        yestarday:true,
        date:null
    }

    const checkDate=(timestp)=>{
        const day=formatDate(timestp)
        if(day==='Today' && date.today){
            date.today=false
            return 'Today'
        }
        else if(day==='Yesterday' && date.yestarday){
            date.yestarday=false
            return 'Yestarday'
        }
        else if(date.date!==day){
            date.date=day
            return day
        }
        else{
            return false
        }

    }
    console.log(chatID)
    const [chats, setchats] = useState(null)
    const Curruser=useSelector(state=>state.user.id)
    useEffect(()=>{
        console.log('abc')
        const onSnapshotCallback=(newdata)=>{
            setchats(newdata)
        }
        GetChats(chatID,onSnapshotCallback)
    },[chatID])

    return (
        <>
        <Container className={styles.container}>
            {chats?chats.map((x)=>(
                <>
                {x[Curruser]?<></>:
                <>
                {x.senderId!==Curruser?
                <>
                {checkDate(x.time) && <Divider>{checkDate(x.time)}</Divider>}
                <div className={styles.main}>
                <br/>
                <br/>
                <div className={styles.sender} style={{backgroundColor:'#00B1FE'}}>
                    <p className={styles.text}>{x.text}</p>
                </div>
                </div>
                </>
                :
                <>
                {checkDate(x.time) && <Divider>{checkDate(x.time)}</Divider>}
                <div className={styles.main} style={{justifyContent:'right'}}>
                <br/>
                <br/>
                <div className={styles.reciever} style={{minWidth:'20%',display:'flex',justifyContent:'çenter',alignItems:'center',backgroundColor:'#00B1FE',borderRadius: '10px 0 10px 10px'}}>
                    <p className={styles.text} style={{marginLeft:'10%',marginTop:'10%'}}>{x.text}</p>
                    {console.log(formatDate(x.time))}
                </div>
                </div>
                </>
                }
                </>
                }
                </>
            ))
            :
            <></>
        }
        </Container>
        </>
    )
})

export default ChatWindow