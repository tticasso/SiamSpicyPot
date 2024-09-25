import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Khám phá thực đơn của chúng tôi</h1>
      <p className='explore-menu-text'>Lựa chọn từ thực đơn đa dạng với nhiều món ăn được chế biến từ những nguyên liệu hảo hạng và chuyên môn ẩm thực. Sứ mệnh của chúng tôi là thỏa mãn cơn thèm ăn của bạn và nâng tầm trải nghiệm ăn uống của bạn, từng bữa ăn ngon một.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={category===item.menu_name?"active":""} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
