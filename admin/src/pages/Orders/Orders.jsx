import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

function formatDate(isoDate) {
  const date = new Date(isoDate);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();

  return `${hours}h${minutes} ngày ${day}/${month}/${year}`;
}

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectBgColors, setSelectBgColors] = useState({});

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      console.log(response.data);
      setOrders(response.data.data.reverse());
      // Initialize background colors for each order
      const initialBgColors = {};
      response.data.data.forEach(order => {
        initialBgColors[order._id] = getSelectBackgroundColor(order.status);
      });
      setSelectBgColors(initialBgColors);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status,
    });
    if (response.data.success) {
      // Update background color for the order
      setSelectBgColors(prev => ({
        ...prev,
        [orderId]: getSelectBackgroundColor(status),
      }));
      await fetchAllOrders();
    }
  };

  const getSelectBackgroundColor = (status) => {
    switch (status) {
      case 'Food Processing':
        return '#ffffcc'; // Light Yellow
      case 'Out for delivery':
        return '#ffcccc'; // Light Red
      case 'Delivered':
        return '#ccffcc'; // Light Green
      default:
        return '#ffffff'; // Default white
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3 className='title'>Đơn hàng</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                <span style={{
                  fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>Sản phẩm: </span>
                {order.items.map((item, index) => (
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-name'>
                <span style={{
                  fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>Khách hàng:</span> {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>
                <span style={{
                  fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>SĐT:</span> {order.address.phone}
              </p>
            </div>
            <div>
              <p>
                <span style={{
                  fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>Số lượng: </span> {order.items.length}</p>
              <p>
                <span style={{
                  fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}>Thời gian: </span> {formatDate(order.date)}
              </p>
            </div>
            <p><span style={{
              fontFamily: 'Arial, Helvetica, Roboto, sans-serif',
              fontWeight: 'bold',
              fontSize: '15px',
            }}>Thành tiền: </span>{currency}{order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              style={{ backgroundColor: selectBgColors[order._id],fontFamily: 'Arial, Helvetica, Roboto, sans-serif', }}
            >
              <option style={{ backgroundColor: "#ffffcc", fontFamily: 'Arial, Helvetica, Roboto, sans-serif', }} value="Food Processing">Đang xử lý</option>
              <option style={{ backgroundColor: "ffcccc", fontFamily: 'Arial, Helvetica, Roboto, sans-serif', }} value="Out for delivery">Hủy đơn</option>
              <option style={{ backgroundColor: '#ccffcc', fontFamily: 'Arial, Helvetica, Roboto, sans-serif', }} value="Delivered">Đã giao</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
