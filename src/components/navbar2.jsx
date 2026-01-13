import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../features/userSlice";
import "../css/NavBar.css";


const NavBar = () => {
  let user = useSelector((state) => state.user.currentUser);
  let disp = useDispatch();
  return (
    <nav>
      <ul className="bar" style={{ listStyle: "none" }}>
              <li className="liuser">שלום ל-{user ? user.userName : "אורח"}</li>
        {!user && (
          <>
        <li className="lilink">
          <Link to="login">כניסה</Link>
        </li>

        <li className="lilink">
          <Link to="signup">הירשם</Link>
            </li>
          </>)}
          {user && (
          <li className="lilink">
            <input type="button" value="יציאה"
            onClick={() => {disp(logOut());}}/>
                  </li>)}
        
        {user && user.role === "ADMIN" && (
        <li className="lilink">
        <Link to="Addproduct">מוצרים ההוספת</Link>
      </li> )}

        <li className="lilink">
          <Link to="list">מוצרים</Link>
        </li>
        <li className="lilink">
          <Link to="basket">סל הקניות</Link>
        </li>
        <li className="lilink">
          <Link to="/"><img className="logo" src="../public/images/logo2.png" /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
