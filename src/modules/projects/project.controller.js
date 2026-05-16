const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("./project.service");

const getAll = asyncHandler(async (req, res) => {
  const projects = await getAllProjects();
  res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const getFeatured = asyncHandler(async (req, res) => {
  const projects = await getFeaturedProjects();
  res.status(200).json(new ApiResponse(200, projects, "Featured projects fetched"));
});

const getOne = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id);
  res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

const create = asyncHandler(async (req, res) => {
  const project = await createProject(req.body, req.file);
  res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
});

const update = asyncHandler(async (req, res) => {
  const project = await updateProject(req.params.id, req.body, req.file);
  res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteProject(req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Project deleted successfully"));
});

module.exports = { getAll, getFeatured, getOne, create, update, remove };