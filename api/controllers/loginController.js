var async = require("async");

exports.login_post = function (req, res, next) {
  const { username, pass } = req.body;
  Contact.find({ username: username, password: pass }).then((contacts) => {
    if (contacts.length > 0) {
      res.json({
        confirmation: "success",
        message: "post login",
      });
    } else {
      res.json({
        confirmation: "failed",
        message: "invalid username + pass",
      });
    }
  });
};
