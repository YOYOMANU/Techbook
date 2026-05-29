export type RecapElement = {
  count: number;
  description: string;
}[];

export interface Technology {
  id: number;
  name: string;
  description?: string;
  categories: category[];
  level: Level;
  favoris: boolean;
  status: status;
  image?: string;
}

export type Category = {
  id: number;
  name: string;
};
export type Level = {
  id: number;
  name: string;
};
export type Status = {
  id: number;
  name: string;
};
export type PaginatedCollection<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };

  stats?: {
    total: number;
    maitrises: number;
    en_cours: number;
    a_explorer: number;
  };
  recents: Technology[];
};
