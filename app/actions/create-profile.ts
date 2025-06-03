"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createProfile = async (userId: string, formData: FormData) => {
  if (!userId) {
    return;
  }

  const name = formData.get("name") as string;
  const about = formData.get("about") as string;
  const avatarImage = formData.get("avatarImage") as string;
  const socialMediaURL = formData.get("socialMediaURL") as string;
  const backgroundImage = formData.get("backgroundImage") as string;

  await prisma.profile.create({
    data: {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      user: userId,
    },
  });

  redirect("/");
};
