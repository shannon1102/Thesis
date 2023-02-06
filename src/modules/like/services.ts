
import likeDao from "./daos";
const likePost = async (userId: number, postId: number) => {
    return await likeDao.likePost(userId, postId);
};

export default { likePost };
