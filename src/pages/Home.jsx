import "../css/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleCategoryClick = (event) => {
    // לוקח את הערך מה־value של התמונה
    const category = event.target.getAttribute("value");
    if (category) {
      navigate(`/list?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div>
      <video className="video1" width="600" autoPlay muted loop>
        <source src="/images/video.mp4" type="video/mp4" />
        הדפדפן שלך לא תומך בניגון וידאו.
      </video>
      <div className="allcategoryimg">
        {/* <div className="image-wrapper">
          <img src="../images/57.jpg" className="categoryimg" />
          <div className="text">ראשונות</div>
        </div> */}
        <div class="container">
        <img src="../images/57.jpg" value="Starters" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">ראשונות</div>
        </div>
        <div class="container">
          <img src="../images/81.jpg" value="Sauces" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">רטבים</div>
        </div>
        <div class="container">
          <img src="../images/34.jpg" value="Stir_fried" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">מוקפצים</div>
        </div>
        <div class="container">
          <img src="../images/25.jpg" value="Main" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">עיקריות</div>
        </div>
        <div class="container">
          <img src="../images/10.jpg" value="Sushi" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">סושי</div>
        </div>
        <div class="container">
          <img src="../images/60.jpg" value="Desserts" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">קינוחים</div>
        </div>
        <div class="container">
          <img src="../images/72.jpg" value="Drinks" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">שתיה</div>
        </div>
        <div class="container">
          <img src="../images/41.jpg" value="Combinations" className="categoryimg" onClick={handleCategoryClick} />
          <div class="overlay">קומבינציות</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
