import { type ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { HandPalm, Play } from 'phosphor-react';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import NewCycleForm from './components/NewCycleForm';
import Countdown from './components/CountDown';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

const Home: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = useMemo(
    () => cycles.find((cycle) => cycle.id === activeCycleId) ?? null,
    [activeCycleId, cycles]
  );

  const { minutes, seconds } = useMemo(() => {
    let totalSeconds = 0;
    let currentSeconds = 0;

    if (activeCycle !== null) {
      totalSeconds = activeCycle.minutesAmount * 60;

      currentSeconds = totalSeconds - amountSecondsPassed;
    }

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    return {
      minutes: String(minutesAmount).padStart(2, '0'),
      seconds: String(secondsAmount).padStart(2, '0')
    };
  }, [activeCycle, amountSecondsPassed]);

  const isSubmitButtonDisabled = useMemo(() => task === '', [task]);

  const handleInterruptCycle = useCallback(() => {
    setCycles((previousState) =>
      previousState.map((cycle) => ({
        ...cycle,
        ...(cycle.id === activeCycleId && { interruptedAt: new Date() })
      }))
    );

    setActiveCycleId(null);
  }, [activeCycleId]);

  const handleBlurMinutesAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const minutesAmount = Number(event.target.value);

      if (minutesAmount > MAX_TIME_IN_MINUTES) setValue('minutesAmount', MAX_TIME_IN_MINUTES);
      else if (minutesAmount < MIN_TIME_IN_MINUTES) setValue('minutesAmount', MIN_TIME_IN_MINUTES);
    },
    [setValue]
  );

  const submit = useCallback(
    (values: FormValues) => {
      const id = String(new Date().getTime());

      const newCycle: Cycle = {
        id,
        ...values,
        startedAt: new Date()
      };

      setCycles((previousState) => [...previousState, newCycle]);
      setActiveCycleId(id);
      setAmountSecondsPassed(0);

      reset();
    },
    [reset]
  );

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
    else document.title = 'Ignite Timer';
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = window.setInterval(() => {
        const totalSeconds = activeCycle.minutesAmount * 60;
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startedAt);

        if (secondsDifference >= totalSeconds) {
          setCycles((previousState) =>
            previousState.map((cycle) => ({
              ...cycle,
              ...(cycle.id === activeCycleId && { finishedAt: new Date() })
            }))
          );

          setActiveCycleId(null);
          clearInterval(interval);
        }

        setAmountSecondsPassed(secondsDifference);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(submit)}>
        {!activeCycleId && <NewCycleForm />}

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
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
    </HomeContainer>
  );
};

export default Home;
