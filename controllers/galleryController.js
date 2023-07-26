import { getGalleryData } from "../models/galleryModel.js";

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
      const rows = await getGalleryData();

      res.render("gallery.ejs", {
        id: req.user.id,
        nickname: req.user.nickname,
        rows: rows,
        page: page,
        length: rows.length - 1,
        page_num: 10,
      });
    } catch (err) {
      console.error(
        `[${getCurrentTime()}] 갤러리 접근 중 오류가 발생했습니다.: ${err}`
      );
      res.redirect("/gallery");
    }
  }
};

export default galleryController;
