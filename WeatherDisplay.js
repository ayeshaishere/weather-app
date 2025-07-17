import { Card, CardContent, Typography, Box, Grid, Chip, LinearProgress, Alert, Paper } from "@mui/material"
import { Thermostat, Water, Air, LocationOn } from "@mui/icons-material"
import { useSelector } from "react-redux"

export default function WeatherDisplay() {
  const { currentWeather, loading, error } = useSelector((state) => state.weather)

  if (loading) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom align="center">
            🔍 Loading weather data...
          </Typography>
          <LinearProgress sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        <Typography variant="h6">Weather Error</Typography>
        <Typography>{error}</Typography>
      </Alert>
    )
  }

  if (!currentWeather) {
    return (
      <Card elevation={3} sx={{ textAlign: "center", py: 6 }}>
        <CardContent>
          <Typography variant="h2" sx={{ mb: 2 }}>
            🌍
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Search for a city to see weather information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter any city name above to get started!
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const weatherStats = [
    {
      label: "Temperature",
      value: `${currentWeather.temperature}°C`,
      icon: <Thermostat />,
      color: "error",
    },
    {
      label: "Humidity",
      value: `${currentWeather.humidity}%`,
      icon: <Water />,
      color: "info",
    },
    {
      label: "Wind Speed",
      value: `${currentWeather.windSpeed} km/h`,
      icon: <Air />,
      color: "success",
    },
  ]

  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <LocationOn color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" component="h2" fontWeight="bold">
            {currentWeather.city}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box textAlign="center" p={3}>
              <Typography variant="h1" component="div" sx={{ fontSize: "6rem", mb: 2 }}>
                {currentWeather.icon}
              </Typography>
              <Typography variant="h2" component="div" fontWeight="bold" color="primary" gutterBottom>
                {currentWeather.temperature}°C
              </Typography>
              <Chip
                label={currentWeather.description}
                color="primary"
                variant="filled"
                size="large"
                sx={{ fontSize: "1rem", py: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Weather Details
            </Typography>

            <Grid container spacing={2}>
              {weatherStats.map((stat, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Box color={`${stat.color}.main`} sx={{ mr: 2 }}>
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {stat.label}
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
