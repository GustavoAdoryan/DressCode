import DeleteSchedule from '@/api/delete-schedules'
import GetSchedules from '@/api/get-schedules'
import Header from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/store/user'
import { DefaultResponse, Schedule } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])

  const { user } = useUserStore()

  useEffect(() => {
    if (!user) {
      return
    }

    const getSchedules = async () => {
      const res = await GetSchedules({
        tipo: user.Tipo,
        id:
          user.Tipo === 'Estilista'
            ? user.estilista?.EstilistaID
            : user.atelie?.AtelieID,
      })

      const data: Schedule[] = await res?.json()

      if (!res || !res.ok) {
        toast.error('Ocorreu um erro ao buscar agendamentos')

        return
      }

      if (data.length === 0) {
        toast.error('Nenhum agendamento encontrado')

        return
      }

      data.sort((a, b) => {
        return new Date(b.DataHora).getTime() - new Date(a.DataHora).getTime()
      })

      setSchedules(data)
    }

    getSchedules()
  }, [user])

  const handleDeleteSchedule = async (scheduleId: number) => {
    const res = await DeleteSchedule(scheduleId)
    const data: DefaultResponse = await res?.json()

    if (!res || !res.ok) {
      toast.error(data.message ?? 'Ocorreu um erro ao exlcuir o perfil')

      return
    }

    setSchedules((prev) =>
      prev.filter((schedule) => schedule.AgendamentoID !== scheduleId)
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='w-full h-screen bg-neutral-100'>
      <Header />

      <div className='w-full flex flex-col justify-center items-center container p-8'>
        <Card className='w-full max-w-3xl bg-white shadow'>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle className='text-xl'>Meus Agendamentos</CardTitle>
          </CardHeader>

          <CardContent>
            {schedules.length === 0 ? (
              <p>Nenhum agendamento encontrado</p>
            ) : (
              <div className='space-y-4'>
                {schedules.map((schedule, index) => (
                  <Fragment key={schedule.AgendamentoID}>
                    <div className='flex flex-row justify-between items-center px-4'>
                      <div>
                        <p className='font-semibold'>Data do agendamento:</p>

                        <p className='text-neutral-600 text-sm'>
                          {format(schedule.DataHora, 'PPpp', {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className='flex space-x-8'>
                        <p className='font-bold capitalize'>
                          {schedule.Status}
                        </p>

                        <Trash2
                          className='cursor-pointer text-red-500'
                          size={24}
                          onClick={() =>
                            handleDeleteSchedule(schedule.AgendamentoID)
                          }
                        />
                      </div>
                    </div>

                    {index !== schedules.length - 1 && (
                      <Separator className='my-2' color='neutral-100' />
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
