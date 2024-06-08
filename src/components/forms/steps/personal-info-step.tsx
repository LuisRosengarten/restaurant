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
import { useFormContext } from "react-hook-form";

const PersonalInfoStep = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <FormField
        control={control}
        name="personalFirstName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Dein Vorname</FormLabel>
            <FormControl>
              <Input placeholder="Max" {...field} />
            </FormControl>
            <FormDescription>
              Bitte gib hier deinen Vornamen ein.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personalLastName"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Dein Nachname</FormLabel>
            <FormControl>
              <Input placeholder="Mustermann" {...field} />
            </FormControl>
            <FormDescription>
              Bitte gib hier deinen Nachnamen ein.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoStep;
