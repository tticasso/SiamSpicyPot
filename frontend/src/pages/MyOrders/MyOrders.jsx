import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

function formatDate(isoDate) {
  const date = new Date(isoDate);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();

  return `${hours}h${minutes} ngày ${day}/${month}/${year}`;
}

function timeDifference(dateTime) {
  const now = new Date();
  const targetDate = new Date(dateTime);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);

  let interval = Math.floor(diffInSeconds / 31536000); // seconds in a year
  if (interval >= 1) {
    return `${interval} năm trước`;
  }

  interval = Math.floor(diffInSeconds / 2592000); // seconds in a month
  if (interval >= 1) {
    return `${interval} tháng trước`;
  }

  interval = Math.floor(diffInSeconds / 604800); // seconds in a week
  if (interval >= 1) {
    return `${interval} tuần trước`;
  }

  interval = Math.floor(diffInSeconds / 86400); // seconds in a day
  if (interval >= 1) {
    return `${interval} ngày trước`;
  }

  interval = Math.floor(diffInSeconds / 3600); // seconds in an hour
  if (interval >= 1) {
    return `${interval} giờ trước`;
  }

  interval = Math.floor(diffInSeconds / 60); // seconds in a minute
  if (interval >= 1) {
    return `${interval} phút trước`;
  }

  return `${diffInSeconds} giây trước`;
}

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

  const renderStatus = (status) => {
    let color = ''; // Biến để lưu màu sắc cho biểu tượng hình tròn

    switch (status) {
      case 'Food Processing':
        color = 'orange';
        return (
          <>
            <span style={{ color }}>&#x25cf;</span> <span style={{ color }}>Đang xử lý món ăn</span>
          </>
        );
      case 'Out for delivery':
        color = 'red';
        return (
          <>
            <span style={{ color }}>&#x25cf;</span> <span style={{ color }}>Đơn đã hủy</span>
          </>
        );
      case 'Delivering':
        color = 'blue';
        return (
          <>
            <span style={{ color }}>&#x25cf;</span> <span style={{ color }}>Đang giao hàng</span>
          </>
        );
      case 'Delivered':
        color = 'green';
        return (
          <>
            <span style={{ color }}>&#x25cf;</span> <span style={{ color }}>Đã giao hàng thành công</span>
          </>
        );
      default:
        color = 'gray';
        return (
          <>
            <span style={{ color }}>&#x25cf;</span> <span style={{ color }}>Trạng thái không xác định</span>
          </>
        );
    }
  };

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
            <p>Nếu bạn đã đặt hàng thành công, hãy đợi giây lát nhân viên sẽ gọi điện xác nhận đơn giúp bạn. Bạn cần tạo tài khoản và đăng nhập để theo dõi trạng thái đơn hàng. </p>
          </div>
        }
        {token && data.length == 0 &&
          <div className="no-orders">
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        }
        {data.slice().reverse().map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.url + "/images/" + order.items[0].image} alt="" />
              <p>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
              </p>
              <div>
                <span style={{ fontWeight: "bold" }}>Thành tiền: </span>
                <span style={{ fontFamily: "'Roboto Mono', monospace" }}>{order.amount}</span>
                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "10px" }}>.000 đ</span>
              </div>
              <p>Số lượng: {order.items.length}</p>
              <p>{renderStatus(order.status)}</p>
              <div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Ngày đặt hàng: </span> {formatDate(order.createdAt)}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Cập nhật: </span> {timeDifference(order.updatedAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default MyOrders
