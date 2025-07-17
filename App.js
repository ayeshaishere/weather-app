import { Provider } from "react-redux"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { store } from "./store/store"
import WeatherApp from "./components/WeatherApp"
import { useSelector } from "react-redux"
import "./App.css" // Add this import

function ThemedApp() {
  const themeMode = useSelector((state) => state.theme.mode)

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: themeMode === "light" ? "#f0f2f5" : "#121212",
        paper: themeMode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: themeMode === "light" ? "0 4px 20px rgba(0,0,0,0.1)" : "0 4px 20px rgba(255,255,255,0.05)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="weather-app">
        <WeatherApp />
      </div>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  )
}