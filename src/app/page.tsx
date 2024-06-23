"use client";

import MultiStepForm, {
  MultiStepFormStepType,
} from "@/components/forms/multi-step-form";
import AccountEmailStep from "@/components/forms/steps/account-email-step";
import PersonalAddressStep from "@/components/forms/steps/personal-address-step";
import PersonalInfoStep from "@/components/forms/steps/personal-info-step";
import RestaurantAddressStep from "@/components/forms/steps/restaurant-address-step";
import RestaurantInfoStep from "@/components/forms/steps/restaurant-info-step";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";

const steps: MultiStepFormStepType[] = [
  {
    label: "Restaurant - Info",
    zodSchema: z.object({
      restaurantName: z
        .string()
        .min(
          3,
          "Der Name deines Restaurant muss mindestens 3 Zeichen lang sein.",
        ),
      restaurantCode: z.string().min(10, ""),
    }),
    content: <RestaurantInfoStep />,
    initalValues: {
      restaurantName: "",
      restaurantCode: "",
    },
  },
  {
    label: "Restaurant - Addresse",
    zodSchema: z.object({
      restaurantAddressStreet: z.string().min(2, "Pflichtfeld").max(100), // Minimum 2 characters, maximum 100 characters
      restaurantAddressNumber: z.string().min(1, "Pflichtfeld").max(10), // Minimum 1 character, maximum 10 characters
      restaurantAddressZip: z
        .string()
        .min(1, "Pflichtfeld")
        .regex(/^\d{5}$/, "Ungültige Postleitzahl"), // German ZIP code pattern
      restaurantAddressCity: z.string().min(2, "Pflichtfeld").max(50), // Minimum 2 characters, maximum 50 characters
      restaurantAddressCountry: z.string().min(1, "Pflichtfeld"),
    }),
    content: <RestaurantAddressStep />,
    initalValues: {
      restaurantAddressStreet: "",
      restaurantAddressNumber: "",
      restaurantAddressZip: "",
      restaurantAddressCity: "",
      restaurantAddressCountry: "Deutschland",
    },
  },
  {
    label: "Persönlich - Info",
    zodSchema: z.object({
      personalFirstName: z
        .string()
        .min(3, "Dein Vorname muss mindestens 3 Zeichen lang sein."),
      personalLastName: z
        .string()
        .min(3, "Dein Nachname muss mindestens 3 Zeichen lang sein."),
    }),
    content: <PersonalInfoStep />,
    initalValues: {
      personalFirstName: "",
      personalLastName: "",
    },
  },
  {
    label: "Persönlich - Addresse",
    zodSchema: z.object({
      personalAddressStreet: z.string().min(2, "Pflichtfeld").max(100), // Minimum 2 characters, maximum 100 characters
      personalAddressNumber: z.string().min(1, "Pflichtfeld").max(10), // Minimum 1 character, maximum 10 characters
      personalAddressZip: z
        .string()
        .min(1, "Pflichtfeld")
        .regex(/^\d{5}$/, "Ungültige Postleitzahl"), // German ZIP code pattern
      personalAddressCity: z.string().min(2, "Pflichtfeld").max(50), // Minimum 2 characters, maximum 50 characters
      personalAddressCountry: z.string().min(1, "Pflichtfeld"),
    }),
    content: <PersonalAddressStep />,
    initalValues: {
      personalAddressStreet: "",
      personalAddressNumber: "",
      personalAddressZip: "",
      personalAddressCity: "",
      personalAddressCountry: "Deutschland",
    },
  },
  {
    label: "Account - Email",
    zodSchema: z.object({
      accountEmail: z
        .string()
        .email("Bitte gib eine gültige Email-Addresse an."),
    }),
    content: <AccountEmailStep />,
    initalValues: {
      accountEmail: "",
    },
  },
];

export default function Home() {
  const onFinish = async (data: any) => {
    console.log(JSON.stringify(data));
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center p-5">
      <Card className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <CardContent className="w-full h-full flex items-center justify-center p-5">
          <MultiStepForm steps={steps} onFinish={onFinish} />
        </CardContent>
      </Card>
    </main>
  );
}
