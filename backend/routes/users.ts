import express from "express";
import prisma from "../utils/db";
import authenticateStatus from "../middlewares/authenticateStatus";
import checkActiveStatus from "../middlewares/checkActiveStatus";

const users = express.Router();
users.use(authenticateStatus);
users.use(checkActiveStatus);

users.get("/users", async (_, res, next) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      createdAt: true,
      signinAt: true,
      active: true,
    },
  });
  res.status(200).json(users);
  next();
});

users.patch("/users", async (req, res, next) => {
  const usernames = req.body.data.usernames;
  const active = req.body.active;
  if (!usernames || !active) {
    res.status(422).send();
    return;
  }
  await prisma.user.updateMany({
    where: { username: { in: usernames } },
    data: { active },
  });
  res.status(204);
  next();
});

users.delete("/users", async (req, res, next) => {
  const usernames = req.body.data.usernames;
  if (!usernames) {
    res.status(422).send();
    return;
  }
  await prisma.user.deleteMany({
    where: { username: { in: usernames } },
  });
  res.status(204);
  next();
});

users.use(checkActiveStatus);
users.use(async (_, res) => {
  res.send();
});

export { users };
