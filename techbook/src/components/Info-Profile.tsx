import z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SuccessBanner } from "./ui/Success-Banner";
import { Label } from "./ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { ErrorBanner } from "./ui/Error-Banner";

const profileSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères.").max(50),
  email: z.string().email("Email invalide."),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function InfoProfile() {
  const { user, setUser } = useAuth();
  // ── Infos profil ──
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const onProfileSubmit = async (data: ProfileValues) => {
    setProfileSuccess("");
    setProfileError("");
    try {
      const res = await updateProfile(data.name, data.email);
      setUser(res.user);
      setProfileSuccess("Profil mis à jour avec succès.");
    } catch {
      setProfileError("Une erreur est survenue.");
    }
  };
  return (
    <Card className="p-3 md:p-6">
      <CardHeader className="px-4 pt-4 pb-2 md:p-6">
        <CardTitle className="text-lg md:text-xl">Informations du profil</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Mettez à jour votre nom et votre adresse email.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 md:p-6">
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-3 md:space-y-4"
        >
          {profileSuccess && <SuccessBanner message={profileSuccess} />}
          {profileError && <ErrorBanner message={profileError} />}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs md:text-sm">Nom complet</Label>
            <Input
              id="name"
              {...profileForm.register("name")}
              aria-invalid={!!profileForm.formState.errors.name}
              className="text-xs md:text-sm h-8 md:h-10"
            />
            {profileForm.formState.errors.name && (
              <p className="text-xs text-destructive">
                {profileForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              {...profileForm.register("email")}
              aria-invalid={!!profileForm.formState.errors.email}
              className="text-xs md:text-sm h-8 md:h-10"
            />
            {profileForm.formState.errors.email && (
              <p className="text-xs text-destructive">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={profileForm.formState.isSubmitting} className="text-xs md:text-sm h-8 md:h-10">
            {profileForm.formState.isSubmitting
              ? "Enregistrement..."
              : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
