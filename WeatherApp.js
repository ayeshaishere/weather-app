import { Box, Container } from "@mui/material"
import WeatherSearchForm from "./WeatherSearchForm"
import WeatherDisplay from "./WeatherDisplay"

export default function WeatherApp() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <WeatherSearchForm />
      </Box>

      <Box>
        <WeatherDisplay />
      </Box>
    </Container>
  )
}
