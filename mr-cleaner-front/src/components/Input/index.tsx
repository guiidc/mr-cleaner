import styles from './styles.module.scss'
import {ChangeEvent} from "react";
import MaskedInput from "react-text-mask";


interface Props {
  placeholder: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  name: string
  type?: string
  invalid?: boolean
  masked?: boolean
  mask?: (string | RegExp)[]
  
}
export default function Input({
  placeholder,
  name,
  onChange,
  value,
  type = "text",
  invalid = false,
  masked = false,
  mask = []
}: Props) {
  return (
    !masked ? (
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        data-invalid={invalid}
      />
    ) : (
      <MaskedInput
        className={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        data-invalid={invalid}
        mask={mask}
      />
    )
  )
}
