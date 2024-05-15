import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/logoutSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout performed");
    if (user && user.id) {
      console.log("user ID:", user.id);
      dispatch(logout(user.id));
      navigate("/login");
    } else {
      console.log("User ID not available");
    }
  };
  // useEffect(() => {
  //   console.log("user",user)
  // },[user])
  const handleEditProfile = () => {
    if (user && user.id) {
      navigate(`/edit_profile/${user.id}`);
      console.log("id=", user.id);
    } else {
      console.log("User ID not available");
    }
  };

  return (
    <div className="container">
      <div className="welcome-box">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : user ? (
          <>
            <h1 className="text-center">Profile</h1>
            <h2 className="text-center">Welcome {user.username} </h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            { user.profile ? (
              <img
              src= {`http://127.0.0.1:8000/${user.profile}`}
              alt="Profile Photo"
              style={{height:"100px"}}
            />
            ) : (
              <img
              src="data:image/jpeg;base64,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"
              alt="No Profile Photo"
            />
            ) }
            
            <div className="d-flex justify-content-between my-3">
              <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
              <button className="btn btn-secondary" onClick={handleEditProfile}>Edit Profile</button>
            </div>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
