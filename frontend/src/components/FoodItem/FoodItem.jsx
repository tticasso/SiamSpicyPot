import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import FoodDetail from '../FoodDetail/FoodDetail';

const FoodItem = ({ image, name, price, desc, id, rating }) => {
    const [itemCount, setItemCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);
    // console.log(cartItems, id);

    const handleItemClick = () => {
        setShowModal(true);
        console.log("Show modal");
    };
    
    return (
        <>
            <div className='food-item' onClick={handleItemClick}>
                <div className='food-item-img-container'>
                    <img className='food-item-image' src={url + "/images/" + image} alt="" />
                    {!cartItems?.[id]
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
                    </div>
                    <p>Đánh giá: {rating} <span style={{display: 'inline-block', fontSize: "20px", color: '#f9fb6a', background: '#ffffff', borderRadius: "6px",}}>★</span></p>
                    <p className="food-item-desc">{desc}</p>
                    <p className="food-item-price">
                        <span style={{ fontSize: '30px', fontWeight: '800' }}>{price}</span>
                        <span style={{ fontSize: '14px', fontWeight: '800' }}>.000 đ</span>
                    </p>
                </div>
            </div>
            {showModal && 
                <FoodDetail
                    image={image}
                    name={name}
                    price={price}
                    desc={desc}
                    id={id}
                    rating={rating}
                    onClose={() => setShowModal(false)}
                />
            }
        </>
    );
};

export default FoodItem;
