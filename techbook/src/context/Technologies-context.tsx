import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PaginatedCollection, Technology } from "../types";
import { getTechnologies, sortByField } from "../lib/api";
import { useSearchParams } from "react-router-dom";

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
  updateTechnologyInState: (updated: Technology) => void;
}

const TechnologiesContext = createContext<TechnologiesContextType | null>(null);

export function TechnologiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

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
    setLoading(true);
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
      .catch(() => { });
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
        // ✅ Fix: supprimé la double écriture de sort
        if (newSort) next.set("sort", newSort);
        else next.delete("sort");
        next.set("page", "1");
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
        next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const handleRefresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  const updateTechnologyInState = useCallback((updated: Technology) => {
    setCollection((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.map((t) => (t.id === updated.id ? updated : t)),
      };
    });
    setRecents((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
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
        updateTechnologyInState,
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