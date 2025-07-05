import { useState } from "react";
import { login } from "../api/FetchClient.js";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const LoginForm = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //Permite navegar

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const { data } = await login({ username, password })
        Swal.fire({
            title: "Inicio de sesion exitoso!",
            icon: "success"
        })
        localStorage.setItem('token', data.token);
        navigate('/')
    } catch (error) {
       Swal.fire({
        title: 'Error!',
        text: (error.response?.data?.message || 'Error al iniciar sesión'),
        icon: 'error',
      })
    }
  }

return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
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
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-4">
          <span>¿No tenés cuenta? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={onSwitch}
            type="button"
          >
            Registrate
          </button>
        </div>
      </div>
    </div>
  );

}

export default LoginForm;
