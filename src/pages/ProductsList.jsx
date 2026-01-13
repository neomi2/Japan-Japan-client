import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { getMeals ,getPageCount} from "../api/mealService";
import "../css/ProductList.css";
import { Paper, Box, TextField, Button } from "@mui/material";


  const ProductsList = ({ setCart }) => {
      let [numPages, setNumPages] = useState(0)
      let [meals, setMeals] = useState([]);
      let [currentPage, setCurrentPage] = useState(1)
    
      async function fetchPageCount () {
        let res = await getPageCount()
        setNumPages(res.data.totalPages)
    }
  async function fetchMeals() {
      const res = await getMeals(10, currentPage);
      setMeals(res.data);
  }
  useEffect(() => {
      fetchPageCount();
  }, [])

    useEffect(() => {
      fetchMeals()
    }, [currentPage]);
  //סל
  const addToCart = (meal) => {
    setCart(prev => {
        const exists = prev.find(item => item._id === meal._id);
        if (exists) {
            return prev.map(item =>
                item._id === meal._id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        return [...prev, { ...meal, quantity: 1 }];
    });
  };
  
  return (
        //       <Box
        //   sx={{
        //     minHeight: "100vh", // גובה כל המסך
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundImage: "url('../images/background3.jpg')", // הנתיב לתמונה שלך
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //   }}
        // >
    <div>
      <h1 className="up">המנות שלנו</h1>
      <div className="onemeal">
        {meals.map((meal, index) => (
          <ProductItem key={index} meal={meal} addToCart={addToCart}/>
        ))}
      </div>
      <div className="allpagesButton">
        {new Array(numPages).fill("*").map((item, index) => {
          return <input className="pagebutton" key={index} type="button" value={index + 1}
            onClick={() => { 
              setCurrentPage(index + 1) }} />
        })}
        </div>
    </div>
    // </Box>

  );
};

export default ProductsList;
