import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useReducer
} from 'react';

import {
  cyclesReducer,
  addNewCycleAction,
  interruptActiveCycleAction,
  finishActiveCycleAction
} from 'reducers/cycles';

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
  const [{ cycles, activeCycle }, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycle: null
  });

  const [secondsPassed, setSecondsPassed] = useState(0);

  const addNewCycle = useCallback((newCycle: Cycle) => {
    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  }, []);

  const interruptActiveCycle = useCallback(() => {
    dispatch(interruptActiveCycleAction());
  }, []);

  const finishActiveCycle = useCallback(() => {
    dispatch(finishActiveCycleAction());
  }, []);

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
    throw new Error('useCycles must be used within a CycleProvider');
  }

  return context;
};

export default useCycles;
