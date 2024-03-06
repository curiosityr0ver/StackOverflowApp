const response = (statuscode, message, body, res) => {
  // console.log("testing", body, message);
  res.json({ statuscode, message, body });
};
module.exports = response;
