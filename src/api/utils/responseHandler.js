// export default (res, status, data) => {
//   res.status(status).json({
//     status: "success",
//     data,
//   });
// };

module.exports = (res, status, data, message) => {
  res.status(status).json({
    status: "success",
    message,
    data,
  });
};
