import { type Pokemon } from "../types";

export default function PokedexItem({
  pokemon,
  captured,
  onCapture,
}: {
  pokemon: Pokemon;
  captured: boolean;
  onCapture: (number: number) => void;
}) {
  return (
    <div className={`pokedex-item ${captured ? "captured" : ""}`}>
      <img
        src={`/icon/${pokemon.name.toLowerCase()}`}
        alt={pokemon.name}
        width={48}
        height={48}
        onError={(e) => ((e.target as HTMLImageElement).src = "/fallback.png")}
      />
      <div className="info">
        <div>
          <b>#{pokemon.number}</b> {pokemon.name}
        </div>
        <div>
          {pokemon.type_one}
          {pokemon.type_two && ` / ${pokemon.type_two}`}
        </div>
        <button disabled={captured} onClick={() => onCapture(pokemon.number)}>
          {captured ? "Captured!" : "Capture"}
        </button>
      </div>
    </div>
  );
}
