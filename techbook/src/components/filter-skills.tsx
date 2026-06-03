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
  { label: "Tout", value: "", icon: LayoutGrid, labelMobile: "Tout" },
  { label: "Backend", value: "back-end", icon: Server, labelMobile: "Backend" },
  { label: "Frontend", value: "front-end", icon: LayoutPanelLeft, labelMobile: "Frontend" },
  { label: "Base de donnée", value: "bdd", icon: Database, labelMobile: "BDD" },
  { label: "Cloud & Devops", value: "cloud & devops", icon: Cloud, labelMobile: "Cloud" },
  { label: "IA & ML", value: "ia & ml", icon: Brain, labelMobile: "IA & ML" },
];

export default function FilterSkills() {
  const { sort, setSort } = useTechnologies();

  return (
    <div className="mt-4 md:mt-10">
      {/* Mobile : scroll horizontal */}
      <div className="flex md:hidden gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {FILTERS.map(({ labelMobile, value, icon: Icon }) => (
          <Button
            key={value}
            className="rounded-3xl shrink-0"
            variant={sort === value ? "default" : "outline"}
            onClick={() => setSort(value)}
            size="sm"
          >
            <Icon className="w-3.5 h-3.5 mr-1.5" />
            {labelMobile}
          </Button>
        ))}
      </div>

      {/* Desktop : wrap centré */}
      <div className="hidden md:flex flex-wrap justify-center gap-5">
        {FILTERS.map(({ label, value, icon: Icon }) => (
          <Button
            key={value}
            className="rounded-3xl"
            variant={sort === value ? "default" : "outline"}
            onClick={() => setSort(value)}
          >
            <Icon className="w-4 h-4 mr-1" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}