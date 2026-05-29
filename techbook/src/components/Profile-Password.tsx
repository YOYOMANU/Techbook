import { updatePassword } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SuccessBanner } from "./ui/Success-Banner";
import { ErrorBanner } from "./ui/Error-Banner";
import { PasswordInput } from "./Password-Input";
import { Label } from "../components/ui/label";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Requis."),
    password: z
      .string()
      .min(8, "Minimum 8 caractères.")
      .regex(/[A-Z]/, "Au moins une majuscule.")
      .regex(/[0-9]/, "Au moins un chiffre."),
    password_confirmation: z.string().min(1, "Requis."),
  })
  .refine((d) => d.password === d.password_confirmation, {
    path: ["password_confirmation"],
    message: "Les mots de passe ne correspondent pas.",
  });
type PasswordValues = z.infer<typeof passwordSchema>;
export default function ProfilePassword() {
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = async (data: PasswordValues) => {
    setPwSuccess("");
    setPwError("");
    try {
      await updatePassword(
        data.current_password,
        data.password,
        data.password_confirmation,
      );
      setPwSuccess("Mot de passe mis à jour.");
      passwordForm.reset();
    } catch (err: any) {
      setPwError(
        err?.response?.data?.errors?.current_password?.[0] ??
          "Une erreur est survenue.",
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mot de passe</CardTitle>
        <CardDescription>
          Choisissez un mot de passe fort et unique.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          {pwSuccess && <SuccessBanner message={pwSuccess} />}
          {pwError && <ErrorBanner message={pwError} />}

          <div className="space-y-2">
            <Label htmlFor="current_password">Mot de passe actuel</Label>
            <PasswordInput
              id="current_password"
              {...passwordForm.register("current_password")}
            />
            {passwordForm.formState.errors.current_password && (
              <p className="text-xs text-destructive">
                {passwordForm.formState.errors.current_password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password">Nouveau mot de passe</Label>
            <PasswordInput
              id="new_password"
              {...passwordForm.register("password")}
            />
            {passwordForm.formState.errors.password && (
              <p className="text-xs text-destructive">
                {passwordForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmer</Label>
            <PasswordInput
              id="password_confirmation"
              {...passwordForm.register("password_confirmation")}
            />
            {passwordForm.formState.errors.password_confirmation && (
              <p className="text-xs text-destructive">
                {passwordForm.formState.errors.password_confirmation.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
            {passwordForm.formState.isSubmitting
              ? "Mise à jour..."
              : "Mettre à jour"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
