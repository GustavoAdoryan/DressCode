export default async function LoginRequest(
  email: string,
  password: string
): Promise<Response | undefined> {
  try {
    const body = {
      Email: email,
      Senha: password,
    }

    const res = await fetch(
      'http://localhost:3000/api/auth/login',
      {
        method: 'POST',
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
