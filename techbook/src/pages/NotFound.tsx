import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-8xl font-bold text-muted-foreground/20">404</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Page introuvable</h1>
        <p className="text-muted-foreground text-sm max-w-xs">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </div>
      <Button onClick={() => navigate("/")}>
        <HomeIcon className="h-4 w-4 mr-2" />
        Retour à l'accueil
      </Button>
    </div>
  );
}
