const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { getResume, uploadResume, deleteResume } = require("./resume.service");

const get = asyncHandler(async (req, res) => {
  const resume = getResume();
  res.status(200).json(new ApiResponse(200, resume, "Resume fetched successfully"));
});

const upload = asyncHandler(async (req, res) => {
  const resume = await uploadResume(req.file);
  res.status(200).json(new ApiResponse(200, resume, "Resume uploaded successfully"));
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteResume();
  res.status(200).json(new ApiResponse(200, result, "Resume deleted successfully"));
});

module.exports = { get, upload, remove };