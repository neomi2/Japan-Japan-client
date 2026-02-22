import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Addproduct from "./pages/Addproduct";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import JumpCart from './components/JumpCart'
import Jumpdescraption from "./components/jumpdescraption";
import { useDispatch } from "react-redux";
import { userIn } from "./features/userSlice";

// import Footer from "./components/footerBar";
function App() {
  const dispatch = useDispatch();

useEffect(() => {
  const savedUser = localStorage.getItem("currentUser");

  if (savedUser) {
    dispatch(userIn(JSON.parse(savedUser)));
  }
}, []);

  // סל קניות
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('user_shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('user_shopping_cart', JSON.stringify(cart));
  }, [cart]);
  const countOfMeals = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => {
    setCartOpen(true);
    setTimeout(() => {
      setCartOpen(false);
    }, 2000);
  };

  return (
    <>
      <NavBar countOfMeals={countOfMeals}/>
      <Routes> 
      <Route path="Addproduct" element={<Addproduct />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="list" element={<ProductsList setCart={setCart} openCart={openCart} />} />
        <Route path="addproduct" element={<Addproduct />} />
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart cart={cart} setCart={setCart} countOfMeals={countOfMeals} />} />
      </Routes>
      <Jumpdescraption />
      <JumpCart cart={cart} setCart={setCart} open={cartOpen} setOpen={setCartOpen}/>
       {/* <Footer/> */}
    </>
  );
}

export default App;
