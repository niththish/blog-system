const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiry = process.env.JWT_EXPIRY;
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
};

const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    throw new Error("invalid token");
  }
};

module.exports = { signToken, verifyToken };
