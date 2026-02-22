import Modal from "@mui/material/Modal";
import { Paper, Box, TextField, Button } from "@mui/material";
import React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { deleteMealFromServer } from "../api/mealService";


// יוצרים Theme RTL בלי שום outerTheme
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light", // אפשר גם "dark"
  },
});

// Cache עם RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});


function EditModal({ open, onClose, meal }) {
    if (!meal) return null;
    const handleEdit = async (data) => {
      try {
        const response = await addMeal(data);
        console.log("עריכת מוצר הצליחה:", response.data);
        alert("עריכת מוצר הצליחה!");
        reset({ userName:"",userLastName:"",userEmail:"",userPassword:""});
      } catch (error) {
        console.error("אי אפשר לערוך מוצר "+" "+error.response?.data?.message);
        alert("שגיאה בעריכת מוצר ");
      }
    };
    return (
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.64)"} }}
      >
                    <Box
        sx={{
                      border: "1px solid white",
                      width: 550,
                      height: 550,
                      marginRight: 60,
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgb(0, 0, 0)",
                      direction: "rtl",
                    borderRadius: 2,
                    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.068), 0 0px 7px",
        }}
      >
          <h2 style={{ color: "white" ,marginTop:10,marginRight:200,marginBottom:0,padding:0}}>עריכת המוצר</h2>
          <div style={{ color: "white" ,marginTop:0,marginBottom:0,marginRight:120}}>
          מלאו את הטופס למטה כדי לערוך את המוצר
          </div>
      <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ width: 450, margin: "25px 50px 0px 0px" }}>
          <TextField label="שם המוצר" defaultValue={meal.mealname} variant="outlined" fullWidth InputLabelProps={{
          style: { color: "#f0ca7c", textAlign: "right", right: 0, left: "auto" },}}
          InputProps={{ style: { color: "white", textAlign: "right" }, }}
            sx={{"& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "white",},
                "&:hover fieldset": {borderColor: "white",},
                "&.Mui-focused fieldset": {borderColor: "#f0ca7c",},
              },}}/></div>
      </ThemeProvider>
                </CacheProvider>
                
                <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ width: 450, margin: "25px 50px 0px 0px" }}>
          <TextField label="תיאור המוצר" defaultValue={meal.mealDescription} variant="outlined" fullWidth InputLabelProps={{
          style: { color: "#f0ca7c", textAlign: "right", right: 0, left: "auto" },}}
          InputProps={{ style: { color: "white", textAlign: "right" }, }}
            sx={{"& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "white",},
                "&:hover fieldset": {borderColor: "white",},
                "&.Mui-focused fieldset": {borderColor: "#f0ca7c",},
              },}}/></div>
      </ThemeProvider>
                </CacheProvider>
                
                <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ width: 450, margin: "25px 50px 0px 0px" }}>
          <TextField label="מחיר המוצר" defaultValue={meal.mealprice} variant="outlined" fullWidth InputLabelProps={{
          style: { color: "#f0ca7c", textAlign: "right", right: 0, left: "auto" },}}
          InputProps={{ style: { color: "white", textAlign: "right" }, }}
            sx={{"& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "white",},
                "&:hover fieldset": {borderColor: "white",},
                "&.Mui-focused fieldset": {borderColor: "#f0ca7c",},
              },}}/></div>
      </ThemeProvider> 
                </CacheProvider>
                
                <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ width: 450, margin: "25px 50px 0px 0px" }}>
          <TextField label="תמונת המוצר" defaultValue={meal.mealImage} variant="outlined" fullWidth InputLabelProps={{
          style: { color: "#f0ca7c", textAlign: "right", right: 0, left: "auto" },}}
          InputProps={{ style: { color: "white", textAlign: "right" }, }}
            sx={{"& .MuiOutlinedInput-root": {"& fieldset": {borderColor: "white",},
                "&:hover fieldset": {borderColor: "white",},
                "&.Mui-focused fieldset": {borderColor: "#f0ca7c",},
              },}}/></div>
      </ThemeProvider>
                </CacheProvider>
                

        {/* כפתור שליחה */}
        <Button type="submit" fullWidth sx={{marginTop:2, height: 50,fontSize: 20,backgroundColor: "rgb(240 202 124)",color: "white",width: '450px'
          ,margin:"50px 50px 0px 0px"}}variant="contained" onClick={handleEdit}>
          עריכת המוצר
                </Button>
              </Box>
          </Modal>
    );
  }
  export default EditModal;
