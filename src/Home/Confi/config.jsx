import { useState,useRef,useEffect } from "react"
import { Link } from "react-router-dom";
import { Sair } from "./Sair"
import { Excluir } from "./excluir"
import { CiSettings } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import styles from './config.module.css'
import { IoMdClose } from "react-icons/io";
import { motion , AnimatePresence} from "framer-motion";

export function Config(){
    const [config , setConfig] = useState(false)
    const configRef = useRef(null);
    const VerConfig = () => {
        setConfig(!config)
    }

    const handleClickOutside = (event) => {
        if (configRef.current && !configRef.current.contains(event.target)) {
          setConfig(false);  // Fecha as configurações se o clique for fora
        }
        
      };
    
      // Adiciona o event listener para cliques fora quando o menu está aberto
      useEffect(() => {
        if (config) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        // Cleanup ao desmontar o componente
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [config]);

      const fecharConfig = ()=>{
        setConfig(!config)
      }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={VerConfig}><CiSettings /> </button>
            
          {config  && <div className={styles.overlay}></div>}

            <div>
              <AnimatePresence>
               {config &&(
                <motion.div 
                className={styles.config}
                 ref={configRef}
                 initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                >
                  
                  <div className={styles.title}>
                     <h2>Configurações</h2>
                     <button onClick={fecharConfig}><IoMdClose /></button>
                  </div>

                <div className={styles.p}>
                  <Link to="/"><FaLocationDot /> Adicionar indereço</Link>
                </div>
               
               <div className={styles.p}>
                <Link to="/"><MdEdit /> Editar nome</Link> 
               </div>

               <div className={styles.p}>
               <Link to="/"><LuClipboardList /> Ver pedidos</Link> 
               </div>
                <div>
                   <Sair/>
                  <Excluir/> 
                </div>
                
            </motion.div>
            )} 
            </AnimatePresence>
            </div>
        </div>
    )
}