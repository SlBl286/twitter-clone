import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const session = await getSession({ req });
      //   const { currentUser } = await serverAuth(req);

      const { body, id } = req.body;
      const post = await prisma.post.create({
        data: {
          body,
          userId: id,
        },
      });
      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comment: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comment: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
