import Header from "../components/header";
import Recap from "../components/recap";
import FilterSkills from "../components/filter-skills";
import RecentlyItems from "../components/recently-items";
import TableSkills from "../components/table-skills";
import { useEffect } from "react";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useTechnologies } from "../context/Technologies-context";
import { Label } from "@/components/ui/label";

function App() {
  const location = useLocation();
  const { collection, loading } = useTechnologies();

  // Toast après une redirect
  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);
      window.history.replaceState({}, "");
    }
  }, []);

  if (loading || !collection)
    return (
      <div className="flex justify-center items-center my-20 md:my-70 px-2">
        <Button variant="secondary" disabled size="sm" className="text-xs md:text-sm">
          <Spinner data-icon="inline-start" />
          Patienter
        </Button>
      </div>
    );

  return (
    <>
      <Header />
      <Recap data={collection} />
      <RecentlyItems />
      <FilterSkills />
      {collection.data.length > 0 ? (
        <TableSkills />
      ) : (
        <div className="flex justify-center items-center mt-10 md:my-25 px-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            Aucune technologie pour l'instant
          </p>
        </div>
      )}
    </>
  );
}

export default App;
