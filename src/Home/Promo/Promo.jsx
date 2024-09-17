
import gifPc from '../../image/White Minimalist Profile LinkedIn Banner.gif';
import gifMobile from '../../image/Dia do hambúrguer promoção fotográfico marrom laranja post do instagram.png'
import styles from './Promo.module.css'
export function Promo() {
    return (
        <div className={styles.container}>
            <div className={styles.gifPc}>
               <img src={gifPc} alt="Descrição do GIF"  /> 
            </div>

            <div className={styles.gifMobile}>
            <img src={gifMobile} alt="Descrição do GIF"  />
            </div>
        </div>

    );
}
