import styles from '../ViewProduct/View.module.css'
import { useState } from 'react';
import { MdOutlineDeliveryDining,MdChat } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";
import { GrInstallOption } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";

export function Car(){
    const [delivery , setDelivery] = useState(false)
    const [Retirada , setRetirada] = useState(false)
 const [endereco , setendereco] = useState(false)
    const mapUrl = `https://www.google.com/maps/@-7.1177581,-34.8070132,18z?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D`

    const OpcDelivery = () => {
        if(delivery === true){
            setDelivery(!true)
        }else{
            setDelivery(true)
        }
    }

    const OpcRetirada = () => {
        setDelivery(!true)
    }
    return(
        <div className={styles.entrega}>
        <span className={styles.span}><h4>Opções de entrega </h4><GrInstallOption /></span>
        <div className={styles.button_container}>
            <button onClick={OpcDelivery} className={styles.button_delivery}>Delivery <span><MdOutlineDeliveryDining/></span></button>
            <button onClick={OpcRetirada} className={styles.button_retirada}>Retirada <span><IoStorefrontSharp /></span></button>
        </div>
        {delivery ? (
            <>
            {!endereco ? (
                <button className={styles.button_addendereco}>Add endereço <span><CiLocationOn /></span></button>
            ):(
                <p>endereco</p>
            )}
        </>
    ): (
        <div className={styles.retirada_endereco}>
            <p>Edereço de retirada: </p>
            <a href={mapUrl}>Av.enderço da loja</a>
        </div>
    )}
    </div>    
    )
}