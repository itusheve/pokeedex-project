import { type Pokemon } from "../types";
import PokedexItem from "./PokedexItem";

export default function PokedexList({
  pokemons,
  captured,
  onCapture,
}: {
  pokemons: Pokemon[];
  captured: number[];
  onCapture: (number: number) => void;
}) {
  if (!pokemons.length) return <div>No Pokemons found.</div>;
  return (
    <div className="pokedex-list">
      {pokemons.map((p) => (
        <PokedexItem
          key={p.name}
          pokemon={p}
          captured={captured.includes(p.number)}
          onCapture={onCapture}
        />
      ))}
    </div>
  );
}
