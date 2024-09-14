import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Certifique-se de que o caminho do Firestore está correto
import { useState } from "react";

export function Excluir() {
  const[loading , setloading] = useState(false)

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

  return (
    <>
    {loading ? (
      <div>
          <p>Carregando...</p>
      </div>
    ):(
      <button onClick={handleExcluir}>Excluir</button>
    )}
    
    </>
    
  );
}
