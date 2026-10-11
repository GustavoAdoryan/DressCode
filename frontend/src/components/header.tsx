import { UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import { useUserStore } from '@/store/user'
import { Select, SelectTrigger } from '@radix-ui/react-select'
import { useState } from 'react'
import ModalProfile from './modal-profile'
import { SelectContent } from './ui/select'
import { useNavigate } from 'react-router-dom'
import ModalDeactivateAccount from './modal-deactivate-account'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [openModalProfile, setOpenModalProfile] = useState(false)
  const [openModalDeactivate, setOpenModalDeactivate] = useState(false)

  const { user, clearUser } = useUserStore()
  const navigate = useNavigate()

  const handleDeactivateAccount = () => {
    setOpen(false)
    setOpenModalDeactivate(true)
  }

  const handleEditProfile = () => {
    setOpen(false)
    setOpenModalProfile(true)
  }

  const handleLogout = () => {
    setOpen(false)
    clearUser()
    navigate('/')
  }

  return (
    <>
      <div className='bg-white shadow border-b-gray-200 flex items-center border-b-1 h-12 '>
        <div className='flex justify-end items-center container'>
          <Select open={open} onOpenChange={setOpen}>
            <SelectTrigger className='mr-8'>
              <Avatar>
                <AvatarImage src={user?.perfil?.FotoPerfil ?? ''} />

                <AvatarFallback className='bg-neutral-200 text-neutral-600 font-bold'>
                  {user?.Nome[0].toUpperCase() ?? (
                    <UserIcon className='text-neutral-600' size={24} />
                  )}
                </AvatarFallback>
              </Avatar>
            </SelectTrigger>

            <SelectContent className='w-[180px]'>
              <div
                className='relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent'
                onClick={handleEditProfile}
              >
                Editar perfil
              </div>

              <div
                className='relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent'
                onClick={handleDeactivateAccount}
              >
                Desativar conta
              </div>

              <div
                className='relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent'
                onClick={handleLogout}
              >
                Sair
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ModalProfile open={openModalProfile} openChange={setOpenModalProfile} />
      <ModalDeactivateAccount
        open={openModalDeactivate}
        openChange={setOpenModalDeactivate}
      />
    </>
  )
}
