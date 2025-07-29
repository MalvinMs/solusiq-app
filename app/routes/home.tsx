import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Home Page!" },
  ];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<any[]>([]);


  useEffect(() => {
    const fav = localStorage.getItem("favorite_movies");
    if (fav) {
      setFavorites(JSON.parse(fav));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite_movies", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setMovies([]);
    try {

      const apiKey = '2082ce3d'
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (movie: any) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleLike = (movie: any) => {
    if (!isFavorite(movie)) {
      setFavorites([movie, ...favorites]);
    }
  };

  const handleUnlike = (movie: any) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
  };

  const MovieCard = ({ movie }: { movie: any }) => (
    <div key={movie.imdbID} className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x445?text=No+Image"
          }
          alt={movie.Title}
          className="w-full h-72 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.Title}</h2>
        <p>{movie.Year}</p>
        <div className="card-actions justify-between items-center">
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline"
          >
            Lihat di IMDB
          </a>
          {isFavorite(movie) ? (
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleUnlike(movie)}
              title="Hapus dari Favorit"
            >
              ♥
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleLike(movie)}
              title="Like"
            >
              ♡
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-10 min-h-screen bg-base-200">
      <section className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Cari Film</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Cari judul film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Mencari..." : "Cari"}
          </button>
        </form>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        {/* Hasil pencarian */}
        {movies.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Hasil Pencarian</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}
        {/* Film favorit */}
        <h2 className="text-2xl font-semibold mb-4">Film Favorit</h2>
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500">
            Belum ada film favorit.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
