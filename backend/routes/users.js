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
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../utils/db"));
const authenticateStatus_1 = __importDefault(require("../middlewares/authenticateStatus"));
const checkActiveStatus_1 = __importDefault(require("../middlewares/checkActiveStatus"));
const users = express_1.default.Router();
exports.users = users;
users.use(checkActiveStatus_1.default);
users.use(authenticateStatus_1.default);
users.get("/users", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.user.findMany({
        select: {
            username: true,
            createdAt: true,
            signinAt: true,
            active: true,
        },
    });
    res.json(users);
    return next();
}));
users.patch("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usernames = req.body.data.usernames;
    const active = req.body.data.active;
    yield db_1.default.user.updateMany({
        where: { username: { in: usernames } },
        data: { active },
    });
    res.status(204);
    return next();
}));
users.delete("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usernames = req.body.usernames;
    yield db_1.default.user.deleteMany({
        where: { username: { in: usernames } },
    });
    res.status(204);
    return next();
}));
users.use(checkActiveStatus_1.default);
