const { User } = require("../db");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const userValidationSchema = zod.object({
  username: zod.string().min(3).max(15),
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string().min(8),
});

const updateBody = zod.object({
  username: zod.string().min(3).max(15).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(8).optional(),
});

async function userValidate(req, res, next) {
  try {
    const validatedData = userValidationSchema.parse(req.body);
    const { username, email } = validatedData;

    const existing_user = await User.findOne({
      // check either username or email
      $or: [{ username }, { email }],
    });
    if (existing_user) {
      return res.status(400).json({
        message: "User already exists with this username or email",
      });
    }
    req.validatedData = validatedData;
    next();
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({
        msg: "Invalid inputs",
        errors: error.errors,
      });
    }
    return res.status(500).json({
      msg: "server error",
    });
  }
}

async function userCheck(req, res, next) {
  try {
    const { identifier, password } = req.body;
    const existing_user = await User.findOne({
      $or: [{ username: identifier}, { email:identifier }],
    });
    if (!existing_user) {
      return res.status(401).json({ message: "user not found" });
    }
    const hashedPassword = existing_user.password;
    const matchPassword = await bcrypt.compare(password, hashedPassword);
    if (!matchPassword) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    req.id = existing_user._id;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "The password that you've entered is incorrect.",
    });
  }
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("bearer ")) {
    return res.status(401).json({ msg: "Invalid token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const userVerify = jwt.verify(token, JWT_SECRET);
    req.id = userVerify.id;
    next();
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid User",
    });
  }
}

function validateUpdateUser(req, res, next) {
  try {
    const validatedData = updateBody.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: error.errors
    });
  }
}


module.exports = {
  userCheck,
  userValidate,
  authMiddleware,
  validateUpdateUser
};
