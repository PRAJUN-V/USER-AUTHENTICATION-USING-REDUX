// App.js

import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import SignUpForm from "./components/SignUpForm";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import EditUser from "./components/EditUser";
import './App.css'
import EditProfile from "./components/EditProfile";
import AdminLoginForm from "./components/adminLoginForm";
import { useReducer } from "react";
import Add_user from "./components/Add_user";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user_edit/:userId" element={<EditUser />} />
        <Route path="/edit_profile/:userId" element={<EditProfile />} />
        <Route path="/admin" element={<AdminLoginForm />} />
        <Route path="/add-user" element={<Add_user />} />

      
      </Routes>
    </Provider>
  );
};

export default App;
