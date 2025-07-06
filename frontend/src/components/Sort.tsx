export function Sort({ sort, setSort }: { sort: "asc" | "desc"; setSort: (s: "asc" | "desc") => void }) {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value as "asc" | "desc")}>
      <option value="asc">Number ↑</option>
      <option value="desc">Number ↓</option>
    </select>
  );
}
