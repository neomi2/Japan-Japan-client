import { useForm } from "react-hook-form";
import { Paper, Box, TextField, Button } from "@mui/material";
import React from "react";
import { addMeal } from "../api/mealService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// יצירת cache ל־RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin], 
});

// יצירת נושא עם RTL
const theme = createTheme({ 
  direction: "rtl",
  palette: { mode: "light" },
});
export default function addproduct() {
  const { register,handleSubmit,formState: { errors },reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addMeal(data);
      console.log("הרשמה מוצר הצליחה:", response.data);
      alert("הרשמת מוצר הצליחה!");
      reset({ userName:"",userLastName:"",userEmail:"",userPassword:""});
    } catch (error) {
      console.error("אי אפשר ליצור מוצר חדש"+" "+error.response?.data?.message);
      alert("שגיאה ביצירת מוצר חדש");
    }
  };



  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",
        backgroundImage: "url('../images/background.jpg')",backgroundSize: "cover",backgroundPosition: "center",
      }}>
      <Paper elevation={6} sx={{ p: 4,borderRadius: 3,width: 400, height: 525,backgroundColor: "rgba(0, 0, 0, 0.23)",  maxWidth: 500,mt: 5,
        border: "1px solid white",margin:"90px 0px 15px 500px"
      }}>
               <h2 style={{ color: "white" ,marginTop:0,marginBottom:0,padding:0}}>הוספת מוצר לאתר</h2>
          <div style={{ color: "white" ,marginTop:0,marginBottom:0}}>
          מלאו את הטופס למטה כדי ליצור מוצר חדש
          </div>
                  {/* שם */}
                  <Box sx={{ mb: 2,margin:"10px 0px 10px 0px"}}>
                <TextField
                  fullWidth
                  label="שם המוצר"
                  type="text"
                  error={!!errors.mealname}
                  helperText={errors.mealname && "יש להזין שם המוצר"}
                  {...register("mealname", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "white", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
        {/* תיאור המוצר*/}
        <Box sx={{ mb: 2}}>
                <TextField fullWidth label="תיאור המוצר" type="text"multiline rows={3}
                  error={!!errors.mealDescription}
                  helperText={errors.mealDescription && "יש להזין תיאור המוצר"}
                  {...register("mealDescription", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "white", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
{/* מחיר */}
<Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label="מחיר"
                  type="number"
                  error={!!errors.mealprice}
                  helperText={errors.mealprice && "יש להזין מחיר תקין"}
                  {...register("mealprice", { required: true, min: 1, valueAsNumber: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "white", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>


        {/* תמונת המוצר*/}
        <Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label="תמונת המוצר"
                  type="text"
                  error={!!errors.mealImage}
                  helperText={errors.mealImage && "יש להזין תמונת המוצר"}
                  {...register("mealImage", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "white", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>

                  {/* קטגוריה*/}
                  <Box sx={{ mb: 2}}>
                <TextField
                  fullWidth
                  label="קטגוריה"
                  type="text"
                  error={!!errors.mealCategory}
                  helperText={errors.mealCategory && "יש להזין קטגוריה"}
                  {...register("mealCategory", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{ style: { color: "white", textAlign: "right", right: 0, left: "auto" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>

        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:2, height: 50,fontSize: 20,backgroundColor: "rgb(240 202 124)",color: "white",
          }}variant="contained">
          יצירת המוצר
        </Button>
      </Paper>
      </Box>
      </form>
      </ThemeProvider>
    </CacheProvider>
  );
}
