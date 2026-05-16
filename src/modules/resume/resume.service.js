const cloudinary = require("../../config/cloudinary");
const ApiError = require("../../utils/ApiError");

let resumeData = null;

const getResume = () => {
  if (!resumeData) throw new ApiError(404, "No resume uploaded yet");
  return resumeData;
};

const uploadResume = async (file) => {
  if (!file) throw new ApiError(400, "Please upload a PDF file");

  // Delete old resume if exists
  if (resumeData?.publicId) {
    await cloudinary.uploader.destroy(resumeData.publicId, {
      resource_type: "raw",
    });
  }

  resumeData = {
    url: file.path,
    publicId: file.filename,
    uploadedAt: new Date(),
  };

  return resumeData;
};

const deleteResume = async () => {
  if (!resumeData) throw new ApiError(404, "No resume found");

  await cloudinary.uploader.destroy(resumeData.publicId, {
    resource_type: "raw",
  });

  resumeData = null;
  return { message: "Resume deleted successfully" };
};

module.exports = { getResume, uploadResume, deleteResume };