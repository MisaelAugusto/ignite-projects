import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const minutes = '00';
  const seconds = '00';

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
