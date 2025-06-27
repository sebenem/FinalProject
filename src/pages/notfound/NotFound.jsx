import React from 'react'
import style from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={style.container}>
            <h1>Not found 404</h1>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    )
}

export default NotFound
