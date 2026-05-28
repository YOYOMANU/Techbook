import { useTechnologies } from "../context/Technologies-context";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import TechnologyRow from "./technology-row";
import { CollectionPagination } from "./Collection-Pagination";

export default function TableSkills() {
  const { collection, loading, error, setPage, refresh } = useTechnologies();

  if (loading) return <p className="text-center mt-8">Chargement...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!collection) return null;

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h2>Toutes les technologies</h2>
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
