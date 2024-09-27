import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(cartItems);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sản phẩm</p> <p>Tên sản phẩm</p> <p>Giá</p> <p>Số lượng</p> <p>Thành tiền</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          {
            console.log(item.name + cartItems[item._id]);
          }
          if (cartItems[item._id] > 0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url + "/images/" + item.image} alt="" />
                <p>{item.name}</p>
                <p>
                  <span style={{ fontSize: '20px', fontWeight: 'normal' }}>{item.price}</span>
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>.000 đ</span>
                </p>
                <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                  <img style={{width:"20px", height:"20px"}} src={assets.remove_icon_red} onClick={() => removeFromCart(item._id)} alt="" />
                  <p>{cartItems[item._id]}</p>
                  <img style={{width:"20px", height:"20px"}} src={assets.add_icon_green} onClick={() => addToCart(item._id)} alt="" />
                </div>
                <p>
                  <span style={{ fontSize: '20px', fontWeight: 'normal' }}>{item.price * cartItems[item._id]}</span>
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>.000 đ</span>
                </p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')} style={{ fontSize: '20px' }}>Thanh toán</button>
        </div>
        <div className="cart-promocode">
        </div>
      </div>
    </div>
  )
}

export default Cart
