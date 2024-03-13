export type StateData = { timestamp: number; message: string };
export type State = Array<StateData>;

export class StateHandler {
  private state: State = [];
  private static instance: StateHandler;
  private constructor() {}

  public add(data: StateData) {
    this.state.push(data);
  }

  public getLatest() {
    return this.state.at(this.state.length - 1);
  }

  public getState() {
    return this.state;
  }

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new StateHandler();
    }
    return this.instance;
  }
}
