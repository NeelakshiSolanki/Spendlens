import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AuditPage from "./pages/AuditPage"

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/audit/:id"
        element={<AuditPage />}
      />

    </Routes>
  )
}

export default App