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
      <CardHeader className="px-4 pt-4 pb-2 md:p-6">
        <CardTitle className="text-lg md:text-xl">Photo de profil</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Formats acceptés : jpeg, png, webp. Taille max : 2 Mo.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 md:p-6">
        <div className="flex flex-row items-center gap-4">
          {/* Avatar */}
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => !preview && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Avatar className={`h-16 w-16 md:h-20 md:w-20 transition-all duration-200 ${isDragging ? "ring-2 ring-primary ring-offset-2 scale-105" : ""}`}>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback className="text-sm md:text-lg">{initials}</AvatarFallback>
            </Avatar>
            {!preview && !isDragging && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-5 w-5 text-white" />
              </div>
            )}
            {isDragging && (
              <div className="absolute inset-0 bg-primary/60 rounded-full flex items-center justify-center">
                <UploadCloudIcon className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex-1 space-y-2">
            {success && <SuccessBanner message={success} />}
            {error && <ErrorBanner message={error} />}
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />

            {!preview ? (
              <div className="flex gap-2 flex-wrap">
                <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} className="text-xs w-50 md:text-sm h-8 md:h-10">
                  <CameraIcon className="h-3 w-3 md:h- md:w-8 mr-2" />
                  {user?.avatar_url ? "Changer" : "Ajouter"}
                </Button>
                {user?.avatar_url && (
                  <Button type="button" variant="ghost" className="text-destructive hover:text-destructive h-8 md:h-10 text-xs md:text-sm" onClick={handleDelete} disabled={deleting}>
                    {deleting ? <Loader2Icon className="h-3 w-3 animate-spin" /> : <Trash2Icon className="h-3 w-3 md:h-4 md:w-4" />}
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Button type="button" onClick={handleUpload} disabled={loading} className="h-8 w-50 md:h-10 text-xs md:text-sm">
                  {loading && <Loader2Icon className="h-3 w-3 mr-2 animate-spin" />}
                  {loading ? "Upload..." : "Enregistrer"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} disabled={loading} className="h-8 md:h-10 text-xs md:text-sm">
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
