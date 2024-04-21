import { useContext, useState } from "react";
import { CartContext } from "../context/cart";

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

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
      <div className="flex items-center ml-auto">
        <button
          onClick={() => setShowCart(!showCart)}
          className={`border border-border-light-grey  hover:text-font-colour ${
            showCart ? "text-font-colour" : "text-font-colour-light"
          }`}
        >
          My Cart ({cart.length})
        </button>
        {showCart && (
          <div className="bg-white border border-border-light-grey absolute mt-2 top-4 right-0 md:w-[25%] w-[100%]">
            {combinedCart.map((item) => (
              <div key={item.selectedSize} className="flex flex-row m-6">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  width={100}
                  height={150}
                />
                <div>
                  <p>{item.title}</p>
                  <p>
                    {item.quantity}x{" "}
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </p>
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
