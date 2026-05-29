import { useCallback, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateAvatar, destroyAvatar } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  CameraIcon,
  Loader2Icon,
  Trash2Icon,
  UploadCloudIcon,
} from "lucide-react";
import { SuccessBanner } from "./ui/Success-Banner";
import { ErrorBanner } from "./ui/Error-Banner";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024; // 2 Mo

export default function ProfileAvatar() {
  const { user, setUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndPreview(file);
  };

  const handleUpload = async () => {
    const file = pendingFile ?? inputRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await updateAvatar(file);
      setUser(res.user);
      setPreview(null);
      setPendingFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setSuccess("Photo de profil mise à jour.");
    } catch {
      setError("Erreur lors de l'upload. Max 2 Mo, formats : jpeg, png, webp.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setSuccess("");
    setError("");
    try {
      const res = await destroyAvatar();
      setUser(res.user);
      setSuccess("Photo supprimée.");
    } catch {
      setError("Erreur lors de la suppression.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setPendingFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const avatarSrc = preview ?? user?.avatar_url ?? "";
  const initials = user?.name.slice(0, 2).toUpperCase() ?? "??";

  const validateAndPreview = (file: File) => {
    setSuccess("");
    setError("");

    if (!ACCEPTED.includes(file.type)) {
      setError("Format non supporté. Utilisez jpeg, png ou webp.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Fichier trop lourd. Maximum 2 Mo.");
      return;
    }

    setPendingFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  // ── Drag & Drop ─────────────────────────────────────────────
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Ignore si on passe sur un enfant
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndPreview(file);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo de profil</CardTitle>
        <CardDescription>
          Formats acceptés : jpeg, png, webp. Taille max : 2 Mo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => !preview && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Avatar
              className={`h-20 w-20 transition-all duration-200 ${
                isDragging ? "ring-2 ring-primary ring-offset-2 scale-105" : ""
              }`}
            >
              <AvatarImage src={avatarSrc} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>

            {/* Overlay hover normal */}
            {!preview && !isDragging && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-6 w-6 text-white" />
              </div>
            )}

            {/* Overlay drag actif */}
            {isDragging && (
              <div className="absolute inset-0 bg-primary/60 rounded-full flex items-center justify-center">
                <UploadCloudIcon className="h-6 w-6 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1">
            {success && <SuccessBanner message={success} />}
            {error && <ErrorBanner message={error} />}

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            {!preview ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => inputRef.current?.click()}
                >
                  <CameraIcon className="h-4 w-4 mr-2" />
                  {user?.avatar_url ? "Changer la photo" : "Ajouter une photo"}
                </Button>

                {user?.avatar_url && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2Icon className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Button type="button" onClick={handleUpload} disabled={loading}>
                  {loading && (
                    <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {loading ? "Upload..." : "Enregistrer"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
