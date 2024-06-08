"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export type MultiStepFormStepType = {
  label: string;
  zodSchema: z.ZodType<any>;
  content: ReactElement;
  initalValues: object;
};

type MultiStepFormType = {
  steps: MultiStepFormStepType[];
  onFinish: (data: any) => void;
};

const MultiStepForm = ({ steps, onFinish }: MultiStepFormType) => {
  const [stepIndex, setStepIndex] = useState(0);
  const isLastStep = stepIndex + 1 >= steps.length;
  const isFirstStep = stepIndex <= 0;

  const form = useForm({
    resolver: zodResolver(steps[stepIndex].zodSchema),
    defaultValues: steps[stepIndex].initalValues,
  });

  const nextStep = async () => {
    const isFormDataValid = await form.trigger();

    if (!isFormDataValid) {
      return;
    }

    if (isLastStep) {
      onFinish(form.getValues());
      return;
    }

    setStepIndex((index) => {
      return index + 1;
    });

    return;
  };

  const prevStep = () => {
    if (isFirstStep) {
      return;
    }
    setStepIndex((index) => {
      return index - 1;
    });

    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
        className="w-full h-full flex flex-col gap-4"
      >
        <div className="w-full flex items-center justify-start">
          <h1 className="text-xl font-bold underline underline-offset-2">
            {steps[stepIndex].label}
          </h1>
        </div>
        <div className="w-full flex items-center justify-center mb-2">
          {steps[stepIndex].content}
        </div>
        <div className="w-full h-full flex flex-row gap-2 items-end justify-end border-t border-secondary pt-2 self-end">
          <div className={`self-start ${isFirstStep ? "hidden" : ""}`}>
            <Button variant="secondary" type="button" onClick={prevStep}>
              Zurück
            </Button>
          </div>
          <div className="self-center w-full flex flex-col items-center justify-center gap-1">
            <Progress
              value={((stepIndex + 1) / steps.length) * 100}
              max={100}
              className="w-[100%] h-2"
            />
          </div>
          <div className="self-end">
            <Button type="submit" variant="default">
              {isLastStep ? "Fertig" : "Weiter"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MultiStepForm;
