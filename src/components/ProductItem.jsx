import "../css/ProductItem.css";

export default function ProductItem({ meal, addToCart }) {
  // const user = useSelector(state => state.user.currentUser);
  // const isAdmin = user?.role === "ADMIN";

  return (
    <div>
      <ul style={{ listStyle: 'none' }} className="product">
        <li>
          {meal.mealImage ? (
            <img src={`/images/${meal.mealImage}.jpg`} alt={meal.mealname} 
            className="productpic" 
            />) : (<p>אין תמונה זמינה</p>)}</li>
          <li className="allDescription" key={meal._id} >
          <h3 className="name">{meal.mealname}</h3>
          <p className="Description">{meal.mealDescription}</p>
          <div className="buttonprice">
            <p className="price">מחיר: {meal.mealprice}₪</p>
            {/* {isAdmin ? (
        <div className="admin-buttons">
          <button>✏️ </button>
          <button>🗑️ </button>
        </div>
      ) : ( */}
        <button onClick={() => addToCart(meal)} className="add-to-cart" >+</button>
      {/* )} */}
          </div>
        </li> 
    </ul>
  </div>
);
}
