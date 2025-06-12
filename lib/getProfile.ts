import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getProfile = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await prisma.profile.findFirst({
    where: { userId: user.id },
  });

  console.log("Profile data:", profile);

  return profile;
};
