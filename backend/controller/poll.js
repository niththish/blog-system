const pollSchema = require("../model/poll");

const CreatePollController = async (req, res, next) => {
  const { question, option1, option2, type } = req.body;

  if (!question || !option1 || !option2 || !type) {
    return next("all field are required");
  }
  const image_url = `${process.env.fILE_SERVER}/images/${type}/${req.file.filename}`;
  const poll = await pollSchema.create({
    question,
    option1,
    option2,
    image_url,
  });
  if (poll) res.json({ status: "created new poll successfully" });
  else return next("unable to create a new poll");
};

const ViewPollsController = async (req, res, next) => {
  const poll = await pollSchema.find();

  const pollData = poll.map((p) => {
    return {
      _id: p._id,
      question: p.question,
      image_url: p.image_url,
      option1: p.option1,
      option2: p.option2,
      option1Count: p.option1Count,
      option2Count: p.option2Count,
    };
  });

  res.json({ data: pollData });
};

const deletePollController = async (req, res, next) => {
  const { id } = req.params;
  const poll = await pollSchema.deleteOne({ _id: id });
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
    option1Count,
    option2Count,
    image_url,
  } = poll;
  const pollData = {
    _id,
    question,
    option1,
    option2,
    option1Count,
    option2Count,
    image_url,
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

  if (option === 1) option1 = 1;
  else option2 = 1;

  const poll = await pollSchema.findOne({ _id: id });
  const { option1Count, option2Count } = poll;

  const updatePoll = await pollSchema.findOneAndUpdate(
    { _id: id },
    {
      option1Count: option1Count + option1,
      option2Count: option2Count + option2,
      $push: { votedIp: ip },
    }
  );

  if (updatePoll) res.json({ status: "voted poll sucessfully" });
  else return next("unable to vote in the poll");
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
};
