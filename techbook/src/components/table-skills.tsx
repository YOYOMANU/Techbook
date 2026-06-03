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

  if (error) return <p className="text-center mt-8 text-red-500 px-2">{error}</p>;
  if (!collection) return null;

  return (
    <div className="w-full max-w-6xl mx-auto my-4 md:my-8 px-2 md:px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-4">
        <h2 className="text-sm md:text-base">Toutes les technologies</h2>
        {pathname === "/" && (
          <Button
            onClick={() => navigate("/add")}
            className="hover:cursor-pointer w-full md:w-auto text-xs md:text-sm"
            size="sm"
          >
            <PlusIcon className="w-3 h-3 md:w-4 md:h-4" />
            Ajouter
          </Button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24"> </TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Favoris</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collection.data.map((technology, index) => (
              <TechnologyRow onDelete={refresh} technology={technology} key={index} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border rounded-lg border overflow-hidden">
        {collection.data.map((technology, index) => (
          <TechnologyRow onDelete={refresh} technology={technology} key={index} mobile />
        ))}
      </div>

      <div className="mt-4">
        <CollectionPagination collection={collection} onPageChange={setPage} />
      </div>
    </div>
  );
}