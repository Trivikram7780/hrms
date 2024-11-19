import './App.css';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile';
import AdminPortal from './components/AdminPortal';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path = '/login' Component={Login} />

      <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminPortal" element={<AdminPortal />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
