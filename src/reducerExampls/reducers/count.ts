interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: "increment" | "decrement";
}

export function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case "increment": {
      const newCount = state.count + 1;
      const hasErr = newCount > 5;
      return {
        ...state,
        count: hasErr ? state.count : newCount,
        error: hasErr ? (state.error = "I can count only up to 5") : null,
      };
    }
    case "decrement":
      const newCount = state.count - 1;
      const hasErr = newCount < 0;
      return {
        ...state,
        count: hasErr ? state.count : newCount,
        error: hasErr
          ? (state.error = "I cannot count negative number.")
          : null,
      };
    default:
      return state;
  }
}
