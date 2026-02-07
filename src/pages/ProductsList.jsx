import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { getMeals ,getPageCount} from "../api/mealService";
import "../css/ProductList.css";
import {CircularProgress, Paper, Box, TextField, Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { deleteMealFromServer } from "../api/mealService";
import Jumpdescraption from "../components/jumpdescraption";
 
  const ProductsList = ({ setCart, openCart }) => {
      let [numPages, setNumPages] = useState(0)
      let [meals, setMeals] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const openMealModal = (meal) => {
      console.log("meal before modal:", meal);
      setSelectedMeal(meal);
      setOpenModal(true);
    };
    

      async function fetchPageCount () { 
        let res = await getPageCount()
        setNumPages(res.data.totalPages)
    }
    async function fetchMeals() {
      setLoading(true);
      try {
        const res = await getMeals(10, currentPage);
        setMeals(res.data); 
      }  catch (error) {
        console.error("שגיאה בטעינת המנות:", error);
      }finally {
        setLoading(false);
      }
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
    openCart();
    };

//     const dispatch = useDispatch();
// const handleDelete = async (id) => {
//   await deleteMealFromServer(id);
//   dispatch(deleteMeal(id)); 
// };

  
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
      {loading ? (
          <Box sx={{display: "flex", justifyContent: "center",
            alignItems: "center",width: "100%", height: "300px", marginRight: 45}}><>
            <svg width={0} height={0}>
              <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(255, 255, 255)" />
                  <stop offset="50%" stopColor="rgb(240, 202, 124)" />
                  <stop offset="100%" stopColor="rgb(244, 170, 21)" />
                </linearGradient>
              </defs>
            </svg>
          
            <CircularProgress
              size={60}
              thickness={4}
              sx={{"svg circle": {stroke: "url(#loaderGradient)",strokeLinecap: "round",
                },}}/>
          </> 
          </Box>
        ) : (
        meals.map((meal, index) => (
          <ProductItem key={meal._id} meal={meal} addToCart={addToCart} onImageClick={openMealModal}/>

        ))
        )}
      </div>
      <div className="allpagesButton">
        {new Array(numPages).fill("*").map((item, index) => {
          return <input className="pagebutton" key={index} type="button" value={index + 1}
            onClick={() => { 
              setCurrentPage(index + 1) }} />
        })}
      </div>
      <Jumpdescraption
        open={openModal}
        onClose={() => setOpenModal(false)}
        meal={selectedMeal}
        addToCart={addToCart}
      />

    </div>
  
    // </Box>

  );
};

export default ProductsList;
