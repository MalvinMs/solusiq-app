import { Outlet } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { useEffect, useState } from "react";

export type FavoriteContextType = {
  favorites: any[];
  isFavorite: (movie: any) => boolean;
  handleLike: (movie: any) => void;
  handleUnlike: (movie: any) => void;
};


export default function AppLayout() {
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


  return (
    <main className="container mx-auto">
      <Navbar />
      <Outlet context={{ favorites, isFavorite, handleLike, handleUnlike }} />
      <Footer />
    </main>
  );
}
