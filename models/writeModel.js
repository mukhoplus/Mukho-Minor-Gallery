const util = require("../util/util");

const writeModel = {};

writeModel.createPost = async (postInfo) => {
  await util.queryAsync("INSERT INTO post SET ?", postInfo);
};

module.exports = writeModel;
