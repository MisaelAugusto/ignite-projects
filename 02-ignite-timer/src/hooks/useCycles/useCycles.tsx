import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react';

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | null;
  secondsPassed: number;
  addNewCycle: (newCycle: Cycle) => void;
  interruptActiveCycle: () => void;
  finishActiveCycle: () => void;
  updateSecondsPassed: (seconds: number) => void;
}

const CyclesContext = createContext<CyclesContextType>({} as CyclesContextType);

export const CyclesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);

  const [secondsPassed, setSecondsPassed] = useState(0);

  const addNewCycle = useCallback((newCycle: Cycle) => {
    setCycles((previousState) => [...previousState, newCycle]);

    setActiveCycle(newCycle);
    setSecondsPassed(0);
  }, []);

  const interruptActiveCycle = useCallback(() => {
    setCycles((previousState) =>
      previousState.map((cycle) => ({
        ...cycle,
        ...(cycle.id === activeCycle?.id && { interruptedAt: new Date() })
      }))
    );

    setActiveCycle(null);
  }, [activeCycle?.id]);

  const finishActiveCycle = useCallback(() => {
    setCycles((previousState) =>
      previousState.map((cycle) => ({
        ...cycle,
        ...(cycle.id === activeCycle?.id && { finishedAt: new Date() })
      }))
    );

    setActiveCycle(null);
  }, [activeCycle?.id]);

  const updateSecondsPassed = useCallback((seconds: number) => {
    setSecondsPassed(seconds);
  }, []);

  const value = useMemo(() => {
    return {
      cycles,
      activeCycle,
      secondsPassed,
      addNewCycle,
      interruptActiveCycle,
      finishActiveCycle,
      updateSecondsPassed
    };
  }, [
    cycles,
    activeCycle,
    secondsPassed,
    addNewCycle,
    interruptActiveCycle,
    finishActiveCycle,
    updateSecondsPassed
  ]);

  return <CyclesContext.Provider value={value}>{children}</CyclesContext.Provider>;
};

const useCycles = () => {
  const context = useContext(CyclesContext);

  if (!context) {
    throw new Error('useCycles must be used with in a CycleProvider');
  }

  return context;
};

export default useCycles;
