"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    // for now later should ref user model
    sender: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("post", postSchema);
//# sourceMappingURL=postModel.js.map