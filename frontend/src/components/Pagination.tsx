export default function Pagination({
  total,
  page,
  size,
  setPage,
  setSize,
}: {
  total: number;
  page: number;
  size: number;
  setPage: (p: number) => void;
  setSize: (s: number) => void;
}) {
  const lastPage = Math.ceil(total / size);
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>
        Page {page} / {lastPage}
      </span>
      <button disabled={page >= lastPage} onClick={() => setPage(page + 1)}>
        Next
      </button>
      <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
        {[5, 10, 20, 50].map((s) => (
          <option value={s} key={s}>
            {s} per page
          </option>
        ))}
      </select>
    </div>
  );
}
