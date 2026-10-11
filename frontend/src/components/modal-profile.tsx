import EditUser from '@/api/edit-user'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUserStore } from '@/store/user'
import { DefaultResponse, User } from '@/types'
import { Loader2, UserIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import EditProfile from '@/api/edit-profile'

interface ModalProfileProps {
  open: boolean
  openChange: (open: boolean) => void
}

export default function ModalProfile({ open, openChange }: ModalProfileProps) {
  const { user } = useUserStore()

  const [userProfile, setUserProfile] = useState<User | null>(user)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    try {
      setIsLoading(true)

      if (!userProfile) {
        return
      }

      const res = await EditUser(userProfile)

      const data: DefaultResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data.message ?? 'Ocorreu um erro ao editar o perfil')

        return
      }

      if (userProfile.perfil?.Biografia !== user?.perfil?.Biografia) {
        const resProfile = await EditProfile(userProfile)

        const dataProfile: DefaultResponse = await resProfile?.json()

        if (!resProfile || !resProfile.ok) {
          toast.error(
            dataProfile.message ?? 'Ocorreu um erro ao editar o perfil'
          )

          return
        }
      }

      toast.success('Perfil editado com sucesso')
      openChange(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!userProfile) {
    return null
  }

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={() => {
        openChange(false)
        setUserProfile(user)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meu Perfil</DialogTitle>
        </DialogHeader>

        <div className='flex space-x-4'>
          <Avatar className='size-20'>
            <AvatarImage src={userProfile.perfil?.FotoPerfil ?? ''} />

            <AvatarFallback className='bg-neutral-200'>
              {userProfile.Nome[0].toUpperCase() ?? (
                <UserIcon className='text-neutral-600' size={24} />
              )}
            </AvatarFallback>
          </Avatar>

          <div className='w-full space-y-4'>
            <div>
              <p className='text-sm font-semibold'>Nome</p>

              <Input
                value={userProfile.Nome}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, Nome: e.target.value })
                }
              />
            </div>

            <div>
              <p className='text-sm font-semibold'>Email</p>

              <Input
                value={userProfile.Email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, Email: e.target.value })
                }
              />
            </div>

            <div>
              <p className='text-sm font-semibold'>Telefone</p>

              <Input
                value={userProfile.Telefone}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, Telefone: e.target.value })
                }
              />
            </div>

            <div>
              <p className='text-sm font-semibold'>Biografia</p>

              <Textarea
                value={userProfile.perfil?.Biografia ?? ''}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    perfil: {
                      ...userProfile.perfil!,
                      Biografia: e.target.value,
                    },
                  })
                }
                placeholder='Digite aqui sua biografia.'
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>

          <Button disabled={isLoading} onClick={handleSave}>
            {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
