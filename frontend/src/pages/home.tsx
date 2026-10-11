import GetUsuarios from '@/api/get-usuarios'
import Header from '@/components/header'
import ModalSchedule from '@/components/modal-schedule'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/store/user'
import { User } from '@/types'
import { SearchIcon, UserIcon } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function HomePage(): JSX.Element {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [usersFiltered, setUsersFiltered] = useState<User[]>([])
  const [userToSchedule, setUserToSchedule] = useState<User | null>(null)
  const [openModalSchedule, setOpenModalSchedule] = useState(false)

  const { user } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      return navigate('/')
    }

    const getUsuarios = async () => {
      const tipo = user.Tipo === 'Estilista' ? 'Atelie' : 'Estilista'
      const res = await GetUsuarios(tipo)

      const data: User[] = await res?.json()

      if (!res || !res.ok) {
        toast.error('Ocorreu um erro ao buscar usuários')

        return
      }

      if (data.length === 0) {
        toast.error('Nenhum usuário encontrado')

        return
      }

      setUsersFiltered(data)
      setUsers(data)
    }

    getUsuarios()
  }, [navigate, user])

  const handleSchedule = (user: User) => {
    setUserToSchedule(user)
    setOpenModalSchedule(true)
  }

  const handleOpenProfile = (userId: number) => {
    navigate(`/profile/${userId}`)
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    const usersFiltered = users.filter(
      (usuario) =>
        usuario.Nome.toLowerCase().includes(value.toLowerCase()) ||
        usuario.Email.toLowerCase().includes(value.toLowerCase())
    )

    setUsersFiltered(usersFiltered)
  }

  if (!user) {
    navigate('/')

    return <></>
  }

  return (
    <>
      <div className='w-full h-screen bg-neutral-100'>
        <Header />

        <div className='w-full flex flex-col justify-center items-center space-y-8 container p-8'>
          <div className='relative w-full max-w-md'>
            <SearchIcon className='absolute top-1/2 left-2.5 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400' />

            <Input
              value={search}
              onChange={handleChangeSearch}
              className='pl-8'
              placeholder='Search'
            />
          </div>

          <Card className='w-full max-w-3xl bg-white shadow'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <CardTitle className='text-xl'>
                {user.Tipo === 'Estilista'
                  ? 'Ateliês disponíveis'
                  : 'Estilistas disponíveis'}
              </CardTitle>

              <Button onClick={() => navigate('/schedules')}>
                Agendamentos
              </Button>
            </CardHeader>

            <CardContent>
              {usersFiltered.map((user, index) => (
                <Fragment key={user.UsuarioID}>
                  <div className='flex items-center justify-between p-2'>
                    <div className='flex items-center space-x-4'>
                      <Avatar>
                        <AvatarImage src={user.perfil?.FotoPerfil ?? ''} />

                        <AvatarFallback className='bg-neutral-200'>
                          {user.Nome[0].toUpperCase() ?? (
                            <UserIcon className='text-neutral-600' size={24} />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className='text-lg font-semibold leading-6'>
                          {user.Nome}
                        </p>

                        <p className='text-sm text-neutral-500'>{user.Email}</p>
                      </div>
                    </div>

                    <div className='flex justify-center items-center space-x-3'>
                      <Button
                        onClick={() => handleOpenProfile(user.UsuarioID)}
                        size='sm'
                        variant='outline'
                      >
                        Ver Perfil
                      </Button>

                      <Button onClick={() => handleSchedule(user)} size='sm'>
                        Agendar
                      </Button>
                    </div>
                  </div>

                  {index !== usersFiltered.length - 1 && (
                    <Separator className='my-2' color='neutral-100' />
                  )}
                </Fragment>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <ModalSchedule
        user={userToSchedule}
        open={openModalSchedule}
        openChange={setOpenModalSchedule}
      />
    </>
  )
}
