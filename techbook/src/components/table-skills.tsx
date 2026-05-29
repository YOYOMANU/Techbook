import { useTechnologies } from "../context/Technologies-context";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import TechnologyRow from "./technology-row";
import { CollectionPagination } from "./Collection-Pagination";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

export default function TableSkills() {
  const { collection, error, setPage, refresh } = useTechnologies();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!collection) return null;

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between">
        <h2>Toutes les technologies</h2>
        {pathname === "/" && (
          <Button
            onClick={() => navigate("/add")}
            className="hover:cursor-pointer mb-2"
          >
            <PlusIcon />
            Ajouter
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Favoris</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collection.data.map((technology, index) => (
            <TechnologyRow
              onDelete={refresh}
              technology={technology}
              key={index}
            />
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <CollectionPagination collection={collection} onPageChange={setPage} />
      </div>
    </div>
  );
}
