const logoutController = {};

logoutController.logout = (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    const id = req.user.id;
    const nickname = req.user.nickname;

    req.logout((err) => {
      if (err) console.log("로그아웃 중 오류가 발생했습니다.");

      req.session.save(() => {
        console.log(`Passport 세션이 제거되었습니다: ${id}(${nickname})`);
        res.redirect("/main");
      });
    });
  }
};

export default logoutController;
