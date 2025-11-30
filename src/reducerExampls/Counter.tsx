import React, { useReducer } from "react";

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: "increment" | "decrement";
}

interface Props {
  reducer: (state: State, action: Action) => State;
}

const Counter: React.FC<Props> = ({ reducer }) => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <div>
      <div>Count: {state.count}</div>
      {state.error && <div>{state.error}</div>}

      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
};

export default Counter;
