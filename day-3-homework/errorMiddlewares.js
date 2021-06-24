// listing middlewares

// 404 Error
export const notFoundMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ successful: false, message: err.message });
  } else {
    next(err);
  }
};

// 400
export const badRequestMiddleware = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send(err.errorsList);
  } else {
    next(err);
  }
};

// 500 error
export const catchErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Generic Server Error");
};
