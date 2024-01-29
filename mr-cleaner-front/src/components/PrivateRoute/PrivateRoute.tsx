'use client'

import {useEffect, useState} from "react";
import {useUserContext} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";

interface Props {
  children: React.ReactNode
  
}

export default function PrivateRoute({children}: Props) {
  const {user, loadUserFromSavedToken} = useUserContext()
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      loadUserFromSavedToken()
    }
    setLoading(false)
  }, [user]);
  
  if (loading) return null
  
  if (!user) router.push('/login')
  
 return <>{children}</>
}
