import { useState, type MouseEventHandler } from "react";

interface RemoveMovieModalProps {
  title: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const RemoveMovieModal = ({
  title,
  onConfirm,
  onCancel,
}: RemoveMovieModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      await onConfirm();
      // Componente padre maneja el cierre de modal
    } catch (error) {
      console.error("Error al eliminar la película:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className={`absolute top-3 right-3 text-gray-400 hover:text-white text-2xl ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">
          Confirmar eliminación
        </h2>

        {isDeleting ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mb-4"></div>
            <p className="text-white text-lg">Eliminando película...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-300">
              ¿Seguro que querés eliminar{" "}
              <span className="text-white font-bold">"{title}"</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                disabled={isDeleting}
                className="py-2 px-4 rounded font-medium text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveMovieModal;
