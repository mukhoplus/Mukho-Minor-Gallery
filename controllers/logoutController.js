import { getCurrentTime } from "../util/util.js";

const logoutController = {};

logoutController.logout = (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    const id = req.user.id;
    const nickname = req.user.nickname;

    req.logout((err) => {
      if (err)
        console.log(
          `[${getCurrentTime()}] 로그아웃 중 오류가 발생했습니다. ${err}`
        );

      req.session.save(() => {
        console.log(
          `[${getCurrentTime()}] Passport 세션이 제거되었습니다: ${id}(${nickname})`
        );
        console.log(
          `[${getCurrentTime()}] ${id}(${nickname})이(가) 로그아웃 했습니다.`
        );
        res.redirect("/main");
      });
    });
  }
};

export default logoutController;
