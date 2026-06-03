import type { PaginatedCollection, Technology } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  data: PaginatedCollection<Technology>;
};

const STATS = [
  { key: "total", label: "Technologies" },
  { key: "maitrises", label: "Maîtrisées" },
  { key: "en_cours", label: "En cours" },
  { key: "a_explorer", label: "À explorer" },
] as const;

export default function Recap({ data }: Props) {
  if (!data.stats) return null;

  return (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-20 mt-6 md:mt-10 px-4 md:px-0">
      {STATS.map(({ key, label }) => (
        <Card key={key} className="md:w-60 md:h-30 pl-3">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">
              {data.stats && data.stats[key]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base text-muted-foreground">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}