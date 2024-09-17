import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Certifique-se de que o caminho do Firestore está correto
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import styles from './excluir.module.css'

export function Excluir() {
  const[loading , setloading] = useState(false)
  const[message , setmessage] = useState(false)
  const handleExcluir = async () => { // Renomear a função para evitar conflitos
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setloading(true)
      try {
        // Excluir o documento do usuário no Firestore
        await deleteDoc(doc(db, "users", user.uid));
        localStorage.removeItem('user');
        
        await deleteUser(user);
        

        alert('Conta excluída com sucesso');
        setloading(false)
        window.location.href = "/";
      } catch (error) {
        alert('Erro ao excluir a conta:', error.message);
        setloading(false)
      }
    } else {
      alert("Nenhuma conta encontrada ou o usuário não está logado");
      setloading(false)
    }
  };

const confirmacao = () =>{
  setmessage(true)
}

  return (
    <>
    {loading ? (
      <div>
          <p>Carregando...</p>
      </div>
    ):(
      <>
      
      {message ? (
        <div className={styles.message}>
        <h1><CgDanger /></h1>
        <h3>Tem certeza que deseja excluir sua conta?</h3>

        <button  className={styles.cancelar} onClick={() => setmessage(false)}>Cancelar</button>
        <button  className={styles.excluir} onClick={handleExcluir}>Excluir</button>
        
        </div>) : (
          <button onClick={confirmacao}>Excluir</button>
        )}
      
      </>
    )}
    </>
    
  );
}
