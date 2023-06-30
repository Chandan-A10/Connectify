import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import styles from '../assests/stylesheets/Login.module.css'
import { Link } from 'react-router-dom'
import img from '../assests/images/bg.svg'
import { loginUser } from '../databaseOperation/loginUser'
import { useDispatch } from 'react-redux'
import { logInUser } from '../slices/userSlice'
import { GoogleLogin } from '../databaseOperation/registerUser'

const Login = () => {
    const dispatch=useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)

    const email = useRef()
    const password = useRef()

    const handleGoogle=async()=>{
        const user=await GoogleLogin()
        user?dispatch(logInUser({name:user.user.displayName,id:user.user.id,email:user.user.email})):alert('Some unknown error occured')
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (email.current.value === '' || password.current.value === '') {
            setTimeout(() => {
                seterror(null)
            }, 2000);
            return seterror('All Fields are Required')
        }
        setLoading(true)
        const user=await loginUser(email.current.value,password.current.value)
        user? dispatch(logInUser({name:user.user.displayName,id:user.user.id,email:user.user.email})):alert('User Invalid')
        setLoading(false)
        console.log('User Logged in')
    }
    return (
        <div className={styles.container}>
            <Container className={styles.box}>
                <Card className={styles.card}>
                    <Card.Header className={styles.cardHeader}>
                        <h1 className={styles.heading}>Welcome Back!</h1>
                        <p className={styles.subheading}>We are excited to see you again</p>
                    </Card.Header>
                    <Card.Body className={styles.cardBody}>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label className={styles.Label}>EMAIL</Form.Label>
                                <br />
                                <Form.Control ref={email} className={styles.input} type='email' required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label className={styles.Label}>PASSWORD</Form.Label>
                                <br />
                                <Form.Control ref={password} className={styles.input} type='password' required />
                                {error && <p style={{ color: 'red', letterSpacing: '0.1rem' }}>*{error}</p>}
                            </Form.Group>
                            <Button disabled={loading} className={styles.button} type='submit'>Log In</Button>
                            <button onClick={handleGoogle} disabled={loading} className={styles.authButton}>
                                <img alt='G' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />
                                Sign Up With Google
                            </button>
                        </Form>
                        <div className={styles.register}>
                            Don't have an account? <Link className={styles.link} to='/'>Regitser</Link>
                        </div>
                    </Card.Body>
                </Card>
                <img className={styles.img} src={img} alt='social'></img>
            </Container>
        </div>
    )
}

export default Login