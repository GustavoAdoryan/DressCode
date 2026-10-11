import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUserStore } from '@/store/user'
import { Button } from './ui/button'
import DeleteUser from '@/api/delete-user'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { DefaultResponse } from '@/types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface ModalDeactivateAccountProps {
  open: boolean
  openChange: (open: boolean) => void
}

export default function ModalDeactivateAccount({
  open,
  openChange,
}: ModalDeactivateAccountProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user, clearUser } = useUserStore()

  const navigate = useNavigate()

  const handleDeactivateAccount = async () => {
    try {
      setIsLoading(true)

      if (!user) {
        return
      }

      const res = await DeleteUser(user.UsuarioID)
      const data: DefaultResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data.message ?? 'Ocorreu um erro ao exlcuir o perfil')

        return
      }

      clearUser()
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      openChange(false)
    }
  }

  return (
    <Dialog modal open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza disso?</DialogTitle>

          <DialogDescription>
            Ao desativar sua conta, você perderá todos os seus dados e não
            poderá recuperá-los.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>

          <Button
            onClick={handleDeactivateAccount}
            disabled={isLoading}
            variant={'destructive'}
          >
            {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
            Desativar conta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
