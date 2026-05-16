const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage,
} = require("./contact.service");

const getAll = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();
  res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

const getOne = asyncHandler(async (req, res) => {
  const message = await getMessageById(req.params.id);
  res.status(200).json(new ApiResponse(200, message, "Message fetched successfully"));
});

const create = asyncHandler(async (req, res) => {
  const message = await createMessage(req.body);
  res.status(201).json(new ApiResponse(201, message, "Message sent successfully"));
});

const markRead = asyncHandler(async (req, res) => {
  const message = await markAsRead(req.params.id);
  res.status(200).json(new ApiResponse(200, message, "Message marked as read"));
});

const remove = asyncHandler(async (req, res) => {
  const result = await deleteMessage(req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Message deleted successfully"));
});

module.exports = { getAll, getOne, create, markRead, remove };