const moment = require("moment-timezone");
const writeModel = require("../models/writeModel");

const writeController = {};

writeController.renderWritePage = (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    res.render("write.ejs", { id: req.user.id, nickname: req.user.nickname });
  }
};

writeController.createPost = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.user.userId;
    const postDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    let image = null;

    if (req.file) {
      image = req.file.filename;
    }

    const postInfo = {
      title: title,
      content: content,
      writer: writer,
      post_date: postDate,
      image: image,
    };
    await writeModel.createPost(postInfo);
    res.redirect("/gallery");
  } catch (err) {
    console.error("Error creating post:", err);
    res.redirect("/gallery");
  }
};

module.exports = writeController;
