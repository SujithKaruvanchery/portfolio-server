const Project = require("./project.model");
const ApiError = require("../../utils/ApiError");
const cloudinary = require("../../config/cloudinary");

const getAllProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

const getFeaturedProjects = async () => {
  return await Project.find({ featured: true }).sort({ createdAt: -1 });
};

const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");
  return project;
};

const createProject = async (data, file) => {
  let image = { url: "", publicId: "" };

  if (file) {
    image = { url: file.path, publicId: file.filename };
  }

  return await Project.create({ ...data, image });
};

const updateProject = async (id, data, file) => {
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (file) {
    if (project.image.publicId) {
      await cloudinary.uploader.destroy(project.image.publicId);
    }
    data.image = { url: file.path, publicId: file.filename };
  }

  return await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteProject = async (id) => {
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (project.image.publicId) {
    await cloudinary.uploader.destroy(project.image.publicId);
  }

  await project.deleteOne();
  return { message: "Project deleted successfully" };
};

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};