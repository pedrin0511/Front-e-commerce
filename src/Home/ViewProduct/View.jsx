import styles from './View.module.css'
import { GiReturnArrow } from "react-icons/gi";
import { Link} from 'react-router-dom';
export function View (){

    const produto = JSON.parse(localStorage.getItem('produtoSelecionado'))


    return(
        <div className={styles.container}>
           
            <div className={styles.view}>
            <span className={styles.voltar}><Link to="/"><GiReturnArrow/></Link></span>
                <img src={produto.imageUrl} alt={produto.name} />
                <div className={styles.info}>
                    <h1>{produto.name}</h1>
                    <p className={styles.desc}>{produto.descricao}</p>
                    <p className={styles.price}>R${produto.price}</p>
                </div>
                
            </div>
            
        </div>
    )
}