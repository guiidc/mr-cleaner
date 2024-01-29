import Input from "@/components/Input";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import validator from "validator";
import {Company, SaveCompany} from "@/api/companies";
import ModalBase from "@/components/ModalBase";


const initialNewCompany: SaveCompany = {
  name: '',
  email: '',
  phone: '',
  coordinate_x: '',
  coordinate_y: '',
}

const phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const coordinateMask = [/\d/, /\d/, '.', /\d/, /\d/]

interface Props {
  title: string;
  buttonText: string;
  handleClose: () => void;
  handleSave: (company: SaveCompany) => void;
  handleUpdate: (company: SaveCompany) => void;
  selectedCompany: Company | null;
}

export function ModalNewCompany({title, buttonText, handleClose, handleSave, handleUpdate, selectedCompany}: Props) {
  const [companyData, setCompanyData] = useState<SaveCompany>(initialNewCompany)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setCompanyData({...companyData, [name]: value})
  }
  
  const validateFields = (): boolean => {
    let isValid = true
    const errors: Record<string, boolean> = {}
    
    if (companyData.name.length < 2) {
      errors.name = true
      isValid = false
    }
    
    if (!validator.isEmail(companyData.email)) {
      errors.email = true
      isValid = false
    }
    
    if (companyData.phone.replace(/\D/g, '').length < 11) {
      errors.phone = true
      isValid = false
    }
    
    if (companyData.coordinate_x.replace(/\D/g, '').length < 4) {
      errors.coordinate_x = true
      isValid = false
    }
    
    if (companyData.coordinate_y.replace(/\D/g, '').length < 4) {
      errors.coordinate_y = true
      isValid = false
    }
    
    setFieldErrors(errors)
    return isValid
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validateFields()) return
    
    if (!selectedCompany) {
      handleSave(companyData)
      return
    }
    
    handleUpdate(companyData)
  }
  
  useEffect(() => {
    if (selectedCompany) {
      setCompanyData({
        name: selectedCompany.name,
        email: selectedCompany.email,
        phone: selectedCompany.phone,
        coordinate_x: selectedCompany.coordinate_x.toString(),
        coordinate_y: selectedCompany.coordinate_y.toString(),
      })
    } else {
      setCompanyData(initialNewCompany)
    }
  }, [selectedCompany])
  
  return (
    <ModalBase
      title={title}
      handleClose={handleClose}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
    >
      <Input
        placeholder="Nome da empresa"
        onChange={handleChange}
        value={companyData.name}
        name="name"
        invalid={fieldErrors.name}
      />
      <Input
        placeholder="E-mail"
        onChange={handleChange}
        value={companyData.email}
        name="email"
        invalid={fieldErrors.email}
      />
      <Input
        placeholder="Telefone"
        onChange={handleChange} value={companyData.phone}
        name="phone"
        masked={true}
        mask={phoneMask}
        invalid={fieldErrors.phone}
      />
      <Input
        placeholder="Coordenada X"
        onChange={handleChange}
        value={companyData.coordinate_x}
        name="coordinate_x"
        invalid={fieldErrors.coordinate_x}
        masked={true}
        mask={coordinateMask}
      />
      <Input
        placeholder="Coordenada Y"
        onChange={handleChange}
        value={companyData.coordinate_y}
        name="coordinate_y"
        invalid={fieldErrors.coordinate_y}
        masked={true}
        mask={coordinateMask}
      />
    </ModalBase>
  )
}
