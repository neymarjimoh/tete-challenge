export default (res, status, data) => {
  res.status(status).json({
    status: "success",
    data,
  });
};
