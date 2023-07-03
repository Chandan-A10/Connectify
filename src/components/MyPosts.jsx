import React, { useEffect, useState } from 'react'
import { styles } from '../assests/stylesheets/Dashboard'
import { Avatar, Button, Image } from 'antd'
import { UserOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'
import { getAllPosts } from '../databaseOperation/getAllPosts'
import { postTimeHandler } from '../databaseOperation/postTimeHandler'
import ReactPlayer from 'react-player'

const MyPosts = ({ user }) => {
    const [allposts, setallposts] = useState(null)

    useEffect(() => {
        const onSnapshotCallback = (newdata) => {
            setallposts(newdata);
        };
        const unsubscribe = getAllPosts(onSnapshotCallback);
        return () => {
            unsubscribe();
        };
    }, []);
    
    const handleComments = (id) => {
        document.getElementsByClassName(id)[0]?.setAttribute('hidden', 'hidden')
        document.getElementsByClassName(id)[1]?.removeAttribute('hidden')
        document.getElementsByClassName(id)[2]?.removeAttribute('hidden')
    }
    const CloseComments = (id) => {
        document.getElementsByClassName(id)[1]?.setAttribute('hidden', 'hidden')
        document.getElementsByClassName(id)[2]?.setAttribute('hidden', 'hidden')
        document.getElementsByClassName(id)[0]?.removeAttribute('hidden')
    }
    return (
        <>
    

            {allposts?.some((obj)=>obj.createdBy.id===user.id) ?
                allposts.map((x) => {
                    return (
                        <>
                        { x.createdBy.id===user.id &&
                        <div style={styles.post} >
                            <div style={{ display: 'flex', marginTop: '-1%', alignItems: 'center' }}>
                                <Avatar size={50} icon={x.createdBy.pic ? <Image src={x.createdBy.pic} /> : <UserOutlined />}></Avatar>
                                <p style={{ marginLeft: '12px', marginTop: '12px' }}><span style={{ color: '#f2f3f5' }}>{x.createdBy?.name}</span><br />
                                    <span style={{ textAlign: 'left', color: '#b5bac1', fontSize: '0.7rem' }}>{postTimeHandler(x?.date)}</span></p>
                            </div>
                            <div style={{ textAlign: 'justify' }}>
                                <p style={{ color: '#f2f3f5', fontSize: '13px' }}>{x.description}</p>
                            </div>
                            <img alt='' style={{ width: '100%' }} src={x.src}></img>
                            <br />
                            <div style={{ display: 'flex', textAlign: 'left' }}>
                                <Button style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '4%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<LikeOutlined />} size='large'>Like</Button>                                
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2F86FF', marginTop: '12px', height: '20px', width: '50px', textAlign: 'center', borderRadius: '10px' }}>
                                    <p style={{ fontSize: '12px', marginTop: '14px', color: '#f2f3f5', fontWeight: 600 }}>{x.Likes[0].count}</p>
                                </div>
                                <Button className={x.postid} onClick={() => handleComments(x.postid)} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '10%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<CommentOutlined />} size='large'>Comment</Button>
                                <Button className={x.postid} hidden onClick={() => CloseComments(x.postid)} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '10%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<CommentOutlined />} size='large'>Comment</Button>
                            </div>
                            <div style={{ padding: '10px', backgroundColor: '#1F1E23' }} className={x.postid} hidden>
                                <div style={{ border: '2px 2px 2px solid #27282F', padding: 10, display: 'flex', alignItems: 'right', flexDirection: 'column' }}>
                                    {x.comments.map((y) => {
                                        return (
                                            <div style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                                                <Avatar size={30} icon={<UserOutlined />}></Avatar>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <p style={{ textAlign: 'justify', marginTop: '16px', marginBottom: '-1px', marginLeft: '5px', color: '#f2f3f5', fontSize: '14px' }}>{y.name}</p>
                                                    <p style={{ textAlign: 'justify', marginLeft: '5px', color: '#f2f3f5', fontSize: '12px' }}>{y.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        }
                        
                        </>
                    )
                })
                :
                <><div style={styles.post} ><div style={{height:'100vh'}}><h1 style={{marginLeft:'20px',color:'white'}}>Add Some Posts</h1></div></div></>}
        </>
    )
}

export default MyPosts