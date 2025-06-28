import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/FetchClient.js';
import Swal from "sweetalert2";

const RegisterForm = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //Permite navegar

  const handleRegister = async (e) => {
    e.preventDefault();
        try {
            const { data } = await register({ username, password });
            Swal.fire({
                       title: "Registro exitoso!",
                       icon: "success"
                   })
            onSwitch(); // cambiar a pantalla de login
        } catch (error) {
            alert(error.response?.data?.message || 'Error al registrarse')
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Registrarse</h3>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full border px-3 py-2 rounded"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="mb-4 w-full border px-3 py-2 rounded"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
          >
            Registrarse
          </button>
        </form>
        <div className="text-center mt-4">
          <span>¿Ya tenés cuenta? </span>
          <button
            className="text-green-600 hover:underline"
            onClick={onSwitch}
            type="button"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;