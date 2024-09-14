import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import styles from './login.module.css'
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, settype] = useState('password')
    const [olhar,setolhar] = useState(false)
    const [message,setmessage] = useState("")
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const auth = getAuth()
   
    
        const Login = async (e) =>{
            e.preventDefault()
            try{
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
          
                localStorage.setItem('user', JSON.stringify({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                }));
                
                setmessage('Sucesso!')
                setMessageType('success')
                setTimeout(()=>{
                  setmessage("")
                  navigate('/')
                },1000)
                
            }catch(error){
                setmessage('Tente novamente!')
                setMessageType('error')
                setTimeout(()=>{
                  setmessage("")
                },5000)
            }
        }
    

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
    
    
    return(
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
            <h2>Login</h2>
            <form onSubmit={Login}>
            
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
                    placeholder="Digite sua senha"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)
                    }
                    /> 
            </div>
            
                    
                     <div className={styles.entrar}>
                        <button type="submit">Entrar</button>
                     </div>
            </form>
            <p>Caso não tenha uma conta <Link to="/register">registre-se!</Link></p>
        </div>
    )
}

export default Login