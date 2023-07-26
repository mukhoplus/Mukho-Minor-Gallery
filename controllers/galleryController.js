const galleryModel = require("../models/galleryModel");

const galleryController = {};

galleryController.redirectToGallery = (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    res.redirect("/gallery/1");
  }
};

galleryController.renderGallery = async (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    try {
      const page = req.params.page;
      const rows = await galleryModel.getGalleryData();

      res.render("gallery.ejs", {
        id: req.user.id,
        nickname: req.user.nickname,
        rows: rows,
        page: page,
        length: rows.length - 1,
        page_num: 10,
      });
    } catch (err) {
      console.error("Error rendering gallery:", err);
      res.redirect("/gallery");
    }
  }
};

module.exports = galleryController;
