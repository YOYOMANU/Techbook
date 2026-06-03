import type { PaginatedCollection } from "../types/index.d";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  collection: PaginatedCollection<unknown>;
  onPageChange: (page: number) => void; // ← callback vers le parent
};

export function CollectionPagination({ collection, onPageChange }: Props) {
  if (!collection?.meta) return null;

  const extractPage = (url: string | null): number | null => {
    if (!url) return null;
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
      <div className="text-muted-foreground hidden md:flex text-xs md:text-sm flex-1">
        Page {collection.meta.current_page} sur {collection.meta.last_page}
      </div>
      <nav role="navigation" aria-label="Pagination">
        <ul className="flex items-center gap-1">
          {collection.meta.links.map((link, index) => {
            const page = extractPage(link.url);
            return (
              <li key={index}>
                <Button
                  disabled={link.url === null}
                  aria-current={link.active ? "page" : undefined}
                  data-active={link.active}
                  variant={link.active ? "outline" : "ghost"}
                  size="sm"
                  className="h-8 w-8 md:h-10 md:w-10 text-xs md:text-sm p-0"
                  onClick={() => page && onPageChange(page)}
                >
                  {label(link.label, index, collection.meta.links.length)}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function label(s: string, index: number, count: number): ReactNode {
  if (index === 0) return <ChevronLeftIcon />;
  if (index === count - 1) return <ChevronRightIcon />;
  return s;
}
