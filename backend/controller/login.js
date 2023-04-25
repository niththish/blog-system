const adminSchema = require("../model/admin");
const { signToken, verifyToken } = require("../config/token");

const LoginController = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next("both username & password is required");
  }

  const admin = await adminSchema.findOne({ username });
  if (admin) {
    if (admin.password === password) {
      const token = signToken({ id: admin._id });
      res.json({ staus: "login successfull", token });
    } else {
      return next("password is wrong");
    }
  } else {
    return next("user not found");
  }
};

const LoginVerifyController = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next("token not present");
  }
  try {
    verifyToken(token);
    res.json({ status: "admin verified" });
  } catch (err) {
    return next("invalid token");
  }
};

module.exports = { LoginController, LoginVerifyController };
