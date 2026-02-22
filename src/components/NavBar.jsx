import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../features/userSlice";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from "@mui/material/Badge";
import "../css/NavBar.css";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ({countOfMeals}) => {
  let user = useSelector((state) => state.user.currentUser);
  let disp = useDispatch();
  console.log("Current user navbar:", user?.userName);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    disp(logOut());
  };
  
  return (
    <nav>
      <ul className="bar" style={{ listStyle: "none" }}>
              <li className="liuser">שלום {user ? user.userName : "אורח"}</li>
        {!user && (
          <>
        <li className="lilink">
          <Link to="login">כניסה</Link>
        </li>
          </>)}
          {user && (
          <li className="lilink">
        <LogoutIcon
        style={{ cursor: "pointer", fontSize: 30, color: "rgb(240 202 124)" }}
        onClick={handleLogout}/>
        </li>
        )}
        
        {user && user.role === "ADMIN" && (
        <li className="lilink">
<Link to="addproduct">
  הוספת מוצר
</Link>
          </li>
        )}
        <li className="lilink">
          <Link to="list">מוצרים</Link>
        </li>
        <li>
        <Link to="cart">
          <Badge badgeContent={countOfMeals} color="warning">
              <AddShoppingCartIcon sx={{ color: "white", fontSize: 30 }} />
          </Badge>
        </Link>
        </li>
        <li className="lilink">
          <Link to="/"><img className="logo" src="../public/images/logo2.png" /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
