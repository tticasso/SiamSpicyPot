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
                toast.success("Đặt hàng thành công")
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
            <div className="place-order-right"
                style={{ fontFamily: "sans-serif" }}
            >
                <div className="cart-total">
                    <h2>Tổng đơn hàng</h2>
                    <div>
                        {food_list.map((item, index) => {
                            if (cartItems[item._id] > 0) {
                                return (<div key={index}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        width: "100%"
                                    }}>
                                        <p>{item.name}</p>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            justifyContent: "center"
                                        }}>
                                            <p>
                                                <span style={{ fontFamily: "'Roboto Mono', monospace" }}>{item.price}</span>
                                                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "10px" }}>.000 đ</span>
                                            </p>
                                            <p style={{ fontFamily: "'Roboto Mono', monospace" }} >x {cartItems[item._id]}</p>
                                        </div>
                                        <p style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "right"
                                        }}>
                                            <div>
                                                <span style={{ fontFamily: "'Roboto Mono', monospace" }}>{item.price * cartItems[item._id]}</span>
                                                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "10px" }}>.000 đ</span>
                                            </div>
                                        </p>
                                    </div>
                                    <hr />
                                </div>)
                            }
                        })}

                    </div>
                    <div>
                        <div className="cart-total-details"><p>Tổng sản phẩm</p>
                            <div>
                                <span style={{ fontSize: '20px', fontFamily: "'Roboto Mono', monospace" }}>{getTotalCartAmount()}</span>
                                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "14px" }}>.000 đ</span>
                            </div>
                        </div>
                        <hr />
                        <div className="cart-total-details"><p>Phí khác</p><p style={{ fontSize: '20px', fontFamily: "'Roboto Mono', monospace" }}>0 đ</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Thành tiền</b><p>

                            <span style={{ fontSize: '20px', fontFamily: "'Roboto Mono', monospace" }}>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</span>
                            <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "14px" }}>.000 đ</span>

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
                <button className='place-order-submit' type='submit' style={{ fontSize: '20px' }}>{payment === "cod" ? "Đặt hàng" : "Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder
