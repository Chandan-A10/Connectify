import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { storage } from '../firebase/firebase'
import { styles } from '../assests/stylesheets/Dashboard.js'
import { Avatar, Badge, Button, Divider, Image, Input, Layout, Menu, Modal, Upload } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import logo from '../assests/images/logo.png'
import { sidenavItems, topnavItems } from './navItems'
import Posts from './Posts'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { BellOutlined, UserOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Editprofile, logOutUser, setPic } from '../slices/userSlice'
import { setStatusOffline } from '../databaseOperation/changeOnlineStatus'
import MyPosts from './MyPosts'
import Notifications from './Notifications'



const Dashboard = () => {
  const dispatcher = useDispatch()
  const navigator = useNavigate()
  const user = useSelector(state => state.user)
  const [isModalOpen, setisModalOpen] = useState(false)
  const nameRef = useRef()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [key, setkey] = useState(1)

  const beforeUpload = (file) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alert('You can only upload JPG/PNG file!');
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert('Image must smaller than 2MB!');
      return false;
    }
    setImageUrl(file)
    return false
  }

  const handleOk = async () => {


  }
  const handleClick = (key) => {
    console.log(key)
    if (key === 6) {
      dispatcher(logOutUser())
      setStatusOffline(user.id)
      navigator('/')
    }
    else if (key === 7) {
      setisModalOpen(true)
    }
    else if(key===5){
      setkey(3)
    }
  }
  const handleMenu=(key)=>{
    console.log(key.key)
    setkey(parseInt(key.key))
  }


  return (
    <>
      <Layout hasSider>
        <Sider style={styles.sider}>
          <Image src={logo} style={styles.logo}></Image>
          <Divider style={styles.divider} />
          <Menu style={styles.leftmenu} theme='dark' mode='inline' onSelect={handleMenu} selectedKeys={[key.toString()]} defaultSelectedKeys={['1']} items={sidenavItems}></Menu>
        </Sider>

        <Layout style={styles.layout} >
          <Header style={styles.header} >
            <Badge count={1} size='small'>
              <Avatar style={{ border: '2px solid #27282F', background: 'transparent' }} shape='square' size={40} icon={<BellOutlined />}>
              </Avatar>
            </Badge>
            <div style={styles.profileContainer}>
              <span style={styles.name}>{user.name}</span>
              <Avatar size={50} icon={user.pic ? <Image src={user.pic} style={{ marginTop: '10px' }} /> : <UserOutlined />} />
            </div>
            <DropdownButton style={{ backgroundColor: '#1F1E23' }} title='profile'>
              {topnavItems.map((x) => {
                return <Dropdown.Item key={x.key} onClick={() => handleClick(x.key)}>{x.icons}&nbsp;{x.label}</Dropdown.Item>
              })}
            </DropdownButton>
          </Header>
          <div style={{ display: 'flex' }} >
            <Content style={styles.postContainer} >
              {key===1 && <Posts user={user} />}
              {key===3 && <MyPosts user={user}/>}
              {key===4 && <Notifications user={user}/>}  
            </Content>
            <Content style={styles.trending}>
              <div style={styles.trendContainer}>
              </div>
              <div style={styles.friends}>
              </div>
            </Content>
          </div>
        </Layout>
      </Layout>
      <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={() => setisModalOpen(false)}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img
                src={URL.createObjectURL(imageUrl)}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'transparent', marginRight: '10%', width: '1000px' }}>
            <Input ref={nameRef} placeholder='Name' defaultValue={user.name}></Input>
            <Input placeholder='email' value={user.email} disabled></Input>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Dashboard