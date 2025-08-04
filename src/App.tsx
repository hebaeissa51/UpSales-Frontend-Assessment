import { AuthProvider } from "./context/AuthProvider"
import Router from "./routes/Router"

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
