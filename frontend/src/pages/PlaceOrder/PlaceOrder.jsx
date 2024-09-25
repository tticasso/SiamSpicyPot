import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()

        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        console.log(orderData);

        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Something Went Wrong")
            }
        }
        else {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                console.log(response.data);

                toast.error("Something Went Wrong")
            }
        }

    }

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Thông tin giao hàng</p>
                <div className="multi-field">
                    <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Tên Khách hàng' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Địa chỉ Email (nếu có)' />
                <input type="text" name='address' onChange={onChangeHandler} value={data.address} placeholder='Địa chỉ' required />
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Tổng đơn hàng</h2>
                    <div>
                        <div className="cart-total-details"><p>Tổng sản phẩm</p>
                            <p>
                                <span style={{ fontSize: '20px', fontWeight: 'normal' }}>{getTotalCartAmount()}</span>
                                <span style={{ fontSize: '14px', fontWeight: 'normal' }}>.000 đ</span>
                            </p>
                        </div>
                        <hr />
                        <div className="cart-total-details"><p>Phí khác</p><p>0 đ</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Thành tiền</b><p>
                            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</span>
                            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>.000 đ</span>
                        </p></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Phương thức thanh toán</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    {/* <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div> */}
                </div>
                <button className='place-order-submit' type='submit'  style={{ fontSize: '20px' }}>{payment === "cod" ? "Đặt hàng" : "Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder
