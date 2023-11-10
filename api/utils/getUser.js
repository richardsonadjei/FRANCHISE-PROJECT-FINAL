// In a separate file (e.g., auth.js)
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { errorHandler } from '../utils/error.js';

export const getUser = () => {
  const token = Cookies.get('access_token');

  if (!token) {
    // Handle the case where the token is not available
    console.error('Token not found in the cookie');
    return null;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
