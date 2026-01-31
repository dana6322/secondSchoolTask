"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const baseController_1 = __importDefault(require("./baseController"));
class UsersController extends baseController_1.default {
    constructor() {
        super(userModel_1.default);
    }
    // Override create method to associate user with authenticated user
    create(req, res) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                req.body._id = req.user._id; // Associate user with user ID from token
            }
            return _super.create.call(this, req, res);
        });
    }
    //OVERRIDE DELETE to ensure only creator can delete
    del(req, res) {
        const _super = Object.create(null, {
            del: { get: () => super.del }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield this.model.findById(id);
                if (!user) {
                    return res.status(404).send("User not found");
                }
                // Check if the authenticated user is the creator of the user
                const authReq = req;
                if (authReq.user && user._id.toString() === authReq.user._id) {
                    return yield _super.del.call(this, req, res);
                }
                else {
                    return res
                        .status(403)
                        .send("Forbidden: You are not the creator of this user");
                }
            }
            catch (err) {
                console.error(err);
                return res.status(500).send("Error deleting user");
            }
        });
    }
    //override put to prevent changing _id
    update(req, res) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield this.model.findById(id);
                if (!user) {
                    return res.status(404).send("User not found");
                }
                // Prevent changing _id field
                if (req.body._id && req.body._id !== user._id.toString()) {
                    return res.status(400).send("Cannot change user ID");
                }
                // Delegate to base controller and return its result
                return yield _super.update.call(this, req, res);
            }
            catch (err) {
                console.error(err);
                return res.status(500).send("Error updating user");
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=userController.js.map