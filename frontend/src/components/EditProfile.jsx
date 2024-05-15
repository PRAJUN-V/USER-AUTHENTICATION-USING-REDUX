import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAsync } from "../features/auth/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user.id;

  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    selectedImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
    // Clear previous errors
    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e) => {
    setEditedUser({ ...editedUser, selectedImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!editedUser.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!editedUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("username", editedUser.username);
    formData.append("email", editedUser.email);
    if (editedUser.selectedImage) {
      formData.append("profile_pic", editedUser.selectedImage);
    }

    try {
      await dispatch(updateProfileAsync(userId, formData));
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="edit-profile-box">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={editedUser.username}
              onChange={handleChange}
            />
            {errors.username && <span className="text-danger">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={editedUser.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
            <img
              src={`http://127.0.0.1:8000/${user.profile}`}
              alt="Current Profile"
              style={{ height: "70px", width: "auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_pic">Profile Picture</label>
            <input
              type="file"
              id="profile_pic"
              accept="image/*"
              name="profile_pic"
              onChange={handleImageChange}
            />
            {editedUser.selectedImage && (
              <img
                src={URL.createObjectURL(editedUser.selectedImage)}
                alt="Selected Profile"
                style={{ height: "50px", width: "auto" }}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
