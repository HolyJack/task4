"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authenticateStatus(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
        return res.send();
    }
}
exports.default = authenticateStatus;
