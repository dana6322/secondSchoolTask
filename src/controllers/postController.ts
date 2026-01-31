import postModel from "../models/postModel";
import { Response } from "express";
import baseController from "./baseController";
import { AuthRequest } from "../middleware/authMiddleware";

class PostsController extends baseController {
  constructor() {
    super(postModel);
  }

  // Override create method to associate post with authenticated user
  async create(req: AuthRequest, res: Response) {
    if (req.user) {
      req.body.sender = req.user._id; // Associate post with user ID from token
    }
    return super.create(req, res);
  }

  //OVERRIDE DELETE to ensure only creator can delete
  async del(req: AuthRequest, res: Response): Promise<Response | undefined> {
    const id = req.params.id;
    try {
      const post = await this.model.findById(id);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      // Check if the authenticated user is the creator of the post
      const authReq = req as AuthRequest;
      if (authReq.user && post.sender.toString() === authReq.user._id) {
        return await super.del(req, res);
      } else {
        return res
          .status(403)
          .send("Forbidden: You are not the creator of this post");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error deleting post");
    }
  }

  //override put to prevent changing sender
  async update(req: AuthRequest, res: Response): Promise<Response | undefined> {
    const id = req.params.id;
    try {
      const post = await this.model.findById(id);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      // Prevent changing sender field
      if (req.body.sender && req.body.sender !== post.sender.toString()) {
        return res.status(400).send("Cannot change creator of the post");
      }
      // Delegate to base controller and return its result
      return await super.update(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error updating post");
    }
  }
}

export default new PostsController();
