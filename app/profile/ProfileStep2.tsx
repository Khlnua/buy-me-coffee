"use client";

import Form from "next/form";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCard } from "../actions/create-card";
import CompleteProfile from "./CompleteProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

export default function NewCard({ previousStep }: ProfileStepProps) {
  const { user } = useUser();

  const handleSubmit = () => {
    previousStep();
  };

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form
        action={createCard.bind(null, String(user?.id))}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Select country</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here"
          />
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your name here"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your name here"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cardNumber">Enter card number</Label>
          <Input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Expires</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">January</SelectItem>
                <SelectItem value="dark">February</SelectItem>
                <SelectItem value="system">March</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Year</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">2023</SelectItem>
                <SelectItem value="dark">2024</SelectItem>
                <SelectItem value="system">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">CVC</Label>
            <Input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="CVC"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleSubmit}>Back</Button>
          <CompleteProfile />
        </div>
      </Form>
    </div>
  );
}
