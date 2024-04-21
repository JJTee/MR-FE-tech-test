import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext } from "./context/cart";

const API_URL =
  "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

async function fetchItem() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

const itemData = await fetchItem();

const { title, description, price, imageURL, sizeOptions } = itemData;

function App() {
  const [selectedSize, setSize] = useState("");
  const { addToCart } = useContext(CartContext);

  function checkSizeSelected() {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    } else {
      addToCart({ ...itemData, selectedSize });
    }
  }

  return (
    <>
      <ToastContainer />
      <header className="bg-header-bg">
        <ShoppingCart className="ml-auto" />
      </header>
      <main className="text-font-colour container mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={imageURL} alt={title} className="w-full" />
          </div>
          <div className="md:w-1/2 md:pl-8 flex flex-col items-start gap-2">
            <h1 className="text-xl md:mt-0">{title}</h1>
            <hr className="w-full" />
            <p className="font-bold">${price.toFixed(2)}</p>
            <hr className="w-full" />
            <p className="text-font-colour-light text-s text-left">
              {description}
            </p>
            <div className="">
              <p className="block text-font-color-light text-left">
                Size<span className="text-required-star">*</span>
              </p>
              {sizeOptions.map((size) => (
                <button
                  key={size.id}
                  value={size.label}
                  className={`border-border-light-grey border text-xs text-font-color-light px-3 py-2 m-1 hover:border-border-dark-grey duration-200
                    ${
                      selectedSize === size.label
                        ? "border-border-dark-grey border-2"
                        : ""
                    }
                  `}
                  onClick={() => setSize(size.label)}
                >
                  {size.label}
                </button>
              ))}
            </div>
            <button
              className="hover:bg-black hover:text-white py-2 px-6 mt-2 text-black border-black border duration-200"
              onClick={() => checkSizeSelected()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
