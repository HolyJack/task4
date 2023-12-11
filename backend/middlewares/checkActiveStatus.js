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
const db_1 = __importDefault(require("../utils/db"));
function checkActiveStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        console.log("active check middleware");
        try {
            const user = yield db_1.default.user.findUnique({ where: { id: userId } });
            if (!user || !user.active) {
                console.log("user is about to logged out and seesion destroyed");
                res.clearCookie("connect.sid");
                req.logout(function () {
                    return req.session.destroy(function () {
                        console.log("active check middleware redirect");
                        return res.status(401);
                    });
                });
                console.log("active check middleware after logout");
                res.send();
                return;
            }
            else {
                console.log("should be all good");
                next();
            }
        }
        catch (error) {
            console.error("Error checking active status:", error);
            res.status(500).json({ error: "Internal Server Error" });
            res.send();
        }
    });
}
exports.default = checkActiveStatus;
