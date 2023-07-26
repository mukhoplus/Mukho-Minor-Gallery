const mainController = {};

mainController.getMainPage = (req, res) => {
  if (req.user) {
    res.redirect("/gallery");
  } else {
    const msg = req.flash("error")[0] || null;
    res.render("main.ejs", { message: msg });
  }
};

module.exports = mainController;
