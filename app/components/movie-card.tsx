import { Link } from "react-router";

export const MovieCard = ({ movie, isFavorite, handleLike, handleUnlike }: { movie: any, isFavorite: (movie: any) => boolean, handleLike: (movie: any) => void, handleUnlike: (movie: any) => void }) => (
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
        <Link to={`/detail/${movie.imdbID}`} className="btn btn-sm btn-outline">Detail</Link>
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