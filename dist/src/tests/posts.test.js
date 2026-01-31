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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const postModel_1 = __importDefault(require("../models/postModel"));
const utils_1 = require("./utils");
let app;
let loginUser;
let postId = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, index_1.default)();
    yield postModel_1.default.deleteMany();
    loginUser = yield (0, utils_1.getLogedInUser)(app);
}));
afterAll((done) => {
    done();
});
describe("Sample Test Suite", () => {
    test("Sample Test Case", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }));
    test("Create Post", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const post of utils_1.postsList) {
            const response = yield (0, supertest_1.default)(app)
                .post("/post")
                .set("Authorization", "Bearer " + loginUser.token)
                .send(post);
            expect(response.status).toBe(201);
            expect(response.body.text).toBe(post.text);
            expect(response.body.img).toBe(post.img);
        }
    }));
    test("Get All Posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(utils_1.postsList.length);
    }));
    test("Get Posts by sender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post?sender=" + loginUser._id);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(utils_1.postsList.length);
        expect(response.body[0].text).toBe(utils_1.postsList[0].text);
        // postsList[0]._id = response.body[0]._id;
        postId = response.body[0]._id;
    }));
    //get post by id
    test("Get Post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post/" + postId);
        expect(response.status).toBe(200);
        expect(response.body.text).toBe(utils_1.postsList[0].text);
        expect(response.body.img).toBe(utils_1.postsList[0].img);
        expect(response.body._id).toBe(postId);
    }));
    test("Update Post", () => __awaiter(void 0, void 0, void 0, function* () {
        utils_1.postsList[0].text = "Inception Updated";
        utils_1.postsList[0].img = "inception_updated.jpg";
        const response = yield (0, supertest_1.default)(app)
            .put("/post/" + postId)
            .set("Authorization", "Bearer " + loginUser.token)
            .send(utils_1.postsList[0]);
        expect(response.status).toBe(200);
        expect(response.body.text).toBe(utils_1.postsList[0].text);
        expect(response.body.img).toBe(utils_1.postsList[0].img);
        expect(response.body._id).toBe(postId);
    }));
    test("Delete Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete("/post/" + postId)
            .set("Authorization", "Bearer " + loginUser.token);
        expect(response.status).toBe(200);
        console.log(response.body);
        expect(response.body._id).toBe(postId);
        const getResponse = yield (0, supertest_1.default)(app).get("/post/" + postId);
        expect(getResponse.status).toBe(404);
    }));
});
//# sourceMappingURL=posts.test.js.map