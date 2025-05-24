import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between shadow">
      <h1 className="text-2xl font-bold">Red Solidaria</h1>
      <nav className="space-x-4">
        <Link to="/" className='hover:underline'>Inicio</Link>
        <Link to="/productos" className='hover:underline'>Productos</Link>
        <Link to="/organizaciones" className='hover:underline'>Organizaciones</Link>
        <Link to="/donaciones" className='hover:underline'>Donaciones</Link>
      </nav>
    </header>
  )
}
