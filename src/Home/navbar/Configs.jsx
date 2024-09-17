import { useState } from "react"
import { Sair } from "./Sair"
import { Excluir } from "./excluir"
import { CiSettings } from "react-icons/ci";


export function Config(){
    const [config , setConfig] = useState(false)

    const VerConfig = () => {
        setConfig(!config)
    }
    return (
        <div>
            <button onClick={VerConfig}><CiSettings /> </button>
            
            {config &&(
                <div>
                <h2>Configuraçoes</h2>
                <Sair/>
                <Excluir/>
                <p>exemplo</p>
                <p>exemplo</p> 
            </div>
            )}
            
            
        </div>
    )
}