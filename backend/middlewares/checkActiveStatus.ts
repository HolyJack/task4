import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { User } from "@prisma/client";

export default async function checkActiveStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = (req.user as User).id;
  console.log("active check middleware");
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.active) {
      console.log("user is about to logged out and seesion destroyed");
      res.clearCookie("connect.sid");

      req.logout(function () {
        return req.session.destroy(function () {
          res.redirect(401, "/");
        });
      });
      return;
    } else {
      console.log("should be all good");
      next();
    }
  } catch (error) {
    console.error("Error checking active status:", error);
    res.status(500).json({ error: "Internal Server Error" });
    res.send();
  }
}
