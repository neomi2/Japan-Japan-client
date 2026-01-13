import "../css/ProductItem.css";

export default function ProductItem({ meal, addToCart }) {

  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        
          
      {meal.mealImage ? (
            <img src={`/images/${meal.mealImage}.jpg`} alt={meal.mealname} 
className="productpic"
            />) : (<p>אין תמונה זמינה</p>)}
        <li className="allDescription" key={meal._id} >
          <h3 className="name">{meal.mealname}</h3>
          <p className="Description">{meal.mealDescription}</p>
          <div className="buttonprice">
          <p className="price">מחיר: {meal.mealprice}₪</p>
          <button onClick={() => addToCart(meal)} className="add-to-cart" >+</button>
          </div>
        </li> 
    </ul>
  </div>
);
}
