const Blog = require("./blog.model");
const ApiError = require("../../utils/ApiError");
const cloudinary = require("../../config/cloudinary");

const getAllBlogs = async (onlyPublished = true) => {
  const filter = onlyPublished ? { published: true } : {};
  return await Blog.find(filter).select("-content").sort({ createdAt: -1 });
};

const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug });
  if (!blog) throw new ApiError(404, "Blog post not found");
  return blog;
};

const getBlogById = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, "Blog post not found");
  return blog;
};

const createBlog = async (data, file) => {
  let thumbnail = { url: "", publicId: "" };
  if (file) {
    thumbnail = { url: file.path, publicId: file.filename };
  }
  return await Blog.create({ ...data, thumbnail });
};

const updateBlog = async (id, data, file) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, "Blog post not found");

  if (file) {
    if (blog.thumbnail.publicId) {
      await cloudinary.uploader.destroy(blog.thumbnail.publicId);
    }
    data.thumbnail = { url: file.path, publicId: file.filename };
  }

  return await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteBlog = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, "Blog post not found");

  if (blog.thumbnail.publicId) {
    await cloudinary.uploader.destroy(blog.thumbnail.publicId);
  }

  await blog.deleteOne();
  return { message: "Blog deleted successfully" };
};

module.exports = {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};