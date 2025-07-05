import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { leerJson, escribirJson } from "../utils/fileUtils.js";
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) 
        return res.status(400).json({error: 'Usuario y contraseña requeridos'});

    const users = leerJson('users.json');

    const userExists = users.find(u => u.username === username);
        if (userExists)
            return res.status(409).json({ error: 'El usuario ya existe' });

    // Encriptamos contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Creacion de usuario
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };

    
    users.push(newUser);
    escribirJson('users.json', users);

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
}


export const loginUser = async (req,res) => {
    const {username, password} = req.body;

    if (!username || !password) 
        return res.status(400).json({error: 'Usuario y contraseña requeridos'});

    const users = leerJson('users.json');
    const userFind = users.find(u => u.username == username)
   
    if (!userFind)
    return res.status(401).json({ error: 'Usuario inválido' });

    // Esperamos validacion de contraseña 
    const validPassword = await bcrypt.compare(password, userFind.password);
    
    if (!validPassword)
    return res.status(401).json({ error: 'Contraseña inválida' });

    const token = jwt.sign(
        { id: userFind.id, username: userFind.username },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
}