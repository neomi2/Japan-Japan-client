import "../css/ProductItem.css";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export default function ProductItem({ meal, addToCart ,onImageClick, onEdit, onDelete }) {
  // const user = useSelector(state => state.user.currentUser);
  // const isAdmin = user?.role === "ADMIN";
  const user = useSelector(state => state.user.currentUser);




  return ( 
    <div> 
      <ul style={{ listStyle: 'none' }} className="product">
        <li>
          {meal.mealImage ? (
            <img src={`/images/${meal.mealImage}.jpg`} alt={meal.mealname} 
            className="productpic" onClick={() => onImageClick(meal)} style={{ cursor: "pointer" }}
            />) : (<p>אין תמונה זמינה</p>)}</li> 
          <li className="allDescription" key={meal._id} >
          <h3 className="name">{meal.mealname}</h3>
          <p className="Description">{meal.mealDescription}</p>
          <div className="buttonprice">
            <p className="price">מחיר: {meal.mealprice}₪</p>
 
            {user && user.role === "ADMIN" ? (
        <div className="admin-buttons">
                <EditIcon sx={{ color: "rgb(240 202 124)", fontSize: 30, margin: "5px 60px 0px 5px" ,cursor:"pointer"}}
                onClick={() => onEdit(meal)}/>
<DeleteIcon sx={{ fontSize: 30, cursor: "pointer" , margin: "5px 0px 0px 5px"}} 
  onClick={() => {
    if (window.confirm("האם למחוק את המוצר הזה?")) {
      onDelete(meal._id);}}}/>
        </div> 
      ) : ( 
        <button onClick={() => addToCart(meal)} className="add-to-cart" >+</button>
      )} 
          </div>
        </li> 
    </ul>
  </div>
);
}
