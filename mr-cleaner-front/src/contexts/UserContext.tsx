'use client'

import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {jwtDecode} from 'jwt-decode'


interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  authenticateUser: (accessToken: string) => void
  logout: () => void
  loadUserFromSavedToken: () => void
  saveToken: (accessToken: string) => void
}
export const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactNode
}
export default function UserProvider({children}: Props) {
  const [user, setUser] = useState<User | null>(null)
  
  const decodeToken = (accessToken: string): User => {
    return jwtDecode(accessToken) as User
  }
  
  const authenticateUser = (accessToken: string) => {
    try {
      const userPayload = decodeToken(accessToken)
      setUser(userPayload)
      saveToken(accessToken)
    } catch (error) {
      logout()
    }
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('accessToken')
  }
  
  const loadUserFromSavedToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      authenticateUser(accessToken)
    } else {
      logout()
    }
  }
  
  const saveToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
  }
  
  const contextValue = {
    user,
    setUser,
    authenticateUser,
    logout,
    loadUserFromSavedToken,
    saveToken,
  }
  
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)

