import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Certifique-se de que o caminho do Firestore está correto

export function Excluir() {
  const handleExcluir = async () => { // Renomear a função para evitar conflitos
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Excluir o documento do usuário no Firestore
        await deleteDoc(doc(db, "users", user.uid));
        localStorage.removeItem('user');
        
        await deleteUser(user);
        

        alert('Conta excluída com sucesso');
      } catch (error) {
        alert('Erro ao excluir a conta:', error.message);
      }
    } else {
      alert("Nenhuma conta encontrada ou o usuário não está logado");
    }
  };

  return (
    <button onClick={handleExcluir}>Excluir</button>
  );
}
