import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  currentWeather: null,
  loading: false,
  error: null,
  searchHistory: [],
}

// Mock weather API call
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city, { rejectWithValue }) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate error for testing
    if (city.toLowerCase() === "error") {
      throw new Error("City not found")
    }

    // Mock weather data
    const weatherIcons = ["☀️", "⛅", "🌧️", "❄️", "🌤️"]
    const descriptions = ["Sunny", "Partly Cloudy", "Rainy", "Snowy", "Clear"]

    const mockWeather = {
      city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
      temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      icon: weatherIcons[Math.floor(Math.random() * weatherIcons.length)],
    }

    return mockWeather
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      const city = action.payload
      if (!state.searchHistory.includes(city)) {
        state.searchHistory.unshift(city)
        state.searchHistory = state.searchHistory.slice(0, 5)
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload
        state.error = null
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { addToHistory, clearError } = weatherSlice.actions
export default weatherSlice.reducer
