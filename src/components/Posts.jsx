import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../assests/stylesheets/Dashboard'
import { Avatar, Button, Input, Image, Upload } from 'antd'
import { SendOutlined, UploadOutlined, UserOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'
import { Form } from 'react-bootstrap'
import post from '../assests/stylesheets/post.module.css'
import { getAllPosts } from '../databaseOperation/getAllPosts'
import { addPostToCollection } from '../databaseOperation/addPostToCollection'
import { postTimeHandler } from '../databaseOperation/postTimeHandler'
import { UpdateLike } from '../databaseOperation/UpdateLike'
import { updateComments } from '../databaseOperation/updateComments'

const Posts = ({ user }) => {
    const [allposts, setallposts] = useState(null)
    const [file, setfile] = useState(null)
    const postRef = useRef()
    const cmtRef = useRef(null)

    useEffect(() => {
        const onSnapshotCallback = (newdata) => {
            setallposts(newdata);
        };
        const unsubscribe = getAllPosts(onSnapshotCallback);
        return () => {
            unsubscribe();
        };
    }, []);
    console.log(allposts)
    const handleAddPost = () => {
        if (postRef.current.input.value !== '' && file) {
            addPostToCollection(postRef.current.input.value, file, user)
            postRef.current.input.value = ''
            setfile([])
        }
    }
    const handleUpload = (info) => {
        console.log(info.file)
        setfile(info.file.originFileObj)
    }
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
    const handleLike = async (postid, userid, toid) => {
        console.log('clicked')
        const res = await UpdateLike(postid, userid, user.name, toid)
        if (res) {
            const button = document.getElementById(postid)
            button.style.color = 'blue'
        }
        else {
            const button = document.getElementById(postid)
            button.style.color = '#f2f3f5'
        }
    }
    const handleAddComment = (postid) => {
        if (cmtRef.current.input.value.trim()) {
            updateComments(postid, user.name, cmtRef.current.input.value,user.pic)
            cmtRef.current.input.value = ""
        }
    }
    return (
        <>
            <div style={styles.post}>
                <div>
                    <div style={{ display: 'flex', marginTop: '-1%', alignItems: 'center', height: 50 }}>
                        <Avatar size={50} icon={user.pic ? <Image src={user.pic} /> : <UserOutlined />}></Avatar>
                        <Form style={{ display: 'flex', width: '100%' }}>
                            <Input ref={postRef} className={post.input} style={{ backgroundColor: '#27282F', color: '#f2f3f5', border: 'none', marginLeft: '1%', borderRadius: '20px' }} placeholder="Add a new posts"></Input><Button onClick={handleAddPost} size='large' style={{ background: 'transparent', color: 'white', border: 'none' }} icon={<SendOutlined />}></Button>
                        </Form>
                    </div>
                    <br />
                    <Upload onChange={handleUpload}>
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </div>
            </div>
            {allposts ?
                allposts.map((x) => {
                    return (
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
                                {x.Likes.some((obj) => obj.userID === user.id && obj.value === true) ?
                                    <Button onClick={() => handleLike(x.postid, user.id, x.createdBy.id)} id={x.postid} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '4%', color: 'blue', background: 'transparent', border: 'none' }} icon={<LikeOutlined />} size='large'>Like</Button>
                                    :
                                    <Button onClick={() => handleLike(x.postid, user.id, x.createdBy.id)} id={x.postid} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '4%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<LikeOutlined />} size='large'>Like</Button>
                                }
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2F86FF', marginTop: '12px', height: '20px', width: '50px', textAlign: 'center', borderRadius: '10px' }}>
                                    <p style={{ fontSize: '12px', marginTop: '14px', color: '#f2f3f5', fontWeight: 600 }}>{x.Likes[0].count}</p>
                                </div>
                                <Button className={x.postid} onClick={() => handleComments(x.postid)} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '10%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<CommentOutlined />} size='large'>Comment</Button>
                                <Button className={x.postid} hidden onClick={() => CloseComments(x.postid)} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', marginLeft: '10%', color: '#f2f3f5', background: 'transparent', border: 'none' }} icon={<CommentOutlined />} size='large'>Comment</Button>
                            </div>
                            <div style={{ padding: '10px', backgroundColor: '#1F1E23' }} className={x.postid} hidden>
                                <div style={{ display: 'flex', marginTop: '-1%', alignItems: 'center', height: 50 }}>
                                    <Avatar size={50} icon={user.pic ? <Image src={user.pic} /> : <UserOutlined />}></Avatar>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <Input ref={cmtRef} className={post.input} style={{ backgroundColor: '#27282F', color: '#f2f3f5', border: 'none', marginLeft: '1%', borderRadius: '20px' }} placeholder="What's on your mind?"></Input><Button onClick={() => handleAddComment(x.postid)} size='large' style={{ background: 'transparent', color: 'white', border: 'none' }} icon={<SendOutlined />}></Button>
                                    </div>
                                </div>
                                <div style={{ border: '2px 2px 2px solid #27282F', padding: 10, display: 'flex', alignItems: 'right', flexDirection: 'column' }}>
                                    {x.comments.map((y) => {
                                        return (
                                            <div style={{ display: 'flex', alignItems: 'center', height: 50 }}>
                                                <Avatar size={30} icon={y.pic ? <Image src={x.createdBy.pic} /> : <UserOutlined />}></Avatar>
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
                    )
                })
                :
                <></>}
        </>
    )
}

export default Posts