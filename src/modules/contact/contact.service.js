const Contact = require("./contact.model");
const ApiError = require("../../utils/ApiError");
const sendEmail = require("../../utils/sendEmail");

const getAllMessages = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getMessageById = async (id) => {
  const message = await Contact.findById(id);
  if (!message) throw new ApiError(404, "Message not found");
  return message;
};

const createMessage = async (data) => {
  const message = await Contact.create(data);

  // Send notification email to admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `📬 New Contact Message: ${data.subject}`,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  return message;
};

const markAsRead = async (id) => {
  const message = await Contact.findById(id);
  if (!message) throw new ApiError(404, "Message not found");
  message.read = true;
  await message.save();
  return message;
};

const deleteMessage = async (id) => {
  const message = await Contact.findById(id);
  if (!message) throw new ApiError(404, "Message not found");
  await message.deleteOne();
  return { message: "Message deleted successfully" };
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage,
};