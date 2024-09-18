
import gifPc from '../../image/bannerPc.gif';
import gifMobile from '../../image/bannerMobile.gif'
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
