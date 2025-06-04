"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { currentUser } from "@clerk/nextjs/server";

export const createCard = async (userId: string, formData: FormData) => {
  if (!userId) {
    return;
  }

  const schemaUserBankCard = z.object({
    firstName: z.string().min(2, { message: "Please enter name" }),
    lastName: z.string().min(2, { message: "Please enter name" }),
    cardNumber: z.string().min(16).max(16, { message: "Wrong card number" }),
  });

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
