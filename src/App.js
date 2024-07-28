import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeList from './components/EmloyeeList';
import EmployeeEdit from './components/EmployeeEdit';
import { useAuth } from './context/AuthContext';
import axios from "./config/axios"
import { useEffect } from 'react';

function App() {
  const { user, handleLogout, handleLogin } = useAuth(); // Use custom hook to access context
  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const response = await axios.get('/user/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        handleLogin(response.data);
      })();
    }
  }, []);

  console.log("User State:", user); // Debug user state

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |
        {!user?.isLoggedIn ? (
          <>
            <Link to="/login">Login</Link> |
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/createEmployee">Create Employee</Link> |
                <Link to="/employeeList">Employee List</Link> |
                <Link to="/employees/edit/:id">Employee Edit</Link> |
              </>
            )}
            <Link to="/" onClick={() => {
              localStorage.removeItem("token");
              handleLogout(); // Use handleLogout to update context
            }}>Logout</Link> |
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createEmployee" element={<EmployeeCreate />} />
        <Route path="/employeeList" element={<EmployeeList />} />
        <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
      </Routes>
    </div>
  );
}

export default App;
