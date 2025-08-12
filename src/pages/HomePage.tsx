import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddMovieModal from "../components/AddMovieModal";
import MovieCard from "../components/MovieCard";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import type { Movie } from "../types";

const HomePage = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Creamos una consulta a la colección 'movies', ordenadas por fecha de creación.
    const q = query(collection(db, "movies"), orderBy("addedAt", "desc"));

    // onSnapshot es el listener en tiempo real de Firestore.
    // Se ejecuta una vez al principio y luego cada vez que los datos cambian.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const moviesData: Movie[] = [];
      querySnapshot.forEach((doc) => {
        // Unimos el ID del documento con el resto de los datos.
        moviesData.push({ id: doc.id, ...doc.data() } as Movie);
      });
      setMovies(moviesData);
      setIsLoading(false);
    });

    // Limpiamos la suscripción al desmontar el componente.
    return () => unsubscribe();
  }, []);

  const watchedMovies = movies.filter((m) => m.isWatched);
  const pendingMovies = movies.filter((m) => !m.isWatched);

  return (
    <main className="container mx-auto p-4 md:p-8">
      {user && (
        <div className="text-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Añadir película
          </button>
        </div>
      )}

      {isModalOpen && <AddMovieModal onClose={() => setIsModalOpen(false)} />}

      {isLoading ? (
        <p className="text-center text-white text-xl">Cargando películas...</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-gray-600 pb-2">
            Pendientes
          </h2>
          {pendingMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} currentUser={user} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Epa... no hay nada. Añadí una peli.
            </p>
          )}

          {watchedMovies.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-white mt-12 mb-6 border-b-2 border-gray-600 pb-2">
                Vistas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {watchedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} currentUser={user} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;
