import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CheckCircle, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const AccountEmailStep = () => {
  const { control, watch } = useFormContext();

  const [isEmailVerificationVisible, setIsEmailVerificationVisible] =
    useState(false);
  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const [isEmailVerificationCredenzaOpen, setIsEmailVerificationCredenzaOpen] =
    useState(false);
  const [isEmailVerificationSuccessful, setIsEmailVerificationSuccessful] =
    useState(false);

  const accountEmail = watch("accountEmail");

  useEffect(() => {
    if (!accountEmail) {
      return;
    }

    const emailSchema = z.string().email();
    const isEmailValid = emailSchema.safeParse(accountEmail);
    if (isEmailValid.success == true) {
      setIsEmailVerificationVisible(true);
      return;
    }
    setIsEmailVerificationVisible(false);
  }, [accountEmail, isEmailVerificationVisible, setIsEmailVerificationVisible]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center md:items-end">
      <FormField
        control={control}
        name="accountEmail"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Deine Email-Addresse</FormLabel>
            <FormControl>
              <Input placeholder="max.mustermann@beispiel.de" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isEmailVerificationVisible ? (
        <Credenza
          open={isEmailVerificationCredenzaOpen}
          onOpenChange={(open) => {
            setIsEmailVerificationCredenzaOpen(open);
          }}
        >
          <CredenzaTrigger asChild className="w-full md:w-fit">
            <Button
              type="button"
              variant="outline"
              disabled={isEmailVerificationSuccessful}
              className={`flex flex-row gap-2 w-full md:w-fit justify-center items-center ${isEmailVerificationSuccessful ? "bg-white hover:cursor-default hover:bg-white" : ""}`}
              onClick={async () => {
                console.log(accountEmail);
                return;
              }}
            >
              {isEmailVerificationSuccessful ? (
                <>
                  <CheckCircle className="w-5 h-5 stroke-green-950" />
                  <p className="text-primary">Verifiziert</p>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 stroke-red-500" />
                  <p className="text-red-500">Verifizieren</p>
                </>
              )}
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Email-Addresse verifizieren</CredenzaTitle>
              <CredenzaDescription className="text-left">
                Bitte verifizieren deine Email-Addresse um mit der Registrierung
                fortzufahren.
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="px-4 pb-3 space-y-2">
              <h2 className="font-bold text-lg">Verifizierungscode:</h2>
              <div className="w-full flex flex-col md:flex-row gap-2 items-center justify-center">
                <InputOTP
                  maxLength={6}
                  onChange={(value) => {
                    setEmailVerificationToken(value);
                    return;
                  }}
                  onComplete={async (value) => {
                    console.log(value);
                    setIsEmailVerificationCredenzaOpen(false);
                    setIsEmailVerificationSuccessful(true);
                    return;
                  }}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </CredenzaBody>
            <CredenzaFooter className="w-full flex flex-row gap-2">
              <CredenzaClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full p-0 m-0"
                >
                  Abbrechen
                </Button>
              </CredenzaClose>
              <CredenzaTrigger asChild>
                <Button
                  type="button"
                  className="w-full p-0 m-0"
                  variant="default"
                  onClick={async () => {
                    console.log(emailVerificationToken);
                    setIsEmailVerificationCredenzaOpen(false);
                    setIsEmailVerificationSuccessful(true);
                    return;
                  }}
                >
                  Verifizieren
                </Button>
              </CredenzaTrigger>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AccountEmailStep;
