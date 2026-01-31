"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// import { swaggerUi, swaggerSpec } from "./swagger";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env.dev" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger UI setup
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     explorer: true,
//     customCss: ".swagger-ui .topbar { display: none }",
//     customSiteTitle: "Posts & Comments API Documentation",
//   }),
// );
// API routes
app.use("/post", postRoute_1.default);
app.use("/comment", commentRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/user", userRoute_1.default);
// Swagger JSON endpoint
// app.get("/api-docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });
const initApp = () => {
    const pr = new Promise((resolve, reject) => {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            reject("DATABASE_URL is not defined");
            return;
        }
        mongoose_1.default.connect(dbUrl, {}).then(() => {
            resolve(app);
        });
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("Connected to Database"));
    });
    return pr;
};
exports.default = initApp;
//# sourceMappingURL=index.js.map