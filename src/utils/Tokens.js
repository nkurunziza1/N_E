import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config';

const generateToken = (data, options) => {
  const token = Jwt.sign({ data }, process.env.JWT_SECRET, options);
  return token;
};
const verifyToken = (token) => {
  const obj = Jwt.verify(token, process.env.JWT_SECRET);
  return obj;
};
export { generateToken, verifyToken };