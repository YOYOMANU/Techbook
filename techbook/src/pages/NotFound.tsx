import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 md:gap-6 text-center px-3 md:px-4">
      <p className="text-6xl md:text-8xl font-bold text-muted-foreground/20">404</p>
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-xl md:text-2xl font-semibold">Page introuvable</h1>
        <p className="text-muted-foreground text-xs md:text-sm max-w-xs">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </div>
      <Button onClick={() => navigate("/")} className="text-xs md:text-sm h-8 md:h-10">
        <HomeIcon className="h-3 md:h-4 w-3 md:w-4 mr-2" />
        Retour à l'accueil
      </Button>
    </div>
  );
}
