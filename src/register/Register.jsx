import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Certifique-se de que os caminhos estejam corretos
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      // Cria o usuário com e-mail e senha
      const userValidacao = await createUserWithEmailAndPassword(auth,email,password)
      const user  = userValidacao.user

      await updateProfile(user,{displayName})

      await setDoc(doc(db, 'users',user.uid),{
        email,
        displayName
      })

      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));

      alert('sucesso')
      navigate('/')
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <div>
        <form onSubmit={handleSignUp}>
            <h2>Registrar</h2>
        <input
            type="text"
            placeholder="Nome de Usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Registrar</button>
        </form>
      <p>Caso já possua uma conta faça <Link to="/login">login</Link></p>
    </div>
  );
}

export default Register;
