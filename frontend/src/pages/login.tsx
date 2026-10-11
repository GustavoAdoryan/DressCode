import LoginRequest from '@/api/login'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/user'
import { LoginResponse } from '@/types'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email || !password) {
        toast.error('Preencha todos os campos.', {
          id: 'login',
        })

        return
      }

      const res = await LoginRequest(email, password)
      const data: LoginResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data?.message ?? 'Ocorreu um erro ao fazer login', {
          id: 'login',
        })

        return
      }

      setUser(data.usuario)
      navigate('/home')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-neutral-100'>
      <Card className='p-8 border rounded-lg w-full max-w-md shadow-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Entrar</CardTitle>

          <CardDescription>Faça login para prosseguir.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div>
              <label htmlFor='email' className='font-semibold text-sm'>
                Email
              </label>

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                type='email'
                placeholder='email'
              />
            </div>

            <div>
              <label htmlFor='password' className='font-semibold text-sm'>
                Senha
              </label>

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='senha'
              />
            </div>

            <Button className='!mt-8' type='submit' disabled={isLoading}>
              {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
              Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className='flex justify-center items-center space-x-2'>
          <p>Não possui uma conta?</p>

          <Link className='text-blue-500' to='/register'>
            Registre-se
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
