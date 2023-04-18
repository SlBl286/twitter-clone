import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const session = await getSession({ req });
    // const { currentUser } = await serverAuth(req);

    const { name, username, bio, profileImage, coverImage, id } = req.body;

    if (!name || !username || !id) {
      throw new Error("Missing fields");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
