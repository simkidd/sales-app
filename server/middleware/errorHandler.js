const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const errorResponse = {
    error: {
      name: err.name,
      message: err.message,
      line: null,
      details: err.details || null,
    },
  };

  if (process.env.NODE_ENV !== "production") {
    errorResponse.error.stack = err.stack;
    const match = err.stack.match(/at .* \(.*:(\d+):\d+\)/);
    if (match) {
      errorResponse.error.line = parseInt(match[1], 10);
    }
  }

  res.json(errorResponse);
};

export { notFound, errorHandler };
