import img from '../assets/background-home.webp';

export default function Home() {
  return (
    <>
      <section
        className="relative flex flex-col justify-center items-center w-full min-h-[80vh] py-16 md:py-24 mb-5"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay para oscurecer el fondo y mejorar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-700/60 z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg tracking-tight font-sans animate-fade-in-up opacity-0 animation-delay-300">
            Red Solidaria
          </h1>
          <p className="text-white text-center max-w-md sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-2xl font-medium drop-shadow-md animate-fade-in-up opacity-0 animation-delay-600">
            Ayudamos a conectar organizaciones con mercados para redistribuir productos antes de que se desperdicien.
          </p>
        </div>
      </section>

      {/* Estilos CSS personalizados para animaciones */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </>
  )
}