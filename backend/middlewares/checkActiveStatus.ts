import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { User } from "@prisma/client";

export default async function checkActiveStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) {
    const userId = (req.user as User).id;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.active) {
        res.clearCookie("connect.sid");
        req.logout(function () {
          req.session.destroy(function () {
            res.send();
          });
        });
      }
    } catch (error) {
      console.error("Error checking active status:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return next();
  }
}
