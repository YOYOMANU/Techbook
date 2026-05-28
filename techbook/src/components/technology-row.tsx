import { Link, useNavigate } from "react-router-dom";
import type { Technology } from "../types";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { EditIcon, StarIcon, TrashIcon } from "lucide-react";
import { deleteTechnology } from "../lib/api";
import { toast } from "sonner";

type Props = {
  technology: Technology;
  onDelete: () => void;
};

export default function TechnologyRow({ technology, onDelete }: Props) {
  const navigation = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const choice = confirm("Voulez vous vraiment supprimé cette technologie !");
    if (choice) {
      await deleteTechnology(technology.id);
      onDelete();
      toast.success("Technologie supprimée avec succès !");
    } else {
      return;
    }
    // ← déclenche le refresh dans le parent
  };

  return (
    <TableRow
      // onClick={() => navigate(`/edit/${technology.id}`)}
      className="hover:cursor-pointer"
    >
      <TableCell onClick={() => navigation(`/edit/${technology.id}`)}>
        {technology.image ? (
          <img
            src={technology.image}
            alt={technology.name}
            className="rounded-lg aspect-square w-20 object-cover"
          />
        ) : (
          <div className="aspect-square size-20 bg-background" />
        )}
      </TableCell>
      <TableCell> {technology.name} </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {(technology.categories ?? []).map((c) => (
            <span
              key={c.id}
              className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs"
            >
              {c.name}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell> {technology.level.name} </TableCell>
      <TableCell>
        {technology.favoris ? (
          <StarIcon fill={"yellow"} color="yellow" width={20} />
        ) : (
          <StarIcon color="yellow" width={20} />
        )}
      </TableCell>
      <TableCell>
        <div className="item-center flex justify-end gap-2">
          <Button asChild size="icon" variant="outline">
            <Link to={`/edit/${technology.id}`}>
              <EditIcon size={16} />
            </Link>
          </Button>
          <Button
            onClick={(e) => handleDelete(e)}
            asChild
            size="icon"
            variant="destructive"
          >
            <Link to={"#"}>
              <TrashIcon size={16} />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
