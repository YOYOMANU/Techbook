import { useTechnologies } from "../context/Technologies-context";
import { Button } from "./ui/button";
import {
  LayoutGrid,
  Server,
  Database,
  Brain,
  Cloud,
  LayoutPanelLeft,
} from "lucide-react";

const FILTERS = [
  { label: "Tout", value: "", icon: LayoutGrid },
  { label: "Backend", value: "back-end", icon: Server },
  { label: "Frontend", value: "front-end", icon: LayoutPanelLeft },
  { label: "Base de donnée", value: "bdd", icon: Database },
  { label: "Cloud & Devops", value: "cloud & devops", icon: Cloud },
  { label: "IA & ML", value: "ia & ml", icon: Brain },
];

export default function FilterSkills() {
  const { sort, setSort } = useTechnologies();

  return (
    <div className="flex justify-center mt-10 gap-5">
      {FILTERS.map(({ label, value, icon: Icon }) => (
        <Button
          key={label}
          className="rounded-3xl"
          variant={sort === value ? "default" : "outline"}
          onClick={() => setSort(value)}
        >
          <Icon /> {label}
        </Button>
      ))}
    </div>
  );
}
