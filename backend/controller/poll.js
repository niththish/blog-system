const pollSchema = require("../model/poll");
const dirname = require("../base_dir");
const fs = require("fs/promises");

const CreatePollController = async (req, res, next) => {
  let { question, option1, option2, type, option3, option4 } = req.body;

  if (!question || !option1 || !option2 || !type) {
    return next("all field are required");
  }
  const image_url = `${process.env.fILE_SERVER}/images/${type}/${req.file.filename}`;
  const createdAt = Date.now();

  if (option3 == "null") option3 = "";
  if (option4 == "null") option4 = "";

  console.log(option3, option4);

  const poll = await pollSchema.create({
    question,
    option1,
    option2,
    option3,
    option4,
    image_url,
    createdAt,
  });
  if (poll) res.json({ status: "created new poll successfully" });
  else return next("unable to create a new poll");
};

const ViewPollsController = async (req, res, next) => {
  const poll = await pollSchema.find().sort({ createdAt: -1 });

  const pollData = poll.map((p) => {
    return {
      _id: p._id,
      question: p.question,
      image_url: p.image_url,
      option1: p.option1,
      option2: p.option2,
      option3: p.option3,
      option4: p.option4,
      option1Count: p.option1Count,
      option2Count: p.option2Count,
      option3Count: p.option3Count,
      option4Count: p.option4Count,
      createdAt: p.createdAt,
    };
  });

  res.json({ data: pollData });
};

const deletePollController = async (req, res, next) => {
  const { id } = req.params;
  const poll = await pollSchema.findOneAndDelete({ _id: id });

  const folder = poll.image_url.split("/");
  const fileName = folder[folder.length - 1];
  const type = folder[folder.length - 2];
  const image_url = `${dirname}/public/images/${type}/${fileName}`;
  try {
    await fs.unlink(image_url);
  } catch (err) {}

  if (poll) res.json({ status: "deleted poll successfully" });
  else return next("unable to delete the requested poll");
};

const SinglePollController = async (req, res, next) => {
  const { id } = req.params;
  const poll = await pollSchema.findById(id);
  const {
    _id,
    question,
    option1,
    option2,
    option3,
    option4,
    option1Count,
    option2Count,
    option3Count,
    option4Count,
    image_url,
    createdAt,
    comments,
  } = poll;
  const pollData = {
    _id,
    question,
    option1,
    option2,
    option3,
    option4,
    option1Count,
    option2Count,
    option3Count,
    option4Count,
    image_url,
    createdAt,
    comments,
  };
  if (poll) res.json({ data: pollData });
  else return next("unable to get the requested poll");
};

const VotePollController = async (req, res, next) => {
  const { id } = req.params;
  const { option } = req.body;
  const ip = req.socket.remoteAddress;
  let option1 = 0;
  let option2 = 0;
  let option3 = 0;
  let option4 = 0;

  if (option === 1) option1 = 1;
  else if (option == 2) option2 = 1;
  else if (option == 3) option3 = 1;
  else option4 = 1;

  const poll = await pollSchema.findOne({ _id: id });
  const { option1Count, option2Count, option3Count, option4Count } = poll;

  const updatePoll = await pollSchema.findOneAndUpdate(
    { _id: id },
    {
      option1Count: option1Count + option1,
      option2Count: option2Count + option2,
      option3Count: option3Count + option3,
      option4Count: option4Count + option4,
      $push: { votedIp: ip },
    }
  );

  if (updatePoll) res.json({ status: "voted poll sucessfully" });
  else return next("unable to vote in the poll");
};

const addComment = async (req, res, next) => {
  const { id } = req.params;
  const { name, comment } = req.body;

  if (!name || !comment) return next("all fields are required");
  const userComment = { name, comment };

  const addComment = await pollSchema.findOneAndUpdate(
    { _id: id },
    { $push: { comments: userComment } }
  );

  if (addComment) res.json({ status: "comment added sucessfully" });
  else return next("unable to add comment");
};

const VerifyVoted = async (req, res, next) => {
  const { id } = req.params;
  const ip = req.socket.remoteAddress;

  const poll = await pollSchema.findOne({ _id: id });
  const result = poll.votedIp.filter((p) => p == ip);
  if (result.length == 0) res.json({ status: false });
  else res.json({ status: true });
};

module.exports = {
  CreatePollController,
  ViewPollsController,
  deletePollController,
  SinglePollController,
  VotePollController,
  VerifyVoted,
  addComment,
};
