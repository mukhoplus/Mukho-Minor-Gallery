import { createPost } from "../models/writeModel.js";
import { getCurrentTime } from "../util/util.js";

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
    const postDate = getCurrentTime();
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
    await createPost(postInfo);
    console.log(
      `[${postDate}] ${req.user.id}(${req.user.nickname})이(가) 게시글을 작성했습니다.`
    );
    res.redirect("/gallery");
  } catch (err) {
    console.log(
      `[${getCurrentTime()}] ${req.user.id}(${
        req.user.nickname
      })의 게시글 작성 과정에서 오류가 발생했습니다. ${err}`
    );
    res.redirect("/gallery");
  }
};

export default writeController;
