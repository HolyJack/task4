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
users.use(authenticateStatus_1.default);
users.use(checkActiveStatus_1.default);
users.get("/users", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default.user.findMany({
        select: {
            username: true,
            email: true,
            createdAt: true,
            signinAt: true,
            active: true,
        },
    });
    res.status(200).json(users);
    next();
}));
users.patch("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const usernames = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.usernames;
    const active = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.active;
    if (!usernames || typeof active !== "boolean") {
        res.status(422).send();
        return;
    }
    yield db_1.default.user.updateMany({
        where: { username: { in: usernames } },
        data: { active },
    });
    res.status(204);
    next();
}));
users.delete("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const usernames = (_e = req.body) === null || _e === void 0 ? void 0 : _e.usernames;
    if (!usernames) {
        res.status(422).send();
        return;
    }
    yield db_1.default.user.deleteMany({
        where: { username: { in: usernames } },
    });
    res.status(204);
    next();
}));
users.use(checkActiveStatus_1.default);
users.use((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send();
}));
