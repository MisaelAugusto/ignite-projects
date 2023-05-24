export {};

declare global {
  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startedAt: Date;
    interruptedAt?: Date;
    finishedAt?: Date;
  }
}
