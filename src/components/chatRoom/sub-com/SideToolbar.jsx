import React from 'react'
import { Form, Card, Container } from 'react-bootstrap'
import styles from './SideToolbar.module.css'
import { SearchOutlined } from '@ant-design/icons'
import { Divider, Input } from 'antd'
import UserList from './UserList'

const SideToolbar=React.memo(({data,setid})=> {
  console.log('SideToolbarCmp')
  return (
    <Container  className={styles.container} style={{width:'46%',borderRight:'5px solid #27282F'}}>
        <Card style={{background:'transparent', border:'transparent'}} >
            <Card.Body>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <h3 style={{color:'white'}}>Chats</h3>
                </div>
               <Form >
                <Input placeholder='Search...' className={styles.search} suffix={<SearchOutlined />} size='large'></Input>
              </Form> 
            </Card.Body>
        </Card>
        <Divider style={{marginTop:'-0.5%',borderWidth:'5px',marginBottom:'-0.5%',borderColor:'#27282F'}}/>
        <UserList data={data} setid={setid}></UserList>
    </Container>
  )
})

export default SideToolbar