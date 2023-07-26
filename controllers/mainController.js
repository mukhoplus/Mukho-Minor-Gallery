import passport from "passport";

const mainController = {};

mainController.getMainPage = (req, res) => {
  if (req.user) {
    res.redirect("/gallery");
  } else {
    const msg = req.flash("error")[0] || null;
    res.render("main.ejs", { message: msg });
  }
};

mainController.login = (req, res, next) => {
  passport.authenticate("local-login", {
    successRedirect: "/gallery",
    failureRedirect: "/main",
    failureFlash: true,
  })(req, res, next);
};

export default mainController;
