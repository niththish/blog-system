const errorController = async (err, req, res, next) => {
  res.json({ status: "bad request", reason: err });
};

module.exports = errorController;
