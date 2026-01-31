import postModel from "../models/postModel";
import baseControllers from "./baseController";

const postController = new baseControllers(postModel);

export default postController;
