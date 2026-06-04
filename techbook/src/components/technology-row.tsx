import { Link, useNavigate } from "react-router-dom";
import type { Technology } from "../types";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { EditIcon, StarIcon, TrashIcon } from "lucide-react";
import { deleteTechnology } from "../lib/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Props = {
  technology: Technology;
  onDelete: () => void;
  mobile?: boolean;
};

export default function TechnologyRow({ technology, onDelete, mobile }: Props) {
  const navigation = useNavigate();

  const handleDelete = async () => {
    await deleteTechnology(technology.id);
    onDelete();
    toast.success("Technologie supprimée avec succès !");
  };

  const DeleteButton = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className={mobile ? "h-7 w-7 p-0" : "h-8 w-8 p-0"}>
          <TrashIcon className={mobile ? "w-3 h-3" : "w-3 h-3"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer la technologie</AlertDialogTitle>
          <AlertDialogDescription>
            Voulez-vous vraiment supprimer <span className="font-medium text-foreground">{technology.name}</span> ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (mobile) {
    return (
      <div className="p-3 hover:bg-muted/40 transition-colors">
        <div className="flex gap-3 items-start">
          <div onClick={() => navigation(`/edit/${technology.id}`)} className="shrink-0 cursor-pointer">
            {technology.image ? (
              <img src={technology.image} alt={technology.name} className="rounded aspect-square w-12 object-cover" />
            ) : (
              <div className="aspect-square w-12 bg-muted rounded" />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm font-medium truncate">{technology.name}</p>
            <div className="flex flex-wrap gap-1">
              {(technology.categories ?? []).map((c) => (
                <span key={c.id} className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">
                  {c.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{technology.level.name}</span>
              {technology.favoris && <StarIcon fill="yellow" color="yellow" className="w-3 h-3" />}
            </div>
          </div>

          <div className="flex flex-col gap-1 shrink-0">
            <Button onClick={() => navigation(`/edit/${technology.id}`)} size="sm" variant="outline" className="h-7 w-7 p-0">
              <EditIcon className="w-3 h-3" />
            </Button>
            {DeleteButton}
          </div>
        </div>
      </div>
    );
  }

  return (
    <TableRow className="hover:cursor-pointer">
      <TableCell className="p-2 md:p-3" onClick={() => navigation(`/edit/${technology.id}`)}>
        {technology.image ? (
          <img src={technology.image} alt={technology.name} className="rounded-lg aspect-square w-12 md:w-20 object-cover" />
        ) : (
          <div className="aspect-square w-12 md:w-20 bg-background rounded-lg" />
        )}
      </TableCell>
      <TableCell className="text-xs md:text-sm">{technology.name}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {(technology.categories ?? []).map((c) => (
            <span key={c.id} className="bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs">{c.name}</span>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-xs md:text-sm">{technology.level.name}</TableCell>
      <TableCell className="text-center">
        <StarIcon fill={technology.favoris ? "yellow" : "none"} color="yellow" className="w-4 h-4 md:w-5 md:h-5 mx-auto" />
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-1">
          <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0">
            <Link to={`/edit/${technology.id}`}><EditIcon className="w-3 h-3" /></Link>
          </Button>
          {DeleteButton}
        </div>
      </TableCell>
    </TableRow>
  );
}