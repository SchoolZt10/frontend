'use client'
import { ROOT_API } from '@/common/config'
import { IUser } from '@/interfaces/user.interface'
import { cookies } from 'next/headers'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

interface IUserContext {
  user: IUser | undefined
  loading?: boolean
  logout?: () => void
  refetch: () => void
}

const UserContext = React.createContext<IUserContext>({
  user: {} as IUser,
  loading: true,
  logout: () => {},
  refetch: () => {},
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchUser = async () => {
    if (!Cookies.get('accessToken')) {
      return undefined
    }
    const response = await fetch(`${ROOT_API}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    })

    const data = await response.json()

    return response.ok ? data : undefined
  }

  useEffect(() => {
    fetchUser().then((data) => setUser(data))
    setLoading(false)
  }, [])

  const logout = () => {
    Cookies.remove('accessToken')
    setUser({} as IUser)
  }

  const refetch = () => {
    fetchUser().then((data) => setUser(data))
  }

  const values = {
    user,
    loading,
    logout,
    refetch,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
