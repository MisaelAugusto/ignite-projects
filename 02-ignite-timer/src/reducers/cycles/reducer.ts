import { type Action, ActionTypes } from './actions';

interface CyclesState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
}

const cyclesReducer = (state: CyclesState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      const newCycle = action?.payload?.newCycle;

      return {
        ...state,
        ...(newCycle && {
          cycles: [...state.cycles, newCycle],
          activeCycle: newCycle
        })
      };
    }

    case ActionTypes.INTERRUPT_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => ({
          ...cycle,
          ...(cycle.id === state.activeCycle?.id && { interruptedAt: new Date() })
        })),
        activeCycle: null
      };

    case ActionTypes.FINISH_ACTIVE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => ({
          ...cycle,
          ...(cycle.id === state.activeCycle?.id && { finishedAt: new Date() })
        })),
        activeCycle: null
      };

    default:
      return state;
  }
};

export default cyclesReducer;
