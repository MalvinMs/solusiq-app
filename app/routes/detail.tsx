import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router";
import type { FavoriteContextType } from "~/layouts/app-layout";

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isFavorite, handleLike, handleUnlike } =
    useOutletContext<FavoriteContextType>();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-80"
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/320x480?text=No+Image"
              }
              alt={movie.Title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {movie.Type}
            </div>
            <h1 className="text-3xl font-bold mt-1">{movie.Title}</h1>
            <p className="mt-2 text-gray-500">{movie.Year}</p>
            <div className="mt-4">
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <p className="mt-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
            <div className="mt-6">
              {isFavorite(movie) ? (
                <button
                  className="btn btn-error"
                  onClick={() => handleUnlike(movie)}
                  title="Hapus dari Favorit"
                >
                  ♥ Hapus dari Favorit
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleLike(movie)}
                  title="Tambah ke Favorit"
                >
                  ♡ Tambah ke Favorit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}