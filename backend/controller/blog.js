const fs = require("fs/promises");
const blogSchema = require("../model/blog");
const dirname = require("../base_dir");

const CreateBlogController = async (req, res, next) => {
  const { title, category, content, type } = req.body;

  if (!title || !category || !content || !type) {
    return next("all fields are required");
  }

  const image_url = `${process.env.fILE_SERVER}/images/${type}/${req.file.filename}`;
  const createdAt = Date.now();
  const blog = await blogSchema.create({
    title,
    category,
    content,
    image_url,
    createdAt,
  });
  if (blog) res.json({ status: "created new blog successfully" });
  else return next("unable to create a new blog post");
};

const ViewBlogsController = async (req, res, next) => {
  const blogs = await blogSchema.find().sort({ createdAt: -1 });
  res.json({ data: blogs });
};

const deleteBlogController = async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogSchema.findOneAndDelete({ _id: id });

  const folder = blog.image_url.split("/");
  const fileName = folder[folder.length - 1];
  const type = folder[folder.length - 2];
  const image_url = `${dirname}/public/images/${type}/${fileName}`;
  try {
    await fs.unlink(image_url);
  } catch (err) {}

  if (blog) res.json({ status: "deleted blog successfully" });
  else return next("unable to delete the requested blog post");
};

module.exports = {
  CreateBlogController,
  ViewBlogsController,
  deleteBlogController,
};
