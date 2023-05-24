/* eslint-disable import/no-duplicates */
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useCycles } from 'hooks/index';

import { HistoryContainer, HistoryList, Status } from './styles';
import { useMemo } from 'react';

type Color = 'yellow' | 'green' | 'red';

type StatusType = Record<
  number,
  {
    color: Color;
    description: string;
  }
>;

const STATUS_MAP: StatusType = {
  0: {
    color: 'yellow',
    description: 'Em andamento'
  },
  1: {
    color: 'green',
    description: 'Concluído'
  },
  2: {
    color: 'red',
    description: 'Interrompido'
  }
};

const History: React.FC = () => {
  const { cycles } = useCycles();

  const formattedCycles = useMemo(
    () =>
      cycles.map((cycle) => {
        const statusId = cycle.finishedAt ? 1 : cycle.interruptedAt ? 2 : 0;

        return {
          ...cycle,
          startText: formatDistanceToNow(cycle.startedAt, { addSuffix: true, locale: ptBR }),
          status: STATUS_MAP[statusId]
        };
      }),
    [cycles]
  );

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {formattedCycles.map(({ id, task, minutesAmount, startText, status }) => (
              <tr key={id}>
                <td>{task}</td>
                <td>{minutesAmount} minutos</td>
                <td>{startText}</td>
                <td>
                  <Status statusColor={status.color}>{status.description}</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
