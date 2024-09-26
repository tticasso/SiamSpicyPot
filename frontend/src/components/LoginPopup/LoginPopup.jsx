import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState === "Sign Up" ? "Đăng ký":"Đăng nhập"}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên của bạn' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Nhập email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Nhập mật khẩu nhé' required />
                </div>
                <button>{currState === "Login" ? "Đăng nhập" : "Tạo tài khoản"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>Tiếp tục và đồng ý với điều khoản</p>
                </div>
                {currState === "Login"
                    ? <p>Vẫn chưa đăng ký luôn? <span onClick={() => setCurrState('Sign Up')}>Đăng ký ngay đi</span></p>
                    : <p>Có tài khoản rồi hẻ? <span onClick={() => setCurrState('Login')}>Thế đăng nhập ở đây</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
