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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
const port = 3000;
const env = (0, dotenv_1.config)();
app.use(passport_1.default.initialize());
const oneDay = 1000 * 60 * 60 * 24;
app.use((0, cors_1.default)({
    origin: ["https://task4-react-front.vercel.app", "http://localhost:5173"],
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: ((_a = env.parsed) === null || _a === void 0 ? void 0 : _a.SECRET) || "dev",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        httpOnly: false,
        maxAge: oneDay,
        sameSite: "none",
        secure: true,
    },
}));
app.use(express_1.default.json());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: { username, password },
        });
        if (!user) {
            return done(null, false, { message: "Incorrect username or password" });
        }
        if (!user.active) {
            return done(null, false, {
                message: "Your account is inactive. Contact support.",
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// @ts-ignore
// no overload mathes this call
passport_1.default.serializeUser((user, done) => {
    if (user.id)
        return done(null, user.id);
    return done(null, false);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findFirst({
            where: { id: id },
        });
        if (user)
            return done(null, user);
        return done(null, false);
    }
    catch (err) {
        return done(err);
    }
}));
app.use(routes_1.default);
app.listen(port, () => console.log(`This app is listening on port ${port}`));
