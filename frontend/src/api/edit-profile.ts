import { User } from '@/types'

export default async function EditProfile(user: User) {
  try {
    const body = {
      Biografia: user.perfil!.Biografia,
      FotoPerfil: user.perfil!.FotoPerfil,
    }

    const res = await fetch(
      `http://localhost:3000/api/usuarios/${user.UsuarioID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    return res
  } catch (error) {
    console.log(error)
  }
}
