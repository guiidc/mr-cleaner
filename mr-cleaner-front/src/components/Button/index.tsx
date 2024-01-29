import styles from './styles.module.scss'

interface Props {
  text: string
  type?: "submit" | "button"
  disabled?: boolean
  onClick?: () => void
  color?: string
}
export default function Button({text, onClick, type, disabled = false, color = '##0a8650'}: Props) {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{backgroundColor: color}}
    >
      {text}
    </button>
  )

}
