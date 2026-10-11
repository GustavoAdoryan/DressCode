export default async function DeleteUser(userId: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/usuarios/${userId}`,
      {
        method: 'DELETE',
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
