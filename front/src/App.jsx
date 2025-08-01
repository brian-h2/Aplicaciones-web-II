import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import Organizations from './components/Organizations'
import Header from './components/Header'
import NotFound from './components/NotFound'
import AuthPage from './components/AuthPage'
import PrivateRoute from './components/PrivateRoute'
import Footer from './components/Footer'
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-4 min-h-screen" >
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
              
            </PrivateRoute>
          } />
          <Route path="/productos" element={<Products />} />
          <Route path="/organizaciones" element={<Organizations />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}
