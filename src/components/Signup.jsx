import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import styles from '../assests/stylesheets/Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { addUserToCollection } from '../databaseOperation/addUserToCollection'
import { registerUser } from '../databaseOperation/registerUser'
import { useDispatch } from 'react-redux'
import { logInUser } from '../slices/userSlice'

const SignUp = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setLoading] = useState(false)

    const name = useRef()
    const email = useRef()
    const password = useRef()
    const confirmpassword = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (password.current.value !== confirmpassword.current.value) {
            setTimeout(() => {
                seterror(null)
            }, 2000);
            return seterror('password do not match')
        }
        try{
            setLoading(true)
            const user=await registerUser(email.current.value,password.current.value,name.current.value)
            dispatch(logInUser({name:name.current.value,email:email.current.value,id:user.user.uid}))
        }
        catch(err){
            console.log(err)
            return seterror('unknown error occured')
        }
    }
    return (
        <div className={styles.container}>
            <Container className={styles.box}>
                <Card className={styles.card}>
                    <Card.Header className={styles.cardHeader}>
                        <h1 className={styles.heading}>Create an Account</h1>
                    </Card.Header>
                    <Card.Body className={styles.cardBody}>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label className={styles.Label}>EMAIL</Form.Label>
                                <br />
                                <Form.Control ref={email} className={styles.input} type='email' required />
                            </Form.Group>
                            <Form.Group id='name'>
                                <Form.Label className={styles.Label}>FULL NAME</Form.Label>
                                <br />
                                <Form.Control ref={name} className={styles.input} type='text' required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label className={styles.Label}>PASSWORD</Form.Label>
                                <br />
                                <Form.Control ref={password} className={styles.input} type='password' required />
                            </Form.Group>
                            <Form.Group id='confirmpassword'>
                                <Form.Label className={styles.Label}>CONFIRM PASSWORD</Form.Label>
                                <br />
                                <Form.Control ref={confirmpassword} className={styles.input} type='password' required />
                                {error && <p style={{ color: 'red', letterSpacing: '0.1rem' }}>*{error}</p>}
                            </Form.Group>
                            <Button disabled={loading} className={styles.button} type='submit'>Create</Button>
                        </Form>
                        <div className={styles.register}>
                            <Link className={styles.link} to='/'>Already have an account? </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default SignUp