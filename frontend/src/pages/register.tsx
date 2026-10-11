import RegisterRequest from '@/api/register' // Ajuste o caminho conforme necessário
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
import { RegisterResponse } from '@/types'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [Nome, setNome] = useState('')
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')
  const [CPF_CNPJ, setCPFCNPJ] = useState('')
  const [Telefone, setTelefone] = useState('')
  const [Tipo, setTipo] = useState('Estilista')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!Nome || !Email || !Senha || !CPF_CNPJ || !Telefone || !Tipo) {
        toast.error('Por favor, preencha todos os campos!')

        return
      }

      const res = await RegisterRequest({
        Nome,
        Email,
        Senha,
        CPF_CNPJ,
        Telefone,
        Tipo,
      })
      const data: RegisterResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data?.message ?? 'Ocorreu um erro ao fazer o cadastro')

        return
      }

      setUser(data.usuario)
      navigate('/home') // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-neutral-100'>
      <Card className='p-8 border rounded-lg w-full max-w-md shadow-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Registrar</CardTitle>

          <CardDescription>
            Preencha os campos para criar uma conta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div>
              <label htmlFor='nome' className='font-semibold text-sm'>
                Nome
              </label>

              <Input
                value={Nome}
                onChange={(e) => setNome(e.target.value)}
                id='nome'
                type='text'
                placeholder='Nome'
                required
              />
            </div>

            <div>
              <label htmlFor='email' className='font-semibold text-sm'>
                Email
              </label>

              <Input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                type='email'
                placeholder='Email'
                required
              />
            </div>

            <div>
              <label htmlFor='senha' className='font-semibold text-sm'>
                Senha
              </label>

              <Input
                value={Senha}
                onChange={(e) => setSenha(e.target.value)}
                id='senha'
                type='password'
                placeholder='Senha'
                required
              />
            </div>

            <div>
              <label htmlFor='cpf_cnpj' className='font-semibold text-sm'>
                CPF/CNPJ
              </label>

              <Input
                value={CPF_CNPJ}
                onChange={(e) => setCPFCNPJ(e.target.value)}
                id='cpf_cnpj'
                type='text'
                placeholder='CPF ou CNPJ'
                required
              />
            </div>

            <div>
              <label htmlFor='telefone' className='font-semibold text-sm'>
                Telefone
              </label>

              <Input
                value={Telefone}
                onChange={(e) => setTelefone(e.target.value)}
                id='telefone'
                type='text'
                placeholder='Telefone'
                required
              />
            </div>

            <div>
              <label htmlFor='tipo' className='font-semibold text-sm'>
                Tipo
              </label>

              <select
                value={Tipo}
                onChange={(e) => setTipo(e.target.value)}
                id='tipo'
                required
                className='p-2 border rounded-md'
              >
                <option value='Estilista'>Estilista</option>
                <option value='Atelie'>Atelie</option>
              </select>
            </div>

            <Button className='!mt-8' type='submit' disabled={loading}>
              {loading && <Loader2 className='animate-spin mr-2' size={16} />}
              Registrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className='flex justify-center items-center space-x-2'>
          <p>Já possui uma conta?</p>

          <Link className='text-blue-500' to='/'>
            Entrar
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
