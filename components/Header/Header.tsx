import Link from "next/link";
import styles from "./Header.module.css"
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
    const {data: session} = useSession();

    return ( 
        <header className={styles.header}>
            <Link href={"/articles"}>Articles</Link>
            <Link href={"/writers"}>Writers</Link>
            {session &&
                <div>
                    <Link href={"/myarticles"}>My Articles</Link>
                    <button onClick={()=>signOut()}>Sign out</button>
                </div>
            }
            {!session &&
                <button onClick={()=>signIn()}>Sign in</button> }
        </header>
     );
}
 
export default Header;