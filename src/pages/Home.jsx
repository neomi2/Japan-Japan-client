import "../css/Home.css";

const Home = () => {
  return (
    <div>
      <video className="video1" width="600" autoPlay muted loop>
        <source src="/images/video.mp4" type="video/mp4" />
        הדפדפן שלך לא תומך בניגון וידאו.
      </video>
      <div className="allcategoryimg">
        <img src="../images/57.jpg" className="categoryimg" />
        <img src="../images/81.jpg" className="categoryimg" />
        <img src="../images/34.jpg" className="categoryimg" />
        <img src="../images/25.jpg" className="categoryimg" />
        <img src="../images/10.jpg" className="categoryimg" />
        <img src="../images/60.jpg" className="categoryimg" />
        <img src="../images/72.jpg" className="categoryimg" />
        <img src="../images/41.jpg" className="categoryimg" />

      </div>
    </div>
  );
};

export default Home;
