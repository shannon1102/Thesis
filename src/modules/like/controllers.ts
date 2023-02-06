import { Like } from "../../entities/post/like";
import services from "./services"

const likePost = async (req: any, res: any) => {
    //Check exist
    const data = req.body;
    const userId = req.user.id
    console.log("data",data,userId);
    const likeReponse = await services.likePost(data.postId,userId);
    return res.status(200).json({
        status: 'success',
        result: likeReponse,
    });
};

export default { likePost };
