import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PaginatedCollection, Technology } from "../types";
import { getTechnologies, sortByField } from "../lib/api";

interface TechnologiesContextType {
  collection: PaginatedCollection<Technology> | null;
  recents: Technology[];
  loading: boolean;
  error: string | null;
  sort: string;
  setSort: (sort: string) => void;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  refresh: () => void;
}

const TechnologiesContext = createContext<TechnologiesContextType | null>(null);

import { useSearchParams } from "react-router-dom";

export function TechnologiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lire depuis l'URL au lieu d'un state local
  const page = parseInt(searchParams.get("page") ?? "1");
  const sort = searchParams.get("sort") ?? "";
  const search = searchParams.get("search") ?? "";

  const [collection, setCollection] =
    useState<PaginatedCollection<Technology> | null>(null);
  const [recents, setRecents] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    sortByField(sort, page, search)
      .then((result) => {
        if (!cancelled) {
          setCollection(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Erreur de chargement");
          setLoading(false);
        }
      });

    setLoading(true);
    return () => {
      cancelled = true;
    };
  }, [sort, page, search, refreshCount]);

  useEffect(() => {
    let cancelled = false;
    getTechnologies(1)
      .then((result) => {
        if (!cancelled) setRecents(result.recents ?? []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [refreshCount]);

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(newPage));
        return next;
      });
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (newSort: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("sort", newSort);
        if (newSort) next.set("sort", newSort);
        else next.delete("sort");
        next.set("page", "1"); // reset page
        return next;
      });
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (newSearch) next.set("search", newSearch);
        else next.delete("search");
        next.set("page", "1"); // reset page
        return next;
      });
    },
    [setSearchParams],
  );

  const handleRefresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  return (
    <TechnologiesContext.Provider
      value={{
        collection,
        recents,
        loading,
        error,
        sort,
        setSort,
        search,
        setSearch,
        page,
        setPage,
        refresh: handleRefresh,
      }}
    >
      {children}
    </TechnologiesContext.Provider>
  );
}

export function useTechnologies() {
  const ctx = useContext(TechnologiesContext);
  if (!ctx)
    throw new Error(
      "useTechnologies doit être utilisé dans TechnologiesProvider",
    );
  return ctx;
}
