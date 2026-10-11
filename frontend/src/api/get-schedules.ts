interface GetSchedulesProps {
  tipo: string | undefined
  id: number | undefined
}

export default async function GetSchedules({ tipo, id }: GetSchedulesProps) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/agendamentos/${tipo}/${id}`,
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
