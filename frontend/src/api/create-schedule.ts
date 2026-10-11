interface CreateScheduleProps {
  DataHora: string
  EstilistaID: number | undefined
  AtelieID: number | undefined
}

export default async function CreateSchedule({
  DataHora,
  EstilistaID,
  AtelieID,
}: CreateScheduleProps) {
  try {
    const res = await fetch(
      'http://localhost:3000/api/agendamentos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          DataHora,
          EstilistaID,
          AtelieID,
        }),
      }
    )

    return res
  } catch (error) {
    console.log(error)
  }
}
