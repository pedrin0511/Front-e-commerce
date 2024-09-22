import { useState } from 'react';
import styles from './View.module.css'
import { GiReturnArrow } from "react-icons/gi";
import { Link , useNavigate} from 'react-router-dom';
import { MdOutlineDeliveryDining,MdChat } from "react-icons/md";
import { Car } from '../Car/Car';


export function View (){
    const navigate = useNavigate()
    const [carregar,setCarregar] = useState(false)
    const produto = JSON.parse(localStorage.getItem('produtoSelecionado'))
    const [observacão ,setObservacao ] = useState("")
   
    const [QuantNum,setQuantNum] = useState(1)
    const[PrecoQuantidade , setPrecoQuantidade] = useState(produto.price)




const aumentar = () => {
    setQuantNum(QuantNum + 1);
    setPrecoQuantidade((prevPrecoQuantidade) => {
      const novoPreco = prevPrecoQuantidade + produto.price;
      return parseFloat(novoPreco.toFixed(2)); // Limita para 2 casas decimais
    });
  }
  
  const diminuir = () => {
    if (QuantNum > 1) {
      setQuantNum(QuantNum - 1);
      setPrecoQuantidade((prevPrecoQuantidade) => {
        const novoPreco = prevPrecoQuantidade - produto.price;
        return parseFloat(novoPreco.toFixed(2)); // Limita para 2 casas decimais
      });
    }
  }

  const adicionar = (QuantNum,PrecoQuantidade,observacão)=>{
    setCarregar(true)
localStorage.setItem('quantidade', QuantNum)
localStorage.setItem('valorTotal', PrecoQuantidade)
localStorage.setItem('observacao', observacão)
setTimeout(() => {
    setCarregar(false);
    navigate('/Car'); // Redireciona para a página desejada
 }, 800);

  }

    return(
        <div className={styles.container}>
            <div className={styles.view}>
            <span className={styles.voltar}><Link to="/"><GiReturnArrow/></Link></span>
            <div className={styles.produto}>
                    
                <img src={produto.imageUrl} alt={produto.name} />
                <div className={styles.info}>
                    <h1>{produto.name}</h1>
                    <p className={styles.desc}>{produto.descricao}</p>
                    <p className={styles.price}>R${produto.price}</p>
                </div>
            </div>

                <div className={styles.container_Opc}>
                <div className={styles.textarea}>
                    <div className={styles.h1_Obs}>
                        <span><MdChat/></span>
                        <h4> Observação</h4>
                    </div>
                    
                    <textarea name="" id="" placeholder='Ex:Tirar tomate, cebola...' onChange={(e) => setObservacao(e.target.value)}></textarea>
                </div>
                <div className={styles.container_Add}>
                    <div className={styles.quantidade}>
                        <button onClick={diminuir}>-</button>
                        <p>{QuantNum}</p>
                        <button onClick={aumentar}>+</button>
                    </div>
                    <div className={styles.adicionar}>
                        {carregar ? (
                           <p>carregando...</p>
                        ):(
                            <>
                            <button onClick={()=> adicionar(QuantNum,PrecoQuantidade, observacão)}>Adicionar</button><p className={styles.price}>R${PrecoQuantidade}</p>
                            </>
                            
                        )}
                   
                    </div>
                </div>
                </div>    
            </div>
           
            
        </div>
    )
}