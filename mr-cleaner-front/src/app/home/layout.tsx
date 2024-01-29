import styles from './layout.module.scss'
import Header from "@/components/Header";

interface Props {
  children: React.ReactNode
}

export default function HomeLayout({children}: Props) {
  return (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  )
}
