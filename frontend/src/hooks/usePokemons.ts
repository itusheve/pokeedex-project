import { useInfiniteQuery } from "@tanstack/react-query";
import { type Pokemon } from "../types";

interface ApiResult {
  results: Pokemon[];
  total: number;
  page: number;
  size: number;
}

interface Params {
  sort: "asc" | "desc";
  type: string;
  query: string;
  pageSize: number;
}

export function usePokemons(params: Params) {
  return useInfiniteQuery<ApiResult, Error>({
    queryKey: [
      "pokemons",
      params.sort,
      params.type,
      params.query,
      params.pageSize,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        page: String(pageParam),
        size: String(params.pageSize),
        sort: params.sort,
        ...(params.type && { type: params.type }),
        ...(params.query && { q: params.query }),
      });
      const res = await fetch(`/api/pokemons?${queryParams}`);
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.results.length, 0);
      if (loaded >= lastPage.total) return undefined;
      return lastPage.page + 1;
    },
  });
}

