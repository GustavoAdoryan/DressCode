export default async function GetUsuarios(tipo: 'Estilista' | 'Atelie') {
  try {
    const res = await fetch(
      `http://localhost:3000/api/usuarios/search/${tipo}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return res
  } catch (error) {
    console.log(error)
  }
}
