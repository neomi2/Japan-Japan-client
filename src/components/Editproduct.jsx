import Modal from "@mui/material/Modal";
import { Paper, Box, TextField, Button } from "@mui/material";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { deleteMealFromServer } from "../api/mealService";
import { useForm } from "react-hook-form";
import { updateMeal } from "../api/mealService";
import { useEffect } from "react";

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

function EditModal({ open, onClose, meal, setMeals }) {
  if (!meal) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (meal) {
      reset({
        mealname: meal.mealname,
        mealDescription: meal.mealDescription,
        mealprice: meal.mealprice,
        mealImage: meal.mealImage,
      });
    }
  }, [meal, reset]);

  const onSubmit = async (data) => {
    try {
      await updateMeal(meal?._id, data);

      alert("עריכת מוצר הצליחה!");
      console.log("meal after modal:", meal);
      setMeals((prevMeals) =>
        prevMeals.map((m) => (m._id === meal._id ? { ...m, ...data } : m))
      );
      onClose();
    } catch (error) {
      console.error(error);
      alert("שגיאה בעריכת מוצר");
      onClose();
    }
    };
    const cancelEdit = () => {
        reset({
          mealname: meal.mealname,
          mealDescription: meal.mealDescription,
          mealprice: meal.mealprice,
          mealImage: meal.mealImage,
        });
        onClose();
      };
      

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.64)" } }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          border: "1px solid white",
          width: 550,
          height: 600,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(0, 0, 0)",
          direction: "rtl",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(255, 255, 255, 0.068), 0 0px 7px",
          margin: "50px 500px 0px 0px",
        }}
      >
        <h2
          style={{
            color: "white",
            marginTop: 10,
            marginRight: 200,
            marginBottom: 0,
            padding: 0,
          }}
        >
          עריכת המוצר
        </h2>
        <div
          style={{
            color: "white",
            marginTop: 0,
            marginBottom: 0,
            marginRight: 120,
          }}
        >
          מלאו את הטופס למטה כדי לערוך את המוצר
        </div>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div dir="rtl" style={{ width: 450, margin: "25px 50px 0px 0px" }}>
              <Box sx={{ mb: 2, margin: "10px 0px 10px 0px" }}>
                <TextField
                  fullWidth
                  label="שם המוצר"
                  type="text"
                  error={!!errors.mealname}
                  helperText={errors.mealname && "יש להזין שם המוצר"}
                  {...register("mealname", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                      textAlign: "right",
                      right: 0,
                      left: "auto",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
            </div>

            <div dir="rtl" style={{ width: 450, margin: "8px 50px 0px 0px" }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="תיאור המוצר"
                  type="text"
                  multiline
                  rows={3}
                  error={!!errors.mealDescription}
                  helperText={errors.mealDescription && "יש להזין תיאור המוצר"}
                  {...register("mealDescription", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                      textAlign: "right",
                      right: 0,
                      left: "auto",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
            </div>

            <div dir="rtl" style={{ width: 450, margin: "8px 50px 0px 0px" }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="מחיר"
                  type="number"
                  error={!!errors.mealprice}
                  helperText={errors.mealprice && "יש להזין מחיר תקין"}
                  {...register("mealprice", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                      textAlign: "right",
                      right: 0,
                      left: "auto",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
            </div>
            <div dir="rtl" style={{ width: 450, margin: "8px 50px 0px 0px" }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="תמונת המוצר"
                  type="text"
                  error={!!errors.mealImage}
                  helperText={errors.mealImage && "יש להזין תמונת המוצר"}
                  {...register("mealImage", { required: true })}
                  InputProps={{ style: { color: "white", textAlign: "right" } }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                      textAlign: "right",
                      right: 0,
                      left: "auto",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Box>
            </div>
          </ThemeProvider>
        </CacheProvider>

              <div style={{display:"flex"}}>
        <Button
          fullWidth
          sx={{
            width: 50,
            margin: "30px 50px 0px 0px",
            height: 50,
            fontSize: 20,
            backgroundColor: "rgb(240 202 124)",
              backgroundColor: "white",
            color:"black"
          }}
          variant="contained" onClick={cancelEdit}
        >
          ביטול
        </Button>
        {/* כפתור שליחה */}
        <Button
          type="submit"
          fullWidth
          sx={{
            width: 400,
            margin: "30px 5px 0px 50px",
            height: 50,
            fontSize: 20,
            backgroundColor: "rgb(240 202 124)",
            color: "white",
          }}
          variant="contained"
        >
          עריכת המוצר
                  </Button>
              </div>
      </form>
    </Modal>
  );
}
export default EditModal;
