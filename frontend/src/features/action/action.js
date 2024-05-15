import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/api/users/');
    dispatch(setUsers(response.data));
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users,
});