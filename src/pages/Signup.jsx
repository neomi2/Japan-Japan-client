
import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import "../css/Signup.css";
import React from "react";
import { signUpUser } from "../api/userService";

export default function Signup() {
  const { register,handleSubmit,formState: { errors },reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signUpUser(data);
      console.log("הרשמה הצליחה:", response.data);
      alert("הרשמת המשתמש הצליחה!"); // הודעה למשתמש
      reset({ userName:"",userLastName:"",userEmail:"",userPassword:""});
    } catch (error) {
      console.error("אי אפשר להירשם"+" "+error.response?.data?.message);
      alert("שגיאה בהרשמה");
    }
  };
 


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",
        backgroundImage: "url('../images/background.jpg')",backgroundSize: "cover",backgroundPosition: "center",
      }}>
      <Paper elevation={6} sx={{ p: 4,borderRadius: 3,width: 400, height: 450,backgroundColor: "rgba(0, 0, 0, 0.23)",  maxWidth: 500,marginRight: "500px",mt: 5,
        border: "1px solid white"
      }}>
               <h2 style={{ color: "white" ,marginTop:0}}>
         הירשם</h2>
          <div style={{ color: "white" }}>
          מלאו את הטופס למטה כדי להירשם לאתר
          </div>
                  {/* שם */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.2)",marginTop:2,marginBottom:1,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="שם פרטי" type="text" error={!!errors.userName}  helperText={errors.userName && "יש להזין שם"}
              {...register("userName", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>
        {/* שם משפחה */}
      <Box sx={{ mb: 3, backgroundColor: "rgba(0, 0, 0, 0.2)", marginTop:2, borderRadius:2, border: "1px solid white" }}>
      <TextField fullWidth label="שם משפחה" type="text" error={!!errors.userLastName} helperText={errors.userLastName && "יש להזין שם משפחה"}
              {...register("userLastName", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>
        {/* מייל */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.14)",marginTop:2,marginBottom:1,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="מייל" error={!!errors.userEmail} helperText={errors.userEmail && "יש להזין מייל תקין"}
              {...register("userEmail", { required: true, pattern: /^\S+@\S+$/, })}
              InputProps={{style: { color: "white" }}}
            InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
        </Box>

        {/* סיסמה */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.2)",marginTop:2,marginBottom:0,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="סיסמה" type="password" error={!!errors.userPassword} helperText={errors.userPassword && "סיסמה 6–12 תווים"}
            {...register("userPassword", {required: true,minLength: 6,maxLength: 12,})}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
        </Box>

        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:3, height: 50,fontSize: 20,backgroundColor: "rgb(240 202 124)",color: "white",
          }}variant="contained">
          התחברות
        </Button>
      </Paper>
      </Box>
    </form>
  );
}
