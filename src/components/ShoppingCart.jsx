import { useContext, useState } from "react";
import { CartContext } from "../context/cart";

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(true);

  const combinedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(
      (accItem) =>
        accItem.id === item.id && accItem.selectedSize === item.selectedSize
    );
    if (existingItem) {
      existingItem.quantity += 1;
      return acc;
    }
    return [...acc, { ...item, quantity: 1 }];
  }, []);

  return (
    <>
      <div className="flex items-center">
        <button onClick={() => setShowCart(!showCart)}>Cart</button>
        <span className="ml-2">{cart.length}</span>
        {showCart && (
          <div className="bg-white border border-black">
            {combinedCart.map((item) => (
              <div key={item.selectedSize} className="flex flex-row m-3">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  width={100}
                  height={150}
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.selectedSize}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
