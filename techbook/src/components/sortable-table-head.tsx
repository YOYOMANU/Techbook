import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "../lib/utils";
import { TableHead } from "./ui/table";

type Props = ComponentProps<typeof TableHead> & {
  field: string;
};

export function SortableTableHead({
  field,
  children,
  className,
  ...props
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";
  const currentDir = searchParams.get("dir") ?? "desc";
  const isActive = field === currentSort;

  const handleSort = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (isActive) {
        next.set("dir", currentDir === "asc" ? "desc" : "asc");
      } else {
        next.set("sort", field);
        next.set("dir", "desc");
      }
      next.set("page", "1"); // reset page au changement de tri
      return next;
    });
  };

  const getSortIcon = () => {
    if (!isActive) return <ArrowDownIcon size={16} className="opacity-50" />;
    return currentDir === "asc" ? (
      <ArrowUpIcon size={16} />
    ) : (
      <ArrowDownIcon size={16} />
    );
  };

  return (
    <TableHead
      {...props}
      className={cn(
        className,
        "cursor-pointer hover:text-foreground",
        isActive && "text-foreground",
      )}
      onClick={handleSort}
    >
      <div className="flex items-center gap-2">
        {children}
        {getSortIcon()}
      </div>
    </TableHead>
  );
}
