import styles from './styles.module.scss'

import ModalBase from "@/components/ModalBase";
import {FormEvent} from "react";
import {PathData} from "@/api/paths";

interface Props {
  handleClose: (show: boolean) => void
  pathData: PathData
}

export default function ModalShortestPath({handleClose, pathData}: Props) {
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleClose(false)
  }
  return (
    <ModalBase
      title="Rota de limpeza"
      buttonText="OK"
      handleClose={() => handleClose(false)}
      handleSubmit={handleSubmit}
    >
      <div className={styles.textContainer}>
        {pathData.path.length > 2 ? ( // BACKEND ALWAYS SEND ORIGIN AND DESTINATION POINTS
          <>
            {pathData.path.map((point, index) => (
              <span key={index}>
                {index === 0 || index === pathData.path.length -1 ? '🏢' : '💦'}
                {index + 1} - {point}
              </span>
            ))}
            <br />
            <span><b>Distância total:</b> {pathData.distance}</span>
          </>
        ) : (
          <span>Sem nenhuma rota no momento!!!</span>
        )}
      </div>
    </ModalBase>
  )
}
