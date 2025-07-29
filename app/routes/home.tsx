import type { Route } from "./+types/home";
import React, { useState } from "react";
import { useOutletContext } from "react-router";
import type { FavoriteContextType } from "~/layouts/app-layout";
import { MovieCard } from "~/components/movie-card";

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
  const { favorites, isFavorite, handleLike, handleUnlike } =
    useOutletContext<FavoriteContextType>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
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
                <MovieCard key={movie.imdbID} movie={movie} isFavorite={isFavorite} handleLike={handleLike} handleUnlike={handleUnlike} />
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
              <MovieCard key={movie.imdbID} movie={movie} isFavorite={isFavorite} handleLike={handleLike} handleUnlike={handleUnlike} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
