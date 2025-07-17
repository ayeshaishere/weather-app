"use client"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField, Button, Box, Card, CardContent, Typography, IconButton, Chip, Stack, Alert } from "@mui/material"
import { Search, History, DarkMode, LightMode } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeather, addToHistory } from "../store/weatherSlice"
import { toggleTheme } from "../store/themeSlice"

const validationSchema = Yup.object({
  city: Yup.string()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name must be less than 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "City name can only contain letters and spaces")
    .required("City name is required"),
})

export default function WeatherSearchForm() {
  const dispatch = useDispatch()
  const { loading, searchHistory, error } = useSelector((state) => state.weather)
  const { mode } = useSelector((state) => state.theme)

  const handleSubmit = (values, { resetForm }) => {
    dispatch(fetchWeather(values.city))
    dispatch(addToHistory(values.city))
    resetForm()
  }

  const handleHistoryClick = (city) => {
    dispatch(fetchWeather(city))
  }

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            🌤️ Weather App
          </Typography>
          <IconButton onClick={() => dispatch(toggleTheme())} color="primary" size="large">
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>

        <Formik initialValues={{ city: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <Box display="flex" gap={2} mb={2}>
                <Field name="city">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Enter city name"
                      variant="outlined"
                      fullWidth
                      error={touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      placeholder="e.g., New York, London, Tokyo"
                      disabled={loading}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || !isValid || !dirty}
                  startIcon={<Search />}
                  sx={{ minWidth: 140, height: 56 }}
                  size="large"
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {searchHistory.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              <History fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              Recent Searches
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {searchHistory.map((city, index) => (
                <Chip
                  key={index}
                  label={city}
                  onClick={() => handleHistoryClick(city)}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1, cursor: "pointer" }}
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
