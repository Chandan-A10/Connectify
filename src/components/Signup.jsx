import React, { useRef, useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import styles from '../assests/stylesheets/Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../databaseOperation/registerUser'
import { useDispatch } from 'react-redux'
import { logInUser } from '../slices/userSlice'
import { motion } from 'framer-motion'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setLoading] = useState(false)

    const name = useRef()
    const email = useRef()
    const password = useRef()
    const confirmpassword = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.current.value !== confirmpassword.current.value) {
            setTimeout(() => {
                seterror(null)
            }, 2000);
            return seterror('password do not match')
        }
        try {
            setLoading(true)
            const user = await registerUser(email.current.value, password.current.value, name.current.value)
            dispatch(logInUser({ name: name.current.value, email: email.current.value, id: user.user.uid }))
            navigate('/')
        }
        catch (err) {
            console.log(err)
            return seterror('unknown error occured')
        }
    }
    return (
        <motion.div className={styles.container} initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 360 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
                duration: 1,
            }}>
            <Container className={styles.box} style={{width:'550px',height:'660px'}}>
                <Card className={styles.card} style={{background:'transparent'}}>
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
                            <motion.Button whileTap={{ scaleY: 0.99, scaleX: 0.99 }} disabled={loading} className={styles.button} type='submit'>Create</motion.Button>
                        </Form>
                        <div className={styles.register}>
                            <Link className={styles.link} to='/'>Already have an account? </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </motion.div>
    )
}

export default SignUp