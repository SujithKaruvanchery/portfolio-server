const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("./blog.service");

const getAll = asyncHandler(async (req, res) => {
  const isAdmin = req.user ? true : false;
  const blogs = await getAllBlogs(!isAdmin);
  res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

const getBySlug = asyncHandler(async (req, res) => {
  const blog = await getBlogBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

const getById = asyncHandler(async (req, res) => {
  const blog = await getBlogById(req.params.id);
  res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

const create = asyncHandler(async (req, res) => {
  const blog = await createBlog(req.body, req.file);
  res.status(201).json(new ApiResponse(201, blog, "Blog created successfully"));
});

const update = asyncHandler(async (req, res) => {
  const blog = await updateBlog(req.params.id, req.body, req.file);
  res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteBlog(req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Blog deleted successfully"));
});

module.exports = { getAll, getBySlug, getById, create, update, remove };