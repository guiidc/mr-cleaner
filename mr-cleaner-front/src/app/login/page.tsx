'use client'

import styles from './styles.module.scss'
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "../../components/Button";
import {ChangeEvent, FormEvent, useState} from "react";
import {login} from "@/api/login";
import validator from 'validator'
import {useUserContext} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";


interface LoginData {
  email: string,
  password: string
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({email: '', password: ''})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  
  const {authenticateUser, saveToken} = useUserContext()
  
  const router = useRouter()
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [event.target.name]: event.target.value})
  }
  
  const validateFields = () => {
    setInvalidCredentials(false)
    let isValid = true
    const tempFieldErrors: Record<string, string> = {}
    
    if (validator.isEmpty(loginData.email)) {
      isValid = false
      tempFieldErrors.email = 'O e-mail é obrigatório'
    } else if (!validator.isEmail(loginData.email)) {
      isValid = false
      tempFieldErrors.email = 'E-mail inválido'
    }
    
    if (validator.isEmpty(loginData.password)) {
      isValid = false
      tempFieldErrors.password = 'A senha é obrigatória'
    }
    
    setFieldErrors(tempFieldErrors)
    return isValid
  }
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    if (!validateFields()) return
    
    try {
      const response = await login(loginData)
      const accessToken = response.headers['access-token'] || response.headers['Access-Token']
      authenticateUser(accessToken)
      saveToken(accessToken)
      router.push('/home')
    } catch (err) {
      if (err.isAxiosError && err.response?.data?.message) {
        setFieldErrors({credentials: err.response.data.message})
      } else {
        setFieldErrors({credentials: 'Erro ao realizar login'})
      }
      setInvalidCredentials(true)
    }
  }
  
  return (
    <div className={styles.mainContainer}>
      <Card>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Mr. Cleaner!</h1>
          <h2 className={styles.cardTitle}>Login</h2>
          <Input
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
            value={loginData.email}
            invalid={Boolean(fieldErrors.email) || invalidCredentials}
          />
          <Input
            placeholder="Senha"
            type="password"
            name="password"
            onChange={handleChange}
            value={loginData.password}
            invalid={Boolean(fieldErrors.password) || invalidCredentials}
          />
          <p className={styles.helperContainer}>
            {Object.keys(fieldErrors).map((field, i) => (
              fieldErrors[field] + (i < Object.keys(fieldErrors).length - 1 ? ' / ' : '')
            ))}
          </p>
          <Button text="Login" type="submit"/>
        
        </form>
      </Card>
    </div>
  )
}
