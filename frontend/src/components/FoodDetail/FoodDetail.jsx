import React, { useContext } from 'react';
import './FoodDetail.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodDetail = ({ image, name, price, desc, id, rating, onClose }) => {
    const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);
    
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            onClose(); // Close the modal when clicking outside
        }
    };

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
                <div className="modal-body">
                    <div className='food-item-img-container'>
                        <img className='food-item-image' src={url + "/images/" + image} alt="" />
                        {!cartItems[id]
                            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                            : <div className="food-item-counter">
                                <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                                <p>{cartItems[id]}</p>
                                <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                            </div>
                        }
                    </div>
                    <div className="food-item-info">
                        <div className="food-item-name-rating">
                            <p>{name}</p>
                            <p>Đánh giá: {rating} <span style={{ fontSize: "20px", color: '#f9fb6a' }}>★</span></p>
                        </div>
                        <p className="food-item-desc">{desc}</p>
                        <p className="food-item-price">
                            <span style={{ fontSize: '30px', fontWeight: '800' }}>{price}</span>
                            <span style={{ fontSize: '14px', fontWeight: '800' }}>.000 đ</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
