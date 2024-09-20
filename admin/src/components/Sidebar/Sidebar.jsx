import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p style={{fontFamily: 'Arial, Helvetica, Roboto, sans-serif',}}>Thêm sản phẩm</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p style={{fontFamily: 'Arial, Helvetica, Roboto, sans-serif',}}>Danh sách sản phẩm</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p style={{fontFamily: 'Arial, Helvetica, Roboto, sans-serif',}}>Đơn hàng</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
