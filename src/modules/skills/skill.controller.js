const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  getAllSkills,
  getSkillsByCategory,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("./skill.service");

const getAll = asyncHandler(async (req, res) => {
  const skills = await getAllSkills();
  res.status(200).json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

const getByCategory = asyncHandler(async (req, res) => {
  const skills = await getSkillsByCategory(req.params.category);
  res.status(200).json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

const getOne = asyncHandler(async (req, res) => {
  const skill = await getSkillById(req.params.id);
  res.status(200).json(new ApiResponse(200, skill, "Skill fetched successfully"));
});

const create = asyncHandler(async (req, res) => {
  const skill = await createSkill(req.body);
  res.status(201).json(new ApiResponse(201, skill, "Skill created successfully"));
});

const update = asyncHandler(async (req, res) => {
  const skill = await updateSkill(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, skill, "Skill updated successfully"));
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteSkill(req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Skill deleted successfully"));
});

module.exports = { getAll, getByCategory, getOne, create, update, remove };