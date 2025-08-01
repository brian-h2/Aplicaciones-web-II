import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth');
    setIsMobileMenuOpen(false); // Cerrar menú móvil
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-500 to-green-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans drop-shadow-md select-none">
            Red Solidaria
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" label="Inicio" />
            <NavLink to="/productos" label="Productos" />
            <NavLink to="/organizaciones" label="Organizaciones" />
            <NavLink to="/donaciones" label="Donaciones" />
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow transition-all duration-200 hover:scale-105 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Cerrar sesión
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col gap-2 pt-4">
              <MobileNavLink to="/" label="Inicio" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/productos" label="Productos" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/organizaciones" label="Organizaciones" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/donaciones" label="Donaciones" onClick={() => setIsMobileMenuOpen(false)} />
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow transition-all duration-200 hover:from-red-600 hover:to-pink-600 text-left"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Componente NavLink para desktop
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative px-3 py-1 text-lg font-medium text-white transition-all duration-200 rounded focus:outline-none focus:bg-white/10
        hover:text-green-100 hover:scale-105
        after:content-[''] after:block after:h-0.5 after:bg-green-200 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left
        hover:after:scale-x-100 focus:after:scale-x-100
      "
      style={{
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
      }}
    >
      {label}
    </Link>
  );
}

// Componente NavLink para móvil
function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
      style={{
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
      }}
    >
      {label}
    </Link>
  );
}