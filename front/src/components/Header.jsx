import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth'); // o donde tengas la página de login
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between shadow">
      <h1 className="text-2xl font-bold">Red Solidaria</h1>
      <nav className="space-x-4 flex items-center">
        <Link to="/" className='hover:underline'>Inicio</Link>
        <Link to="/productos" className='hover:underline'>Productos</Link>
        <Link to="/organizaciones" className='hover:underline'>Organizaciones</Link>
        <Link to="/donaciones" className='hover:underline'>Donaciones</Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  );
}