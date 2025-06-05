"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { currentUser } from "@clerk/nextjs/server";
import { getCountries } from "@/utils/getCountries";

const { countries, months, years } = getCountries();

const schemaCountry = z.object({
  country: z.enum(countries, {
    message: "Please select a country",
  }),
});

const schemaMonth = z.object({
  month: z.enum(months, {
    message: "Please select a month",
  }),
});

const schemaYears = z.object({
  month: z.enum(years, {
    message: "Please select a year",
  }),
});

const schemaUserBankCard = z.object({
  countries: schemaCountry,
  firstName: z.string().min(2, { message: "Please enter name" }),
  lastName: z.string().min(2, { message: "Please enter name" }),
  cardNumber: z.string().length(16, { message: "Wrong card number" }),
  months: schemaMonth,
  years: schemaYears,
  cvc: z.string().length(3, { message: "Enter cvc number" }),
});

export const createCard = async (userId: string, formData: FormData) => {
  const user = await currentUser();

  if (!user?.id) {
    return;
  }

  const validateFormData = schemaUserBankCard.safeParse({
    country: formData.get("country"),
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    cardNumber: formData.get("cardNumber"),
    expiryDate: formData.get("expiryDate"),
    cvc: formData.get("cvc"),
  });

  if (!validateFormData.success) {
    return {
      ZodError: validateFormData.error.flatten().fieldErrors,
      message: "Missing fields, failed to make add card",
    };
  }

  const country = formData.get("country") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const cardNumber = formData.get("cardNumber") as string;
  const expiryDate = new Date(formData.get("expiryDate") as string);
  const cvc = (formData.get("cvc") as string) ?? "";

  await prisma.bankCard.create({
    data: {
      userId,
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvc,
    },
  });

  redirect("/");
};
