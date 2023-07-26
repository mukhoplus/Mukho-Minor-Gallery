import { queryAsync } from "../util/util.js";

const writeModel = {};

export async function createPost(postInfo) {
  await queryAsync("INSERT INTO post SET ?", postInfo);
}

export default writeModel;
