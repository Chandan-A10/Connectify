import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

const HomePage = () => {


    const currentUser = useSelector(state => state.user)

    return (
        <div>
            {currentUser?<><Dashboard/></>:<Login />}
        </div>
    )
}

export default HomePage