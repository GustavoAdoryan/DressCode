import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import { DefaultResponse, User } from '@/types'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import toast from 'react-hot-toast'
import CreateSchedule from '@/api/create-schedule'

interface ModalScheduleProps {
  user: User | null
  open: boolean
  openChange: (open: boolean) => void
}

export default function ModalSchedule({
  user,
  open,
  openChange,
}: ModalScheduleProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const { user: myProfile } = useUserStore()

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (value.length > 5) {
      return
    }

    if (value.length === 2 && time.length === 1) {
      value += ':'
    }

    if (value.length === 3 && parseInt(value) > 23) {
      value = '23:'
    }

    if (value.length === 5 && parseInt(value.slice(3)) > 59) {
      value = value.slice(0, 3) + '59'
    }

    setTime(value)
  }

  const handleSchedule = async () => {
    try {
      setIsLoading(true)

      if (!myProfile || !date || !time || !user) {
        toast.error('Preencha corretamente todos os campos')

        return
      }

      const dateFormat = format(date, 'yyyy-MM-dd') + 'T' + time + ':00'

      const body = {
        DataHora: dateFormat,
        EstilistaID:
          myProfile.Tipo === 'Estilista'
            ? myProfile.estilista?.EstilistaID
            : user.estilista?.EstilistaID,
        AtelieID:
          myProfile.Tipo === 'Atelie'
            ? myProfile.atelie?.AtelieID
            : user.atelie?.AtelieID,
      }

      const res = await CreateSchedule(body)
      const data: DefaultResponse = await res?.json()

      if (!res || !res.ok) {
        toast.error(data.message ?? 'Ocorreu um erro ao agendar horário.')

        return
      }

      toast.success('Horário agendado com sucesso!')
      openChange(false)
    } catch (error) {
      console.log(error)
      openChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={() => {
        openChange(false)
        setTime('')
        setDate(undefined)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja agendar um horário?</DialogTitle>
        </DialogHeader>

        <div className='my-4 space-y-4'>
          <div>
            <p className='font-semibold text-sm'>Selecione uma data</p>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />

                  {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>

              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <p className='font-semibold text-sm'>Selecione um horário</p>

            <Input
              className='w-[280px]'
              value={time}
              onChange={handleChangeTime}
              placeholder='00:00'
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>

          <Button onClick={handleSchedule} disabled={isLoading}>
            {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
            Agendar horário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
