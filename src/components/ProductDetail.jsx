import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/cart";

const API_URL =
  "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

const ProductDetail = () => {
  const [selectedSize, setSize] = useState("");
  const { addToCart } = useContext(CartContext);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setItemData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { title, description, price, imageURL, sizeOptions } = itemData;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={imageURL} alt={title} className="w-full" />
        </div>
        <div className="md:w-1/2 md:pl-8 flex flex-col items-start gap-2">
          <h1 className="text-xl md:mt-0">{title}</h1>
          <hr className="w-0 md:w-full" />
          <p className="font-bold">${price.toFixed(2)}</p>
          <hr className="w-0 md:w-full" />
          <p className="text-font-colour-light text-s">{description}</p>
          <div>
            <p className="text-font-colour-light text-xs mt-3">
              SIZE<span className="text-required-star">*</span>
            </p>
            <div className="flex flex-row gap-2 mt-3">
              {sizeOptions.map((size) => (
                <button
                  key={size.id}
                  value={size.label}
                  className={` border text-xs text-font-colour-light px-3 py-2 hover:border-border-dark-grey duration-200
                    ${
                      selectedSize === size.label
                        ? "border-border-dark-grey border-2"
                        : "border-border-light-grey"
                    }
                  `}
                  onClick={() => setSize(size.label)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <button
            className="hover:bg-black hover:text-white py-2 px-6 mt-2 text-black border-black border duration-200"
            onClick={() => checkSizeSelected()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
