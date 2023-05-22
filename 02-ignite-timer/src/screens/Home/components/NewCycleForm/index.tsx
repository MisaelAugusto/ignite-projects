import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

const schema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type FormValues = zod.infer<typeof schema>;

const MIN_TIME_IN_MINUTES = 1;
const MAX_TIME_IN_MINUTES = 60;

const defaultValues: FormValues = {
  task: '',
  minutesAmount: MIN_TIME_IN_MINUTES
};

const NewCycleForm: React.FC = () => {
  const activeCycle = false;

  const { handleSubmit, register, reset, setValue, watch } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema)
  });
  const task = watch('task');

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={MIN_TIME_IN_MINUTES}
        max={MAX_TIME_IN_MINUTES}
        {...register('minutesAmount', { valueAsNumber: true })}
        onBlur={handleBlurMinutesAmount}
      />

      <span>minutos.</span>
    </FormContainer>
  );
};

export default NewCycleForm;
