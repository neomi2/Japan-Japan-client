import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../css/jumpdescraption.css";

const Jumpdescraption = ({ open, onClose, meal, addToCart }) => {
  // אם אין meal, לא מציגים כלום
  if (!meal)
    return null;

  const categoryImages = {
    Starters: ["../images/end4.jpg","../images/end1.jpg","../images/end3.jpg"],
    Desserts: ["../images/endde.jpg","../images/endde1.jpg","../images/endde2.jpg"],
    Main: ["../images/endMa.jpg","../images/endMa1.jpg","../images/endMa2.jpg"],
    Stir_fried: ["../images/endS.jpg","../images/endS1.jpg","../images/endS2.jpg"],
    Sushi: ["../images/end4.jpg", "../images/end1.jpg", "../images/end3.jpg"],
    Drinks: ["../images/endcoc.jpg","../images/endcoc1.jpg","../images/endcoc2.jpg"],
    Combinations: ["../images/end4.jpg","../images/end1.jpg","../images/end3.jpg"],
    Sauces: ["../images/endso.jpg","../images/endso1.jpg","../images/endso2.jpg"],
  };

  const currentCat = meal.mealCategory?.trim();
  const addonsImages = currentCat ? categoryImages[currentCat] || [] : [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          bgcolor: "black",
          color: "white",
          border: "2px solid white",
          display: "flex",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(255, 255, 255, 0.068), 0 0px 7px",
        }}
      >
        {/* צד שמאל – טקסט והוספה לסל */}
        <Box
          sx={{ width: "50%", p: 3, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h5">{meal.mealname}</Typography>
          <Typography sx={{ mt: 2 }}>{meal.mealDescription}</Typography>
          <Typography sx={{ mt: 2 }}>מחיר: {meal.mealprice} ₪</Typography>

          <Button
            sx={{ mt: 3, backgroundColor: "#f0ca7c", color: "white" }}
            onClick={() => addToCart(meal)}
          >
            הוספה לסל
          </Button>

          {/* תוספות לארוחה – מתחת לכפתור */}
          {addonsImages.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                {/* תוספות מומלצות */}
               עוד באותה קטגוריה:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {addonsImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="smallpic"
                    alt="addon"
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* צד ימין – תמונה של המנה */}
        <Box sx={{ width: "50%", p: 2 }}>
          <img
            src={`/images/${meal.mealImage}.jpg`}
            alt={meal.mealname}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(255, 255, 255, 0.068), 0 0px 7px",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default Jumpdescraption;
