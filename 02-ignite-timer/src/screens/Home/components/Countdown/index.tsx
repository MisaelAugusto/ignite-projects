import { useEffect, useMemo } from 'react';
import { differenceInSeconds } from 'date-fns';

import { CountdownContainer, Separator } from './styles';
import { useCycles } from 'hooks';

const Countdown: React.FC = () => {
  const { activeCycle, secondsPassed, finishActiveCycle, updateSecondsPassed } = useCycles();

  const { minutes, seconds } = useMemo(() => {
    let totalSeconds = 0;
    let currentSeconds = 0;

    if (activeCycle !== null) {
      totalSeconds = activeCycle.minutesAmount * 60;

      currentSeconds = totalSeconds - secondsPassed;
    }

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    return {
      minutes: String(minutesAmount).padStart(2, '0'),
      seconds: String(secondsAmount).padStart(2, '0')
    };
  }, [activeCycle, secondsPassed]);

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`;
    else document.title = 'Ignite Timer';
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = window.setInterval(() => {
        const totalSeconds = activeCycle.minutesAmount * 60;
        const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startedAt));

        if (secondsDifference >= totalSeconds) {
          finishActiveCycle();

          clearInterval(interval);
        }

        updateSecondsPassed(secondsDifference);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, finishActiveCycle, updateSecondsPassed]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};

export default Countdown;
