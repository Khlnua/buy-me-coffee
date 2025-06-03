"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createCard = async (userId: string, formData: FormData) => {
  if (!userId) {
    return;
  }

  const country = formData.get("country") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const cardNumber = formData.get("cardNumber") as string;
  const expiryDate = new Date(formData.get("expiryDate") as string);
  await prisma.bankCard.create({
    data: {
      user: userId,
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
    },
  });

  redirect("/");
};
