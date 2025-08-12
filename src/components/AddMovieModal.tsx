import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { FormEvent } from "react";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import type { Movie } from "../types";

interface AddMovieModalProps {
  onClose: () => void;
}

const AddMovieModal = ({ onClose }: AddMovieModalProps) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState<Movie["platform"]>("Netflix");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!title || !genre || !platform || !imageUrl) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!user) {
      setError("Debes estar logueado para añadir una película.");
      return;
    }

    try {
      await addDoc(collection(db, "movies"), {
        title,
        genre,
        platform,
        imageUrl,
        isWatched: false,
        addedByName: user.displayName || "Usuario Anónimo",
        addedByUid: user.uid,
        addedAt: serverTimestamp(),
      });
      onClose();
    } catch (err) {
      console.error("Error al añadir la película:", err);
      setError("No se pudo añadir la película. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">
          Añadir Nueva Película
        </h2>
        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título de la película"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Género(s)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="URL de la imagen/portada"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Movie["platform"])}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Netflix</option>
            <option>HBO Max</option>
            <option>Prime Video</option>
            <option>Disney+</option>
            <option>Otro</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Añadir a la Lista
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
