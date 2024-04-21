import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <>
      <ToastContainer />
      <header className="bg-header-bg flex">
        <ShoppingCart className="ml-auto" />
      </header>
      <main className="text-font-colour container mx-auto px-4 mt-10">
        <ProductDetail />
      </main>
    </>
  );
}

export default App;
