
import { MobNav } from "./navbar/MobNav";
import { Navbar } from "./navbar/Navbar";
import { Promo } from "./Promo/Promo";

export function Home (){
    return (
        <div>
            <Navbar/>
            <MobNav/>
            <Promo/>
        </div>
    )
}