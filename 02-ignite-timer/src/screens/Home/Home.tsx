import { useCallback, useMemo } from 'react';
import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCycles } from 'hooks';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import NewCycleForm from './components/NewCycleForm';
import Countdown from './components/Countdown';

const schema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type FormValues = zod.infer<typeof schema>;

const MIN_TIME_IN_MINUTES = 5;

const defaultValues: FormValues = {
  task: '',
  minutesAmount: MIN_TIME_IN_MINUTES
};

const Home: React.FC = () => {
  const { activeCycle, addNewCycle, interruptActiveCycle } = useCycles();

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema)
  });
  const { handleSubmit, reset, watch } = methods;

  const currentTaskDescription = watch('task');

  const activeCycleId = useMemo(() => activeCycle?.id, [activeCycle]);

  const isSubmitButtonDisabled = useMemo(
    () => currentTaskDescription === '',
    [currentTaskDescription]
  );

  const handleinterruptActiveCycle = useCallback(() => {
    interruptActiveCycle();
  }, [interruptActiveCycle]);

  const submit = useCallback(
    (values: FormValues) => {
      addNewCycle({
        id: String(new Date().getTime()),
        ...values,
        startedAt: new Date()
      });

      reset();
    },
    [addNewCycle, reset]
  );

  return (
    <HomeContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          {!activeCycleId && <NewCycleForm />}

          <Countdown />

          {activeCycle ? (
            <StopCountdownButton onClick={handleinterruptActiveCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </FormProvider>
    </HomeContainer>
  );
};

export default Home;
