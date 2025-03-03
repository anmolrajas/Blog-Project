import axios from 'axios';
import BackendServer from '../config/config'

const addBlog = async (blogData) => {
  try {
    console.log("In service:- ", blogData);
    const response = await axios.post(`${BackendServer}/api/blogs/create`, blogData);
    console.log("Response in service file:- ", response);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
};

const getBlogs = async () => {
  try {
    const response = await axios.get(`${BackendServer}/api/blogs/list`);
    console.log("Response in service file:- ", response);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error.response?.data || error.message);
    throw error;
  }
}

export default { addBlog, getBlogs };
