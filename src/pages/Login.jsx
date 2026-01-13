// import "../css/Login.css";

// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="מייל" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
//       <input type="password"placeholder="סיסמה"{...register("password", {required: true,minLength: 6,maxLength: 12})}/>
//       <input type="submit" />
//     </form>
//   );
// }

import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import "../css/Login.css";
import React from "react";
import { Link } from "react-router-dom";

import { loginUser } from "../api/userService";
export default function Login() {
  const { register,handleSubmit,formState: { errors },} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signupUser(data);
      console.log("התחברות הצליחה:", response.data);
    } catch (error) {
      console.error("שגיאה בהתחברות:", error.response?.data);
    }
  };
   // כאן תשלחי לשרת עם axios צריך לעשות רק את השליחה של הנתונים לדטה בייס וגם עיצוב יפה


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
                <Box
            sx={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",
              backgroundImage: "url('../images/background.jpg')",backgroundSize: "cover",backgroundPosition: "center",
            }}>
      <Paper elevation={6} sx={{ p: 4,borderRadius: 3,color:"white" ,width: 400, height: 400,backgroundColor: "rgba(0, 0, 0, 0.16)",  maxWidth: 500,marginRight: "500px",mt: 5,
        border: "1px solid white"
      }}>
               <h2 style={{ color: "white" ,marginTop:0}}>
          התחברות לחשבון</h2>
          <div style={{ color: "white" }}>
          מלאו את הטופס למטה כדי להתחבר לחשבונכם
        </div>
        {/* מייל */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.22)",marginTop:5,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="מייל" error={!!errors.email} helperText={errors.email && "יש להזין מייל תקין"}
            {...register("email", {required: true,pattern: /^\S+@\S+$/,})}
            InputProps={{style: { color: "white" }}}
            InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
        </Box>

        {/* סיסמה */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.2)",marginTop:5,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="סיסמה" type="password" error={!!errors.password} helperText={errors.password && "סיסמה 6–12 תווים"}
            {...register("password", {required: true,minLength: 6,maxLength: 12,})}
            InputProps={{style: { color: "white" }}}
            InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
        </Box>
        <div style={{ color: "white" }}>
  אין לך חשבון?
  <Link to="/signup" style={{ color: "rgb(240 202 124)", marginLeft: "5px" }}>
    הרשמה
  </Link>
</div>


        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:2, height: 50,fontSize: 20,backgroundColor: "rgb(240 202 124)",color: "white",
          }}variant="contained">
          התחברות
        </Button>
        </Paper>
      </Box>
    </form>
  );
}
