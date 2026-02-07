import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../css/JumpCart.css";
import { brown } from "@mui/material/colors";

const JumpCart = ({ cart, setCart, open, setOpen }) => {

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const addToCart = (meal) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === meal._id);
      if (exists) {
        return prev.map((item) =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );}
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId) => {
    setCart((prev) => {
      const item = prev.find((i) => i._id === mealId);
      if (item && item.quantity > 1) {
        return prev.map((i) =>
          i._id === mealId ? { ...i, quantity: i.quantity - 1 }: i
        );}
      return prev.filter((i) => i._id !== mealId);
    });
  };

  const handleCheckOut = async () => {
    if (cart.length === 0) return alert("הסל שלך ריק!");

    const orderPayload = {
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date(),
      orderDeadline: new Date(Date.now() + 172800000),
      orderAdress: "Israel, Bnei Brak",
      clientID: "12345",
      meals: cart.map((item) => ({
        mealId: item._id,
        quantity: item.quantity,
      })),
      isOrderSent: false,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );

      if (response.ok) {
        alert("ההזמנה נשמרה בהצלחה!");
        setCart([]);
        localStorage.removeItem("user_shopping_cart");
      } else {
        alert("שגיאת שרת");
      }
    } catch {
      alert("שגיאת חיבור לשרת");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.mealprice * item.quantity,0
  );

  return (
    <>

      <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box sx={{ width: 320, p: 2, direction: "rtl" ,backgroundColor:"black",color:"white",border: '1px solid white'}}>
          <h2 style={{ textAlign: "center" }}>סל הקניות</h2>
          <hr />

          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>הסל ריק כרגע</p>
          ) : (
            <>
{cart.map((item) => (
  <div key={item._id}
    style={{display: "flex",justifyContent: "space-between",alignItems: "center",padding: "10px 0",borderBottom: "1px solid #eee",}}>
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      {item.mealImage ? (
        <img src={`/images/${item.mealImage}.jpg`} alt={item.mealname}
          style={{width: "60px",height: "60px",objectFit: "cover",borderRadius: "6px",border: "1px solid white",}}/>
      ) : (
        <div
          style={{width: "60px",height: "60px",backgroundColor: "#ccc",borderRadius: "6px",display: "flex",justifyContent: "center",alignItems: "center",}}>
          אין תמונה
        </div>
      )}

      <div style={{ lineHeight: 1 }}>
        <strong style={{ margin: 0 }}>{item.mealname}</strong>
        <div style={{ color: "#666", marginTop: 10 }}>מחיר: {item.mealprice} ₪</div>
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button className="minusButton" onClick={() => removeFromCart(item._id)}>
        -
      </button>
      <span>{item.quantity}</span>
      <button className="addButton" onClick={() => addToCart(item)}>
        +
      </button>
    </div>
  </div>
))}


              <h3 style={{ marginTop: 20 }}>סה״כ: {totalPrice} ₪</h3>

              <button onClick={handleCheckOut}
                style={{color:'white', width: "100%",padding: 15,background: "#f0ca7c",border: "none",fontSize: 18,cursor: "pointer",marginTop: 10,}}>
                לעבור לסל הקניות
              </button>
            </>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default JumpCart;
