import { differenceInSeconds } from 'date-fns';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useReducer,
  useEffect
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

const REACT_APP_CYCLES_STATE_KEY = '@ignite-timer:cycles-state-1.0.0';

export const CyclesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [{ cycles, activeCycle }, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycle: null
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(REACT_APP_CYCLES_STATE_KEY);

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startedAt));
    }

    return 0;
  });

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

  useEffect(() => {
    const stateJSON = JSON.stringify({ cycles, activeCycle });

    localStorage.setItem(REACT_APP_CYCLES_STATE_KEY, stateJSON);
  }, [cycles, activeCycle]);

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
