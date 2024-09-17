import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Certifique-se de que os caminhos estejam corretos
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GiReturnArrow } from "react-icons/gi";
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import { IoIosEyeOff, IoIosEye, IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import style from "../login/login.module.css"
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [type, settype] = useState('password')
    const [olhar,setolhar] = useState(false)
    const [message,setmessage] = useState("")
    const [messageType, setMessageType] = useState('');
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

      setmessage('Conta criada com sucesso!')
      setMessageType('success')
      setTimeout(()=>{
        setmessage("")
        navigate('/')
      },5000)
      
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);

      setmessage('Tente trocar o email!')
      setMessageType('error')
      setTimeout(()=>{
        setmessage("")
      },5000)
    }
  };

  function verSenha(e){
    e.preventDefault()

    if( type === 'password'){
        settype('text')
        setolhar(true)
        
    }else{
        settype('password')
        setolhar(false)
    }
}

  return (
    <div  className={style.body}>
    <div className={styles.container}>
      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>
          {message}
        </div>
      )}
      <span className={styles.voltar}><Link to="/"><GiReturnArrow/></Link></span>
      <div className={styles.icon}>
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UtNT8bHaNnYB3nZ4hq7mgIaN9d2brEM1WA&s" alt="" />
            </div>
        <form onSubmit={handleSignUp}>
            <h2>Registrar</h2>
          <div className={styles.input}>
            <span><IoMdPerson /></span>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={displayName}
            required
            onChange={(e) => setDisplayName(e.target.value)}
        />
          </div>
        
        <div className={styles.input}>
                <span><MdEmail/></span>
                <input 
                 type="email"
                 placeholder="Email"
                 value={email}
                 required
                 onChange={(e) => setEmail(e.target.value)}
                 /> 
            </div>
            <div className={styles.input}>

                <div className={styles.ver}>
                {!olhar ? ( <button  onClick={verSenha}><IoIosEyeOff /></button>) : ( <button onClick={verSenha} ><IoIosEye /></button>)}
                </div>
                  <input 
                    type={type}
                    placeholder="Senha"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)
                    }
                    /> 
            </div>

            <div className={styles.entrar}>
                <button type="submit">Registrar-se</button>
            </div>
       
        </form>
      <p>Caso já possua uma conta faça <Link to="/login">login!</Link></p>
    </div>
    </div>
  );
}

export default Register;
