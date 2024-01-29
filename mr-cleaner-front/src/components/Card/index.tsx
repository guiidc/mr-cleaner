import styles from './styles.module.scss'

interface Props {
  children: React.ReactNode
}

export default function Card({children}: Props) {
  return <div className={styles.cardContainer}>{children}</div>
}
