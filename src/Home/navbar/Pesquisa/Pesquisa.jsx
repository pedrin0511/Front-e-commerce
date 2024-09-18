import styles from './Pesquisa.module.css'
import { FaSearch } from 'react-icons/fa';
import { useState , useEffect } from 'react';
import {Link} from 'react-router-dom'
export function Pesquisa(){

    const [ data , setdata] = useState([])
    const [pesquisa , setPesquisa] = useState('')
    const api = 'http://127.0.0.1:5000/burgers'

    useEffect (() => {

        const cardapio = async() => {
            try{
                const response = await fetch(api)
                if(!response.ok){
                    throw new Error('Erto ao buscar os dados')
                }
                const result = await response.json()
                setdata(result)
        }catch(error){
            alert(error)
        }
    }
        cardapio()
    },[])

    const Pesquisar = (e) =>{
        setPesquisa(e.target.value)
    }

    const filtro = data.filter((item) => 
    item.name.toLowerCase().includes(pesquisa.toLowerCase())
    )

    function salvarLocalStorange(item){
        localStorage.setItem('produtoSelecionado' , JSON.stringify(item))
    }


    return(
        <div>
             <div className={styles.searchContainer}>
            <form action="">
                <div className={styles.searchBox}>
                    <input type="text"
                     name="text"
                      pattern=".*\S.*" 
                      required
                      placeholder="Search..."
                      value={pesquisa}
                      onChange={Pesquisar}
                      />

                    <button className={styles.searchBtn} >
                        <FaSearch className={styles.searchIcon}/> 
                    </button>
                   
                   
                </div>
            </form>
            
        </div>
        {pesquisa &&
        <div className={styles.resultado_pesquisa}>
        {filtro.length > 0 ? (
           <ul>
            {filtro.map((item) =>( 
                <Link to="/View"
                key={item.id}
                onClick={() => salvarLocalStorange(item)}
                >
           <li>
            {item.name}
           
           {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <p>Carregando...</p>  
        )}
       
           </li>
           </Link>
            ))}
           </ul>
           ):(
            <p>Nenhum item encontrado</p>
           )}
       </div>
        }
        
        </div>
    )
}