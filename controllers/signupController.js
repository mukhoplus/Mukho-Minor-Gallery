const signupController = {};

signupController.getSignupPage = (req, res) => {
  const msg = req.flash("error")[0] || null;
  res.render("signup.ejs", { message: msg });
};

module.exports = signupController;
