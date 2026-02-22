import React from "react";
import "../css/Cart.css";


const Cart = ({ cart, setCart, countOfMeals }) => {
  const addToCart = (meal) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === meal._id);
      if (exists) { 
        return prev.map(item => item._id === meal._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const removeFromCart = (mealId) => {
    setCart(prev => {
      const item = prev.find(i => i._id === mealId);
      if (item && item.quantity > 1) {
        return prev.map(i => i._id === mealId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i._id !== mealId);
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
      meals: cart.map(item => ({ mealId: item._id, quantity: item.quantity })),
      isOrderSent: false
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        alert("ההזמנה נשמרה בהצלחה!");
        setCart([]);
        localStorage.removeItem('user_shopping_cart');
      } else {
        alert("שגיאת שרת: לא ניתן היה לשמור את ההזמנה.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("שגיאת חיבור: וודא ששרת ה-Node.js פועל.");
    }
  };

  const totalPrice = cart.reduce((sum, item) =>
    sum + (item.mealprice * item.quantity), 0);
  const freeDef = 200 - totalPrice;

  return (
    <>
      {/* <h2 className="header" style={{ textAlign: 'center' }}> סל הקניות </h2> */}
      <div className="containerr">
        <div className="cart-container" >
        <h2 style={{margin:"0px 180px 0px 0px"}}>סל הקניות</h2>

      <hr />
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center' }}>הסל ריק כרגע.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.mealImage ? (
                  <img src={`/images/${item.mealImage}.jpg`} alt={item.mealname} style={{ width: '100px', height: '105px', objectFit: 'cover', borderRadius: '6px',border:'1px solid white' }} />
                ) : (
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#ccc', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>אין תמונה</div>
                )}
                <div>
                  <strong style={{fontSize:"larger"}}>{item.mealname}</strong>
                  <div style={{ color: '#666' ,fontSize:"larger"}}>מחיר: {item.mealprice} ₪</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => removeFromCart(item._id)} style={{ padding: '10px 15px',color:"white",backgroundColor:"black" , border: '2px solid #eee'}}>-</button>
                <span style={{ margin: '0 12px', fontWeight: 'bold' ,fontSize:"larger"}}>{item.quantity}</span>
                <button onClick={() => addToCart(item)} style={{ padding: '10px 15px' ,color:"white",backgroundColor:"black" , border: '3px solid #eee'}}>+</button>
              </div>
              <div style={{margin:"0px 10px 0px 0px"}}>סה"כ: ₪{item.mealprice * item.quantity}</div>
            </div>
          ))}

        </>
      )}
      </div>
        <div className="left"> 
          <h2 style={{ margin:"20px 180px 20px 20px"/*,backgroundColor:"rgb(30, 30, 30)"*/}}>סיכום הזמנה</h2>
      <hr />
          <h3 style={{ borderBottom: '2px solid #eee', margin: "20px", color: "rgb(142, 142, 142)" }}>סה"כ לתשלום: {totalPrice} ₪</h3>
          <h3 style={{ borderBottom: '2px solid #eee', margin: "20px", color: "rgb(142, 142, 142)" }}>מספר הפריטים בעגלה:{countOfMeals}</h3>
          <h3 style={{ borderBottom:'2px solid #eee',margin:"20px",color:"rgb(142, 142, 142)"}}>מחיר למשלוח:</h3>
          <h3 style={{ width: "400px", margin: "20px",color:"rgb(142, 142, 142)" }}>
            משלוחים חינם בקנייה מעל 200 ₪
          </h3>
          {totalPrice > 200 ? (
            <h3 style={{ width: "400px", margin: "20px",color:"#f0ca7c" }}>משלוח חינם</h3>
          ) : (
            <h3 style={{ width: "400px", margin: "20px",color:"#f0ca7c" }}>
              נשארו לך {freeDef} ₪ למשלוח חינם
            </h3>
          )}
          <h3 style={{ width: "400px", borderBottom: "2px solid #eee", margin: "20px",color:"rgb(142, 142, 142)" }}>
          חשבונית עבור רכישתך תישלח לאחר האריזה.
          </h3>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleCheckOut}
              style={{backgroundColor: '#f0ca7c',color: 'white',padding: '15px 20px',width: '400px',border: 'none',cursor: 'pointer',
                fontSize: '18px',borderRadius: '5px',fontWeight: 'bold',margin: '10px 50px 0px 0px'
              }}
            >
              בצע הזמנה
              </button>
          </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
