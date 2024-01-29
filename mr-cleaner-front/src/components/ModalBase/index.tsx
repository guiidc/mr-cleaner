import styles from './styles.module.scss';
import {IoMdCloseCircleOutline} from "react-icons/io";
import Button from "@/components/Button";
import {FormEvent, ReactNode, useEffect} from "react";

interface Props {
  children: ReactNode
  title: string
  handleClose: () => void
  buttonText: string
  handleSubmit: (event: FormEvent) => void
}

export default function ModalBase({
  children,
  title,
  handleClose,
  buttonText = "OK",
  handleSubmit,
}: Props) {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span>{title}</span>
          <IoMdCloseCircleOutline size={28} className={styles.closeIcon} onClick={handleClose}/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            {children}
          </div>
          <div className={styles.modalFooter}>
            <Button text={buttonText} type="submit"/>
          </div>
        </form>
      </div>
    </div>
  )
}
