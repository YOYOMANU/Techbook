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

function App() {
  const location = useLocation();
  const { collection, loading } = useTechnologies();

  // Toast après une redirect
  useEffect(() => {
    if (location.state?.toast) {
      toast.success(location.state.toast);
      window.history.replaceState({}, "");
    }
  }, [location.state?.toast]);

  if (loading || !collection)
    return (
      <div className="flex justify-center items-center my-70">
        <Button variant="secondary" disabled size="sm">
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
      <TableSkills />
    </>
  );
}

export default App;
