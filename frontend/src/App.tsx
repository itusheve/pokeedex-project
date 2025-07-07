import { useEffect, useMemo, useState } from "react";
import { usePokemons } from "./hooks/usePokemons";
import PokedexList from "./components/PokedexList";
import { Filter } from "./components/filter";
import { Sort } from "./components/Sort";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./theme/ThemeProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import "./styles.css";

const PAGE_SIZE = 20;

function App() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debouncedSetQuery = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val);
      }, 500),
    []
  );
  useEffect(() => {
    debouncedSetQuery(query);
    return () => debouncedSetQuery.cancel();
  }, [query, debouncedSetQuery]);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    usePokemons({
      sort,
      type,
      query: debouncedQuery,
      pageSize: PAGE_SIZE,
    });

  const pokemons = data?.pages?.flatMap((p) => p.results) ?? [];
  const total = data?.pages?.[0]?.total ?? 0;

  const [captured, setCaptured] = useState<number[]>([]);
  useEffect(() => {
    fetch("/api/captured")
      .then((r) => r.json())
      .then(setCaptured);
  }, []);

  const handleCapture = (number: number) => {
    fetch(`/api/capture/${number}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setCaptured(d.captured));
  };

  return (
    <ThemeProvider>
      <div className="container">
        <h1>Pokédex</h1>
        <ThemeToggle />
        <div className="controls">
          <Filter type={type} setType={setType} />
          <Sort sort={sort} setSort={setSort} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        {isLoading ? (
          <div>Loading…</div>
        ) : isError ? (
          <div style={{ color: "red" }}>Error: {(error as Error).message}</div>
        ) : (
          <InfiniteScroll
            dataLength={pokemons.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<div>Loading...</div>}
            endMessage={
              <div style={{ opacity: 0.6, textAlign: "center" }}>
                No more Pokémon!
              </div>
            }
            scrollThreshold={0.98}
          >
            <PokedexList
              pokemons={pokemons}
              captured={captured}
              onCapture={handleCapture}
            />
          </InfiniteScroll>
        )}
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.9em",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          Showing {pokemons.length} of {total} Pokémon
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
