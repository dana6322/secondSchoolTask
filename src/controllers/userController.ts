import userModel from "../models/userModel";
import { Response } from "express";
import baseController from "./baseController";
import { AuthRequest } from "../middleware/authMiddleware";

class UsersController extends baseController {
  constructor() {
    super(userModel);
  }

  // Override create method to associate user with authenticated user
  async create(req: AuthRequest, res: Response) {
    if (req.user) {
      req.body._id = req.user._id; // Associate user with user ID from token
    }
    return super.create(req, res);
  }

  //OVERRIDE DELETE to ensure only creator can delete
  async del(req: AuthRequest, res: Response): Promise<Response | undefined> {
    const id = req.params.id;
    try {
      const user = await this.model.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      // Check if the authenticated user is the creator of the user
      const authReq = req as AuthRequest;
      if (authReq.user && user._id.toString() === authReq.user._id) {
        return await super.del(req, res);
      } else {
        return res
          .status(403)
          .send("Forbidden: You are not the creator of this user");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error deleting user");
    }
  }

  //override put to prevent changing _id
  async update(req: AuthRequest, res: Response): Promise<Response | undefined> {
    const id = req.params.id;
    try {
      const user = await this.model.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      // Prevent changing _id field
      if (req.body._id && req.body._id !== user._id.toString()) {
        return res.status(400).send("Cannot change user ID");
      }
      // Delegate to base controller and return its result
      return await super.update(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error updating user");
    }
  }
}

export default new UsersController();
