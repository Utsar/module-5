export const notFound = (err, req, res, next) => {
  if (err && err.status === 400) {
    res
      .status(400)
      .send({ message: err.message || "Not Found", errors: err.error || [] });
  }
  next();
};

export const forbidden = (err, req, res, next) => {
  if (err && err.status === 403) {
    res.status(400).send({ message: err.message || "Access Forbidden" });
  }
  next();
};

export const catchAllErrorHandler = (err, req, res, next) => {
  if (err) {
    if (!req.headersSent) {
      res
        .status(err.status || 500)
        .send({ message: err.message || "something went wrong!" });
    }
  }
};
