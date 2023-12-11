import { Request, Response, NextFunction } from "express";

export default function authenticateStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
    res.send();
  }
}
