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
import { useState } from "react";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

export default function NewCard({ previousStep }: ProfileStepProps) {
  const { user } = useUser();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    previousStep();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setValue(onlyNumbers);
  };

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <Form
        action={createCard.bind(null, String(user?.id))}
        className="space-y-6"
      >
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="country">Select country</Label>
          <Select name="country">
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="w-127">
              <SelectItem value="Japan">Japan</SelectItem>
              <SelectItem value="South Korea">South Korea</SelectItem>
              <SelectItem value="United States of America">
                United States of America
              </SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
              <SelectItem value="Sweden">Sweden</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Ireland">Ireland</SelectItem>
              <SelectItem value="Singapore">Singapore</SelectItem>
              <SelectItem value="Denmark">Denmark</SelectItem>
              <SelectItem value="Turkey">Turkey</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Mongolia">Mongolia</SelectItem>
              <SelectItem value="New Zealand">New Zealand</SelectItem>
            </SelectContent>
          </Select>
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
            value={value}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Expires</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiryDate">Year</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
                <SelectItem value="2029">2029</SelectItem>
                <SelectItem value="2030">2030</SelectItem>
                <SelectItem value="2031">2031</SelectItem>
                <SelectItem value="2032">2032</SelectItem>
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
