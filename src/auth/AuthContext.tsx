import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

type Role = 'candidate' | 'company' | null

type AuthContextValue = {
  user: User | null
  role: Role
  loading: boolean
  signIn: (params: { email: string; password: string }) => Promise<void>
  signUp: (params: {
    email: string
    password: string
    role: Exclude<Role, 'admin' | null>
    fullName?: string
    companyName?: string
  }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!isMounted) return

      setUser(session?.user ?? null)
      const metadataRole = (session?.user?.user_metadata?.role as Role | undefined) ?? null
      setRole(metadataRole ?? null)
      setLoading(false)
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      const metadataRole = (session?.user?.user_metadata?.role as Role | undefined) ?? null
      setRole(metadataRole ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoading(false)
      throw error
    }
    setUser(data.user)
    const metadataRole = (data.user?.user_metadata?.role as Role | undefined) ?? null
    setRole(metadataRole ?? null)
    setLoading(false)
  }, [])

  const signUp = useCallback(
    async ({
      email,
      password,
      role: signupRole,
      fullName,
      companyName,
    }: {
      email: string
      password: string
      role: Exclude<Role, 'admin' | null>
      fullName?: string
      companyName?: string
    }) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: signupRole,
            full_name: fullName,
            company_name: companyName,
          },
        },
      })
      if (error) {
        setLoading(false)
        throw error
      }
      setUser(data.user)
      const metadataRole = (data.user?.user_metadata?.role as Role | undefined) ?? signupRole
      setRole(metadataRole ?? signupRole)
      setLoading(false)
    },
    [],
  )

  const signOut = useCallback(async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
    setLoading(false)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [user, role, loading, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth doit être utilisé à l’intérieur de <AuthProvider>')
  }
  return ctx
}

