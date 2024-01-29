import styles from './styles.module.scss'
import Card from "@/components/Card";
import {FaMapMarkedAlt} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import Button from "@/components/Button";
import {Company} from "@/api/companies";
import { FaHouseUser } from "react-icons/fa6";


interface Props {
  companies: Company[]
  onShowRemoveCompanyModal: (show: boolean, company: Company | null) => void
  onShowUpdateCompanyModal: (show: boolean, company: Company | null) => void
}
export default function ClientsList({companies, onShowRemoveCompanyModal, onShowUpdateCompanyModal}: Props) {
  
  const addPhoneMask = (phone: string) => {
    phone.replace(/\D/g, '')
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  
  return (
    <div className={styles.clientsList}>
      {companies.length ? companies.map((company) => (
        <Card key={company.id}>
          <div className={styles.cardContent}>
            <FaHouseUser size={50} color="#0ba360"/>
            <span className={styles.name}>{company.name}</span>
            <div className={styles.info}>
              <IoLogoWhatsapp size={20}/>
              <span>{addPhoneMask(company.phone)}</span>
            </div>
            <div className={styles.info}>
              <IoMail size={20}/>
              <span>{company.email}</span>
            </div>
            <div className={styles.info}>
              <FaMapMarkedAlt size={20}/>
              <span><b>X: </b> {company.coordinate_x}</span>
              <span><b>Y: </b> {company.coordinate_y}</span>
            </div>
            <div className={styles.buttonsContainer}>
              <Button
                text="Editar"
                type="button"
                color="#e8a702"
                onClick={() => onShowUpdateCompanyModal(true, company)}
              />
              <Button
                text="Excluir"
                type="button"
                color="crimson"
                onClick={() => onShowRemoveCompanyModal(true, company)}
              />
            </div>
          </div>
        </Card>
      )) : (
        <span>Parece que não há nenhuma empresa por aqui. Tente limpar sua busca ou cadastrar uma nova empresa. =)</span>
      )}
    </div>
  )
}
