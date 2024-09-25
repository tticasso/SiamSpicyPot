import React, { useState } from 'react'
import './Menu.css';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
export default function Menu() {
    const [category,setCategory] = useState("All")
    return(
        <div>
            <ExploreMenu setCategory={setCategory} category={category}/>
            <FoodDisplay category={category}/>
        </div>
    );
}     