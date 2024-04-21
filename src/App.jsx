import { useState } from "react";
import "./App.css";
import ShoppingCart from "./components/ShoppingCart";

const API_URL =
  "https://https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

const sampleItem = {
  id: 1,
  title: "Classic Tee",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  price: 75,
  imageURL:
    "https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg",
  sizeOptions: [
    {
      id: 1,
      label: "S",
    },
    {
      id: 2,
      label: "M",
    },
    {
      id: 3,
      label: "L",
    },
  ],
};

const { title, description, price, imageURL, sizeOptions } = sampleItem;

function App() {
  const [size, setSize] = useState("");
  return (
    <>
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
                  value={size.id}
                  className="border-border-light-grey border text-xs text-font-color-light px-3 py-2 m-1 hover:border-border-dark-grey duration-200"
                >
                  {size.label}
                </button>
              ))}
            </div>
            <button className="bg-black text-white py-2 px-6 mt-2 hover:bg-white hover:text-black hover:border-black hover:border duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
