export const notFoundMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};

export const catchErrorMiddleware = (err, req, res, next) => {
  console.log(error);
  res.status(500).send("generic server error");
};
