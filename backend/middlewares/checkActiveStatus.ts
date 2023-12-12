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

      req.logout(function () {
        return req.session.destroy(function () {
          res.redirect(401, "/");
        });
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    res.send();
  }
}
