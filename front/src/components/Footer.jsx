import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-600 to-green-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding y descripción */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-extrabold mb-4 tracking-tight">
              Red Solidaria
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Conectamos organizaciones con mercados para redistribuir productos antes de que se desperdicien, 
              construyendo un futuro más sostenible y solidario para todos.
            </p>
            <div className="flex items-center gap-2 text-blue-100">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Juntos contra el desperdicio alimentario</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <nav className="flex flex-col gap-2">
              <FooterLink to="/" label="Inicio" />
              <FooterLink to="/productos" label="Productos" />
              <FooterLink to="/organizaciones" label="Organizaciones" />
              <FooterLink to="/donaciones" label="Donaciones" />
            </nav>
          </div>

          {/* Contacto y redes */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-blue-100">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@redsolidaria.org</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Buenos Aires, Argentina</span>
              </div>
            </div>
            
            {/* Redes sociales */}
            <div className="flex gap-4">
              <SocialLink 
                href="https://facebook.com/redsolidaria" 
                icon={<Facebook className="w-5 h-5" />}
                label="Facebook"
              />
              <SocialLink 
                href="https://instagram.com/redsolidaria" 
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
              />
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-400/30 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-sm">
              © 2024 Red Solidaria. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacidad" className="text-blue-100 hover:text-white transition">
                Política de Privacidad
              </Link>
              <Link to="/terminos" className="text-blue-100 hover:text-white transition">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente para enlaces del footer
function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
    >
      {label}
    </Link>
  );
}

// Componente para redes sociales
function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
      aria-label={label}
    >
      {icon}
    </a>
  );
}