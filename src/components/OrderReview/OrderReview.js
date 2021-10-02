import React from 'react';
import UseProducts from '../../hooks/UseProducts';
import UseCart from '../../hooks/UseCart';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import { useHistory } from 'react-router';

const OrderReview = () => {
    const [products] = UseProducts();
    const [cart, setCart] = UseCart(products);
    const history = useHistory();

    const handleRemove = (key) => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    const handlePlaceOrder = () => {
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        handleRemove={handleRemove}
                        product={product}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;