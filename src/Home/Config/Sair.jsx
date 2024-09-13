import { getAuth, signOut } from "firebase/auth";

export function Sair(){

    const sair = ()=>{
         const auth = getAuth();
  
    signOut(auth)
      .then(() => {
        console.log("Usuário deslogado com sucesso");
        localStorage.removeItem('user');
        
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
    }

   
    return(
        <button onClick={sair}>Sair</button>
    )
}