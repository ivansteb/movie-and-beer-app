import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      <Header user={user} />
      <HomePage />
    </div>
  );
}

export default App;
