const blogSchema = require("../model/blog");

const CreateBlogController = async (req, res, next) => {
  const { title, category, content, type } = req.body;

  if (!title || !category || !content || !type) {
    return next("all fields are required");
  }

  const image_url = `${process.env.fILE_SERVER}/images/${type}/${req.file.filename}`;
  const blog = await blogSchema.create({ title, category, content, image_url });
  if (blog) res.json({ status: "created new blog successfully" });
  else return next("unable to create a new blog post");
};

const ViewBlogsController = async (req, res, next) => {
  const blogs = await blogSchema.find();
  res.json({ data: blogs });
};

const deleteBlogController = async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogSchema.deleteOne({ _id: id });
  if (blog) res.json({ status: "deleted blog successfully" });
  else return next("unable to delete the requested blog post");
};

module.exports = {
  CreateBlogController,
  ViewBlogsController,
  deleteBlogController,
};
