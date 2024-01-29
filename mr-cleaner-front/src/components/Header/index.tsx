'use client'

import styles from './styles.module.scss'
import { IoMdExit } from "react-icons/io";
import {useUserContext} from "@/contexts/UserContext";


export default function Header() {
  const {logout} = useUserContext()
  
  const handleLogout = () => {
    logout()
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Mr. Cleaner!!! 💦💦💦</h1>
      <div className={styles.userContainer} role="button" onClick={handleLogout}>
        <span className={styles.userName}><b>Logout</b></span>
        <IoMdExit size={30}/>
      </div>
    </header>
  )
}
