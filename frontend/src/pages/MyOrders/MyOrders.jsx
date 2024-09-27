import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {

  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    console.log(response.data.data);

    setData(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 'bold',
          fontSize: '30px',
        }}>Đơn hàng</h2>
      <div className="container">
        {!token &&
          <div className="no-orders">
            <p>Bạn cần tạo tài khoản và đăng nhập để theo dõi trạng thái đơn hàng. Nếu bạn đã đặt hàng thành công, hãy đợi giây lát nhân viên sẽ gọi điện xác nhận đơn giúp bạn.</p>
          </div>
        }
        {token && data.length == 0 &&
          <div className="no-orders">
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        }
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <img src={order.items[0].image} alt="" />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity
                }
                else {
                  return item.name + " x " + item.quantity + ", "
                }

              })}</p>
              <p>{currency}{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
