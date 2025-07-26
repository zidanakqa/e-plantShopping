import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Add useSelector
import { addItem } from './CartSlice';
import './ProductList.css'
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
const [showCart, setShowCart] = useState(false);
const [showPlants, setShowPlants] = useState(false);
const [addedToCart, setAddedToCart] = useState({});

const dispatch = useDispatch();
const cartItems = useSelector(state => state.cart.items); // Access cart items from Redux store

// Calculate total quantity of items in cart
const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
};

const plantsArray = [
    // ... (keeping the existing plantsArray as is)
    {
        category: "Air Purifying Plants",
        plants: [
            {
                name: "Snake Plant",
                image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                description: "Produces oxygen at night, improving air quality.",
                cost: "$15"
            },
            // ... rest of the plants array
        ]
    },
    // ... other categories
];

const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch the action to add the product to the cart
    setAddedToCart((prevState) => ({
        ...prevState,
        [product.name]: true,
    }));
};

const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignIems: 'center',
    fontSize: '20px',
}
const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
}
const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
}

const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
};

const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
};

const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
};

const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
};

return (
    <div>
        <div className="navbar" style={styleObj}>
            <div className="tag">
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" onClick={(e) => handleHomeClick(e)}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </a>
                </div>
            </div>
            <div style={styleObjUl}>
                <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                <div> 
                    <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                <rect width="156" height="156" fill="none"></rect>
                                <circle cx="80" cy="216" r="12"></circle>
                                <circle cx="184" cy="216" r="12"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                            </svg>
                            {/* Display total quantity badge */}
                            {calculateTotalQuantity() > 0 && (
                                <span className="cart-quantity-badge" style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '5px 10px',
                                    fontSize: '14px'
                                }}>
                                    {calculateTotalQuantity()}
                                </span>
                            )}
                        </h1>
                    </a>
                </div>
            </div>
        </div>
        {!showCart ? (
            <div className="product-grid">
                {plantsArray.map((category, index) => (
                    <div key={index}>
                        <h1>
                            <div>{category.category}</div>
                        </h1>
                        <div className="product-list">
                            {category.plants.map((plant, plantIndex) => (
                                <div className="product-card" key={plantIndex}>
                                    <img 
                                        className="product-image" 
                                        src={plant.image}
                                        alt={plant.name}
                                    />
                                    <div className="product-title">{plant.name}</div>
                                    <div className="product-description">{plant.description}</div>
                                    <div className="product-cost">{plant.cost}</div>
                                    <button
                                        className="product-button"
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]}
                                        style={{
                                            backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                                            cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <CartItem onContinueShopping={handleContinueShopping} />
        )}
    </div>
);
}

export default ProductList;