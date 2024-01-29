import styles from './styles.module.scss'

import ModalBase from "@/components/ModalBase";
import {FormEvent} from "react";
import {Company} from "@/api/companies";

interface Props {
  handleClose: (show: boolean, company: Company | null) => void
  handleSubmit: (event: FormEvent) => void
}

export default function ModalRemoveCompany({handleClose, handleSubmit}: Props) {
  return (
    <ModalBase
      title="Excluir empresa"
      handleClose={() => handleClose(false, null)}
      buttonText="Excluir empresa"
      handleSubmit={handleSubmit}
    >
      <span className={styles.helperText}>Certeza que deseja remover esta empresa? Esta ação não poderá ser desfeita</span>
    </ModalBase>
  )
}
