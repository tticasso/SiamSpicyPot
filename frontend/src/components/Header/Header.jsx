import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <Link to='/menu'><button>Xem thực đơn</button></Link>
            </div>
        </div>
    )
}

export default Header
