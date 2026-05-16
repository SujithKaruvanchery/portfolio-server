const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { registerAdmin, loginAdmin, getMe } = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await registerAdmin(req.body);
  res.status(201).json(new ApiResponse(201, result, "Admin registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const result = await loginAdmin(req.body);
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

const me = asyncHandler(async (req, res) => {
  const user = await getMe(req.user.id);
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

module.exports = { register, login, me };