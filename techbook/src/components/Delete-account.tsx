import { deleteAccount, logout } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { PasswordInput } from "./Password-Input";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { ErrorBanner } from "./ui/Error-Banner";
import { Label } from "./ui/label";

const deleteSchema = z.object({
  password: z.string().min(1, "Requis."),
});
type DeleteValues = z.infer<typeof deleteSchema>;

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState("");

  const deleteForm = useForm<DeleteValues>({
    resolver: zodResolver(deleteSchema),
  });

  const onDeleteSubmit = async (data: DeleteValues) => {
    setDeleteError("");
    try {
      await deleteAccount(data.password);
      await logout();
      navigate("/login");
    } catch (err: any) {
      setDeleteError(
        err?.response?.data?.errors?.password?.[0] ?? "Mot de passe incorrect.",
      );
    }
  };
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Supprimer le compte</CardTitle>
        <CardDescription>
          Cette action est irréversible. Toutes vos données seront supprimées.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {deleteError && <ErrorBanner message={deleteError} />}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-2">
              Supprimer mon compte
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Entrez votre mot de passe pour confirmer. Cette action est
                définitive.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <form
              id="delete-form"
              onSubmit={deleteForm.handleSubmit(onDeleteSubmit)}
              className="space-y-3 py-2"
            >
              <div className="space-y-2">
                <Label htmlFor="delete_password">Mot de passe</Label>
                <PasswordInput
                  id="delete_password"
                  {...deleteForm.register("password")}
                />
                {deleteForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {deleteForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </form>

            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                form="delete-form"
                type="submit"
                className="bg-destructive hover:bg-destructive/90"
              >
                Supprimer définitivement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
