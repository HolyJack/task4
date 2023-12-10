import { NextFunction, Request, Response } from "express";
import prisma from "../utils/db";
import { User } from "@prisma/client";

export default async function checkActiveStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = (req.user as User).id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.active) {
      res.clearCookie("connect.sid");
      return req.logout(function () {
        return req.session.destroy(function () {
          return res.send();
        });
      });
    } else {
      return next();
    }
  } catch (error) {
    console.error("Error checking active status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
