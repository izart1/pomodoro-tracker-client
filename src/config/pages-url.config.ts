class DASHBOARD {
  private root = "/i";

  HOME = this.root;
  TASKS = `${this.root}/tasks`;
  HABITS = `${this.root}/habits`;
  TRACKER = `${this.root}/tracker`;
  TIME_BLOCKING = `${this.root}/time-blocking`;
  SETTINGS = `${this.root}/settings`;
}

export const DASHBOARD_PAGE = new DASHBOARD();
