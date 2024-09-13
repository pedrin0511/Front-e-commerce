import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Config } from "../Config/config";
import styles from './Navbar.module.css'
import { IoLogInOutline,IoPersonAdd } from "react-icons/io5";
export function Navbar(){
const [user , setUser] = useState(null)

 useEffect(() => {
        const storUser = localStorage.getItem('user')
        if(setUser){
            setUser(JSON.parse(storUser))
        }else{
            setUser(null)
        }
 }, [])

    return(
        <div >
            {user ? (
               <nav className={styles.nav}>
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UtNT8bHaNnYB3nZ4hq7mgIaN9d2brEM1WA&s" alt="Logo marca" />
                <div>
                    <p>Olá, {user.displayName ? user.displayName : "Usuario"}</p>
                    <Config/>
                
                </div>
               </nav>
            ): (
                <nav className={styles.nav}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2UtNT8bHaNnYB3nZ4hq7mgIaN9d2brEM1WA&s" alt="Logo marca" />
                    <div className={styles.logar}>

                        <Link to="/register">
                        <div className={styles.registro}>
                            <span><IoPersonAdd/></span>
                            Registrar-se
                        </div>
                        </Link>

                        <Link to="/login">
                       <div className={styles.registro}>
                        <span><IoLogInOutline/></span>
                         Entrar
                       </div>
                        </Link>
                    </div>
                    
                </nav>
            )}
        </div>
    )
}