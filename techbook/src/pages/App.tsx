import Header from "../components/header";
import Recap from "../components/recap";
import FilterSkills from "../components/filter-skills";
import RecentlyItems from "../components/recently-items";
import TableSkills from "../components/table-skills";
import { useEffect } from "react";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTechnologies } from "../context/Technologies-context";
import { PlusIcon } from "lucide-react";

function App() {
  const location = useLocation();
  const { collection, loading } = useTechnologies();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  return (
    <>
      {/* ✅ Header toujours monté — jamais démontré pendant le loading
          sinon le form RHF se reset et la recherche/sort se perd */}
      <Header />

      {loading || !collection ? (
        <div className="flex justify-center items-center my-20 md:my-70 px-2">
          <Button variant="secondary" disabled size="sm" className="text-xs md:text-sm">
            <Spinner data-icon="inline-start" />
            Patienter
          </Button>
        </div>
      ) : (
        <>
          <Recap data={collection} />
          <RecentlyItems />
          <FilterSkills />
          {collection.data.length > 0 ? (
            <TableSkills />
          ) : (
            <div className="flex flex-col gap-3 justify-center items-center mt-10 md:my-25 px-4">
              <p className="text-xs md:text-sm text-muted-foreground">
                Aucune technologie pour l'instant
              </p>
              <Button
                onClick={() => navigate("/add")}
                className="hover:cursor-pointer w-full md:w-auto text-xs md:text-sm"
                size="sm"
              >
                <PlusIcon className="w-3 h-3 md:w-4 md:h-4" />
                Ajouter
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;