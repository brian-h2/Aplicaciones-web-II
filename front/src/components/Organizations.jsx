import { useEffect, useState } from 'react'
import { getOrganizaciones } from '../api/FetchClient.js';
import { MapPin } from 'lucide-react';

export default function Organizations() {
  const [orgs, setOrgs] = useState([])

  useEffect(() => {
    getOrganizaciones().then(res => setOrgs(res.data)).catch(console.error)
  }, [])

  return (
     <section className="py-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Organizaciones</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map(org => (
          <li
            key={org.Id_Organizacion}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{org.Nombre}</h3>

            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-red-500" />
              <span>{org.Ubicacion}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
