module.exports = (err, req, res, next) => {
  if (err?.name === "TokenExpiredError") {
    return res.status(401).send(err);
  }
  if (err?.name === "JsonWebTokenError") {
    return res.status(401).send(err);
  }
  if (err?.name === "NotBeforeError") {
    return res.status(401).send(err);
  }
  if (err?.name === "ValidationError") {
    return res.status(400).send({
      status: false,
      message: err?.message,
      ...Object.keys(err?.errors || {}).reduce(
        (acc, cv) => ({ ...acc, [cv]: err?.errors[cv].message }),
        {}
      ),
    });
  }
  if (err?.code === 11000) {
    return res.status(400).send({
      status: false,
      message: `${Object.keys(err?.keyValue || {}).join(",")} is already taken`,
    });
  }
  if (err?.name === "CastError") {
    return res
      .status(400)
      .send({ status: false, message: `${err?.path} is not valid` });
  }
  if (err?.status) {
    return res.status(err?.status).send(err);
  }
  console.log(err);

  return res.status(500).send(err);
};
