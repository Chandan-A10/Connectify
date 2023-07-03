import React, { useRef, useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import styles from '../assests/stylesheets/Login.module.css'
import { Link } from 'react-router-dom'
import img from '../assests/images/bg.svg'
import { loginUser } from '../databaseOperation/loginUser'
import { useDispatch } from 'react-redux'
import { logInUser } from '../slices/userSlice'
import { GoogleLogin } from '../databaseOperation/registerUser'
import { motion } from 'framer-motion'

const Login = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)

    const email = useRef()
    const password = useRef()

    const handleGoogle = async () => {
        const user = await GoogleLogin()
        user ? dispatch(
            logInUser({ name: user.user.displayName, id: user.user.uid, email: user.user.email })) : alert('Some unknown error occured')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email.current.value === '' || password.current.value === '') {
            setTimeout(() => {
                seterror(null)
            }, 2000);
            return seterror('All Fields are Required')
        }
        setLoading(true)
        const user = await loginUser(email.current.value, password.current.value)
        user ? dispatch(logInUser({ name: user.user.displayName, id: user.user.uid, email: user.user.email })) : alert('User Invalid')
        setLoading(false)
        console.log('User Logged in')
    }
    return (
        <div className={styles.containerL}>
            <Container className={styles.boxC}>
                <Card className={styles.cardL} style={{background:'transparent'}}>
                    <Card.Header className={styles.cardHeaderL}>
                        <h1 className={styles.headingL}>Welcome Back!</h1>
                        <p className={styles.subheadingL}>We are excited to see you again</p>
                    </Card.Header>
                    <Card.Body className={styles.cardBodyL}>
                        <Form className={styles.formL} onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label className={styles.LabelL}>EMAIL</Form.Label>
                                <br />
                                <Form.Control ref={email} className={styles.inputL} type='email' required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label className={styles.LabelL}>PASSWORD</Form.Label>
                                <br />
                                <Form.Control ref={password} className={styles.inputL} type='password' required />
                                {error && <p style={{ color: 'red', letterSpacing: '0.1rem' }}>*{error}</p>}
                            </Form.Group>
                            <motion.Button whileTap={{ scaleY: 0.99, scaleX: 0.99 }} disabled={loading} className={styles.buttonL} type='submit'>Log In</motion.Button>
                            <motion.button whileTap={{ scaleY: 0.99, scaleX: 0.99 }} onClick={handleGoogle} disabled={loading} className={styles.authButton}>
                                <img alt='G' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />
                                Sign Up With Google
                            </motion.button>
                        </Form>
                        <div className={styles.registerL}>
                            Don't have an account? <Link className={styles.linkL} to='/signup'>Regitser</Link>
                        </div>
                    </Card.Body>
                </Card>
                <img className={styles.imgL} src={img} alt='social'></img>
            </Container>
        </div>
    )
}

export default Login