const Skill = require("./skill.model");
const ApiError = require("../../utils/ApiError");

const getAllSkills = async () => {
  return await Skill.find().sort({ category: 1, proficiency: -1 });
};

const getSkillsByCategory = async (category) => {
  return await Skill.find({ category }).sort({ proficiency: -1 });
};

const getSkillById = async (id) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, "Skill not found");
  return skill;
};

const createSkill = async (data) => {
  const existing = await Skill.findOne({ name: data.name });
  if (existing) throw new ApiError(400, "Skill already exists");
  return await Skill.create(data);
};

const updateSkill = async (id, data) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, "Skill not found");

  return await Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteSkill = async (id) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new ApiError(404, "Skill not found");
  await skill.deleteOne();
  return { message: "Skill deleted successfully" };
};

module.exports = {
  getAllSkills,
  getSkillsByCategory,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};