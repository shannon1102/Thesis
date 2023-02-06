import { getRepository } from "typeorm";
import { Like } from "../../entities/post/like";

const likePost = async (postId: number, userId: number) => {
  const likeRepository = getRepository(Like);
  const like = await likeRepository.findOne({
    where: {
        userId : userId,
        postId: postId
    }
  });
  console.log("like",like);
  if(like) {
    return await likeRepository.delete(like.id)
    //Delete 
  } 
   const creatLike =  likeRepository.create({
    postId: postId,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date()
    });
    return await likeRepository.save(creatLike);
};



export default { likePost };
