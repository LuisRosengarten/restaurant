"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const RestaurantAddressStep = () => {
  const { control } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-row gap-2">
        <FormField
          control={control}
          name="restaurantAddressStreet"
          render={({ field }) => (
            <FormItem className="w-[66%]">
              <FormLabel>Straße</FormLabel>
              <FormControl>
                <Input placeholder="Beispielstr." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="restaurantAddressNumber"
          render={({ field }) => (
            <FormItem className="w-[33%]">
              <FormLabel>Hausnummer</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex flex-row gap-2">
        <FormField
          control={control}
          name="restaurantAddressZip"
          render={({ field }) => (
            <FormItem className="w-[33%]">
              <FormLabel>Postleitzahl</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="restaurantAddressCity"
          render={({ field }) => (
            <FormItem className="w-[33%]">
              <FormLabel>Stadt</FormLabel>
              <FormControl>
                <Input placeholder="Berlin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="restaurantAddressCountry"
          render={({ field }) => (
            <FormItem className="w-[33%]">
              <FormLabel>Land</FormLabel>
              <FormControl>
                <Input placeholder="Deutschland" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RestaurantAddressStep;
