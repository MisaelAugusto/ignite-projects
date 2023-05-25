export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  FINISH_ACTIVE_CYCLE = 'FINISH_ACTIVE_CYCLE'
}

export interface Action {
  type: ActionTypes;
  payload?: {
    newCycle: Cycle;
  };
}

const addNewCycleAction = (newCycle: Cycle): Action => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  };
};

const interruptActiveCycleAction = (): Action => {
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE
  };
};

const finishActiveCycleAction = (): Action => {
  return {
    type: ActionTypes.FINISH_ACTIVE_CYCLE
  };
};

export { addNewCycleAction, interruptActiveCycleAction, finishActiveCycleAction };
