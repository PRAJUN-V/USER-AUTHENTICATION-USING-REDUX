import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/action/action';
import { logout } from '../features/auth/logoutSlice'; // Import logout action from logoutSlice
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate('/add-user');
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8000/api/delete_user/${userId}/`)
      .then(response => {
        console.log('User deleted successfully:', response.data);
        dispatch(fetchUsers());
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleLogout = () => {
    console.log("logout performed");
    dispatch(logout()); // Dispatch the logout action
    navigate("/login");
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <h1>Users</h1>
      <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
      <button onClick={handleAddUserClick}>Add User</button>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/user_edit/${user.id}`} className="btn btn-primary mr-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
