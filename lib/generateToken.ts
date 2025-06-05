import jwt from "jsonwebtoken";

export function generateToken(data) {
  const token = jwt.sign(data, process.env.SECRET_JWT);
  return token;
}

export function decodeToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_JWT);
  } catch (error) {
    return null;
  }
}
