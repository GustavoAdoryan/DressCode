export default async function DeleteSchedule(scheduleId: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/agendamentos/${scheduleId}`,
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
