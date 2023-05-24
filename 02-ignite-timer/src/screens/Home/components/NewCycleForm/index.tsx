import { type ChangeEvent, useCallback } from 'react';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useFormContext } from 'react-hook-form';

const MIN_TIME_IN_MINUTES = 5;
const MAX_TIME_IN_MINUTES = 60;

const NewCycleForm: React.FC = () => {
  const { register, setValue } = useFormContext();

  const handleBlurMinutesAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const minutesAmount = Number(event.target.value);

      if (minutesAmount > MAX_TIME_IN_MINUTES) setValue('minutesAmount', MAX_TIME_IN_MINUTES);
      else if (minutesAmount < MIN_TIME_IN_MINUTES) setValue('minutesAmount', MIN_TIME_IN_MINUTES);
    },
    [setValue]
  );

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
