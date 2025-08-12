import type { User } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../firebase/config";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl md:text-2xl font-bold">🎬 Movie & Beer 🍻</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm">{user.displayName}</span>
            <img
              src={user.photoURL || ""}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Salir
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors duration-300"
          >
            <FcGoogle size={20} />
            <span className="hidden sm:inline">Login con Google</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
