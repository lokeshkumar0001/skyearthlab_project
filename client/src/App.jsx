import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthContext } from './hooks/useAuthContext.jsx'

// pages & components
// import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import { useAuthContext } from "./hooks/useAuthContext";
// import Signup from './pages/Signup'
// import Navbar from './components/Navbar'

function App() {
  const { user ,loading} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route exact path="/login" element={!loading && (user ? <Navigate to="/dashboard" /> : <Login />)} />
            <Route exact path="/signup" element={!loading && (user ? <Navigate to="/dashboard" /> : <Signup />)} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
