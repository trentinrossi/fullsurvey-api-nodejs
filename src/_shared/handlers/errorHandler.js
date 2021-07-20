const handleError = (err, res) => {
  const { code, message, moreInfo, status } = err;
  res.status(status).json({
    code,
    status,
    message,
    moreInfo,
  });
};

module.exports = {
  handleError,
};
