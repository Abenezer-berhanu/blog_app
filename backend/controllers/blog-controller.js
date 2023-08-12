import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user');
  try {
    if (!blogs) {
      res.status(404).json({ message: "No user Found" });
    }
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const addBlog = async (req, res) => {
  let { title, description, image, user } = req.body;
  if (!title || !description || !image || !user) {
    return res.status(400).json({ message: "all fields are required" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error.message);
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "unable to find a user by this id" });
  }

  const blog = await Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog });
};

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;

  const user = await Blog.findByIdAndUpdate(id, {
    title,
    description,
  });
  const updatedUser = await Blog.findById(id);
  res.status(200).json({ updatedUser });
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Blog.findById(id);
    if (!user) {
      res.status(404).json({ message: `couldn't find blog with the given id` });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

const deleteById = async (req, res) => {
  const id = req.params.id;

  const user = await Blog.findByIdAndRemove(id).populate("user");
  if (!user) {
    res.status(404).json({ message: `couldn't find user with the given id` });
  }
  res.status(200).json({ user });
};

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).json({ message: "no blogs found" });
    }
    return res.status(200).json({ blogs: user });
  } catch (error) {
    console.log(error.message);
  }
};
export { getAllBlogs, addBlog, updateBlog, getById, deleteById, getUserById };
