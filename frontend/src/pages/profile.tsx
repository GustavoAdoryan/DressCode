import GetProfile from '@/api/get-profile'
import Header from '@/components/header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DefaultResponse, User } from '@/types'
import { UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const getProfile = async () => {
      const res = await GetProfile(Number(id))
      const data: User & DefaultResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data.message)
        return
      }

      setUser(data)
    }

    getProfile()
  }, [id])

  if (!user) {
    return
  }

  return (
    <div className='w-full h-screen bg-neutral-100'>
      <Header />

      <div className='w-full flex flex-col justify-center items-center space-y-8 container p-8'>
        <Card className='w-full max-w-3xl bg-white shadow'>
          <CardHeader className='space-y-8'>
            <CardTitle>Perfil de {user.Nome}</CardTitle>

            <Separator />

            <div className='flex items-center space-x-4'>
              <Avatar className='size-16'>
                <AvatarImage src={user.perfil?.FotoPerfil ?? ''} />

                <AvatarFallback className='bg-neutral-200'>
                  {(
                    <p className='font-semibold text-xl'>
                      {user.Nome[0].toUpperCase()}
                    </p>
                  ) ?? <UserIcon className='text-neutral-600' size={24} />}
                </AvatarFallback>
              </Avatar>

              <div className='space-y-1'>
                <p className='text-lg font-bold mb-1'>{user.Nome}</p>

                <p className='text-sm font-semibold text-neutral-500'>
                  {user.Email}
                </p>

                <p className='text-sm font-semibold text-neutral-500'>
                  {user.Telefone}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Separator />

            <div className='py-4 space-y-3'>
              <div className='space-y-4'>
                <p className='text-lg font-bold'>Perfil</p>

                <div>
                  <p className='font-semibold'>Biografia:</p>

                  <p className='text-neutral-600 text-sm'>
                    {user.perfil?.Biografia ?? 'Nenhuma biografia disponível.'}
                  </p>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <p className='text-lg font-bold'>Portfólio</p>

                {user.Tipo === 'Atelie' &&
                  user.atelie?.portifolios?.map((item, index) => (
                    <div key={index} className='space-y-4'>
                      <div>
                        <p className='font-semibold'>Descrição do portfólio:</p>

                        <p className='text-neutral-600 text-sm'>
                          {item.Descricao_portifolio}
                        </p>
                      </div>

                      <div>
                        <p className='font-semibold'>Tempo de experiência:</p>

                        <p className='text-neutral-600 text-sm'>
                          {item.Tempo_experiencia}
                        </p>
                      </div>
                    </div>
                  ))}

                {user.Tipo === 'Estilista' &&
                  user.estilista?.portifolios?.map((item, index) => (
                    <div key={index} className='space-y-4'>
                      <div>
                        <p className='font-semibold'>Descrição do portfólio:</p>

                        <p className='text-neutral-600 text-sm font-semibold'>
                          {item.Descricao_portifolio ?? 'Nenhuma descrição.'}
                        </p>
                      </div>

                      <div>
                        <p className='font-semibold'>Tempo de experiência:</p>

                        <p className='text-neutral-600 text-sm font-semibold'>
                          {item.Tempo_experiencia ??
                            'Nenhum tempo de experiência.'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
