import commentModel from "../models/commentModel";
import baseControllers from "./baseController";

const commentController = new baseControllers(commentModel);

export default commentController;
