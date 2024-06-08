"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function generateRestaurantCode(restaurantName: string): string {
  if (restaurantName.length <= 0) {
    return "";
  }

  // Remove the word "restaurant" if present
  const cleanedName = restaurantName.replace(/restaurant/gi, "").trim();

  // Split the cleaned name into words
  const words = cleanedName
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""));

  // Generate the first part (XXX) based on the specified rules
  let firstPart = "";

  if (words.length >= 3) {
    // If the restaurant name has 3 or more words
    firstPart = words
      .slice(0, 3)
      .map((word) => word[0].toUpperCase())
      .join("");
  } else if (words.length === 2) {
    // If the restaurant name has more than one word but less than 3 words
    firstPart = words[0].slice(0, 2).toUpperCase() + words[1][0].toUpperCase();
  } else if (words.length === 1) {
    // If the restaurant name has only one word
    firstPart = words[0].slice(0, 3).toUpperCase();
  }

  // Generate the second part (XXXXXX) as a random number
  const secondPart = Math.floor(100000 + Math.random() * 900000).toString();

  // Combine the two parts
  const code = `${firstPart}-${secondPart}`;

  return code;
}

const RestaurantInfoStep = () => {
  const { control, watch, setValue } = useFormContext();

  const restaurantName = watch("restaurantName");

  useEffect(() => {
    if (!restaurantName) {
      setValue("restaurantCode", "");
      return;
    }
    const restaurantCode = generateRestaurantCode(restaurantName);
    setValue("restaurantCode", restaurantCode);
    return;
  }, [restaurantName, setValue]);

  return (
    <div className="space-y-4 w-full">
      <FormField
        {...control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name des Restaurants</FormLabel>
            <FormControl>
              <Input placeholder="Flamingo Fresh Food Bar" {...field} />
            </FormControl>
            <FormDescription>Der Name deines Restaurants</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="restaurantCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restaurant Code</FormLabel>
            <FormControl>
              <Input
                placeholder="Gib den Namen deines Restaurants ein."
                disabled
                {...field}
              />
            </FormControl>
            <FormDescription>
              Dieser Code wird automatisch generiert.
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default RestaurantInfoStep;
