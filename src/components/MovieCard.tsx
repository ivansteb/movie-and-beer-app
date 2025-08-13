import type { User } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaTrash } from "react-icons/fa";
import { db } from "../firebase/config";
import type { Movie } from "../types";
import RemoveMovieModal from "./RemoveMovieModal";

interface MovieCardProps {
  movie: Movie;
  currentUser: User | null;
}

// Mapeo de plataformas a colores de Tailwind
const platformStyles: Record<Movie["platform"], string> = {
  Netflix: "bg-netflix text-white",
  "HBO Max": "bg-hbo text-white",
  "Prime Video": "bg-prime text-white",
  "Disney+": "bg-disney text-white",
  Otro: "bg-gray-500 text-white",
};

const MovieCard = ({ movie, currentUser }: MovieCardProps) => {
  // Referencia al documento de la película en Firestore
  const movieRef = doc(db, "movies", movie.id);

  // Manejo del estado del modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleWatched = async () => {
    await updateDoc(movieRef, {
      isWatched: !movie.isWatched,
    });
  };

  const handleDelete = async () => {
    await deleteDoc(movieRef);
    setShowDeleteModal(false);
  };

  const canDelete = currentUser?.uid === movie.addedByUid;

  return (
    <article
      className={`relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 h-96 ${
        movie.isWatched ? "opacity-45" : "opacity-100"
      }`}
      style={{
        backgroundImage: `url(${movie.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa de gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* Contenido principal */}
      <section className="relative h-full flex flex-col p-4">
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
          <p className="text-gray-300 mb-1">
            <strong>Género:</strong> {movie.genre}
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Añadida por: {movie.addedByName}
          </p>

          <div className="mt-auto flex justify-between items-center">
            {currentUser ? (
              <button
                onClick={toggleWatched}
                className="text-gray-300 hover:text-white transition-colors"
                title={
                  movie.isWatched
                    ? "Marcar como pendiente para ver"
                    : "Marcar como vista"
                }
              >
                {movie.isWatched ? (
                  <FaRegEyeSlash
                    size={22}
                    className="text-gray-400 hover:text-white transition-colors"
                  />
                ) : (
                  <FaRegEye
                    size={22}
                    className="text-gray-500 hover:text-white transition-colors"
                  />
                )}
              </button>
            ) : (
              <span className="h-5"></span>
            )}
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                platformStyles[movie.platform]
              }`}
            >
              {movie.platform}
            </span>
          </div>
        </div>
      </section>

      {canDelete && (
        <button
          onClick={() => setShowDeleteModal(true)}
          className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors"
          aria-label="Eliminar película"
        >
          <FaTrash />
        </button>
      )}

      {/* Modal de confirmación para eliminar película */}
      {showDeleteModal && (
        <RemoveMovieModal
          title={movie.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </article>
  );
};

export default MovieCard;
