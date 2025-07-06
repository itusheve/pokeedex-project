const types = [
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison",
  "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

export function Filter({ type, setType }: { type: string; setType: (s: string) => void }) {
  return (
    <select value={type} onChange={(e) => setType(e.target.value)}>
      <option value="">All Types</option>
      {types.map((t) => (
        <option value={t} key={t}>{t}</option>
      ))}
    </select>
  );
}
