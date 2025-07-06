from flask import Flask, jsonify, request
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app) 


captured = set()


_pokemons = None
def get_pokemons_cache():
    global _pokemons
    if _pokemons is None:
        _pokemons = db.get()
    return _pokemons

@app.route('/icon/<name>')
def get_icon_url(name: str):
    name = name.lower()
    return jsonify({"url": f"https://img.pokemondb.net/sprites/silver/normal/{name}.png"})

@app.route('/api/pokemons')
def get_pokemons():
    pokemons = get_pokemons_cache()
    # Query params
    page = int(request.args.get("page", 1))
    size = int(request.args.get("size", 20))
    sort = request.args.get("sort", "asc")
    ptype = request.args.get("type", "").strip()
    query = request.args.get("q", "").lower()

    # Filtering
    filtered = pokemons
    if ptype:
        filtered = [p for p in filtered if ptype.lower() in (p["type_one"].lower(), p["type_two"].lower())]
    if query:
        filtered = [p for p in filtered if query in p["name"].lower()]

    # Sorting
    filtered = sorted(filtered, key=lambda x: x["number"], reverse=(sort == "desc"))

    # Pagination
    total = len(filtered)
    start = (page - 1) * size
    end = start + size
    page_items = filtered[start:end]

    return jsonify({
        "total": total,
        "page": page,
        "size": size,
        "results": page_items,
    })

@app.route("/api/capture/<int:number>", methods=["POST"])
def capture(number):
    captured.add(number)
    return jsonify({"success": True, "captured": list(captured)})

@app.route("/api/captured")
def get_captured():
    return jsonify(list(captured))

@app.route('/')
def hello():
    return jsonify({"ok": True, "endpoints": ["/api/pokemons", "/icon/<name>", "/api/captured", "/api/capture/<number>"]})

if __name__ == '__main__':
    app.run(port=8080)
