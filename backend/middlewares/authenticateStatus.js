"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authenticateStatus(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
exports.default = authenticateStatus;
