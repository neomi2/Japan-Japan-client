import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import React from "react";
import { addMeal } from "../api/mealService";

export default function addproduct() {
  const { register,handleSubmit,formState: { errors },reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addMeal(data);
      console.log("הרשמה מוצר הצליחה:", response.data);
      alert("הרשמת מוצר הצליחה!"); // הודעה למשתמש
      reset({ userName:"",userLastName:"",userEmail:"",userPassword:""});
    } catch (error) {
      console.error("אי אפשר ליצור מוצר חדש"+" "+error.response?.data?.message);
      alert("שגיאה ביצירת מוצר חדש");
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",
        backgroundImage: "url('../images/background.jpg')",backgroundSize: "cover",backgroundPosition: "center",
      }}>
      <Paper elevation={6} sx={{ p: 4,borderRadius: 3,width: 400, height: 525,backgroundColor: "rgba(0, 0, 0, 0.23)",  maxWidth: 500,marginRight: "500px",mt: 5,
        border: "1px solid white",marginTop:12,marginBottom:2
      }}>
               <h2 style={{ color: "white" ,marginTop:0,marginBottom:0,padding:0}}>הוספת מוצר לאתר</h2>
          <div style={{ color: "white" ,marginTop:0,marginBottom:0}}>
          מלאו את הטופס למטה כדי ליצור מוצר חדש
          </div>
                  {/* שם */}
        <Box sx={{ mb: 3 ,backgroundColor: "rgba(0, 0, 0, 0.2)",marginTop:2,marginBottom:1,borderRadius:2,border: "1px solid white"}}>
          <TextField fullWidth label="שם המוצר" type="text" error={!!errors.mealname}  helperText={errors.mealname && " יש להזין שם המוצר"}
              {...register("mealname", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>
        {/* תיאור המוצר*/}
      <Box sx={{ mb: 3, backgroundColor: "rgba(0, 0, 0, 0.2)", marginTop:2, borderRadius:2, border: "1px solid white" }}>
      <TextField fullWidth label="תיאור המוצר" type="text" error={!!errors.mealDescription} helperText={errors.mealDescription && "יש להזין תיאור המוצר"}
              {...register("mealDescription", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>
{/* מחיר */}
<Box
  sx={{mb: 3,backgroundColor: "rgba(0, 0, 0, 0.14)",marginTop: 2,
    marginBottom: 1,borderRadius: 2,border: "1px solid white"}}>
  <TextField fullWidth label="מחיר" type="number" error={!!errors.mealprice} helperText={errors.mealprice && "יש להזין מחיר תקין"}
    {...register("mealprice", {required: true,min: 1,valueAsNumber: true})}
    InputProps={{ style: { color: "white" } }}
    InputLabelProps={{style: { color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
</Box>


        {/* תמונת המוצר*/}
        <Box sx={{ mb: 3, backgroundColor: "rgba(0, 0, 0, 0.2)", marginTop:2, borderRadius:2, border: "1px solid white" }}>
      <TextField fullWidth label="תמונת המוצר" type="text" error={!!errors.mealImage} helperText={errors.mealImage && "יש להזין תמונת המוצר"}
              {...register("mealImage", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>

                  {/* קטגוריה*/}
      <Box sx={{ mb: 3, backgroundColor: "rgba(0, 0, 0, 0.2)", marginTop:2, borderRadius:2, border: "1px solid white" }}>
      <TextField fullWidth label="קטגוריה" type="text" error={!!errors.mealCategory} helperText={errors.mealCategory && "יש להזין תיאור המוצר"}
              {...register("mealCategory", { required: true })}
              InputProps={{style: { color: "white" }}}
              InputLabelProps={{style: {  color: "white", right: 30, left: "auto", textAlign: "right" }}}/>
          </Box>

        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:2, height: 50,fontSize: 20,backgroundColor: "rgb(240 202 124)",color: "white",
          }}variant="contained">
          יצירת המוצר
        </Button>
      </Paper>
      </Box>
    </form>
  );
}
