import React, { createContext, useReducer } from "react";
import { Mensa, Group, Session } from "./api/group";
import { User } from "./api/user";

interface State {
  mensas: Mensa[];
  groups: Group[];
  sessions: Session[];
  user: User;
}

const initialState: State = {
  mensas: [],
  groups: [],
  sessions: [],
  user: {
    id: "1",
    name: "Test",
    email: "test@test.ch",
    joined: new Date().toISOString(),
  },
};

interface Action {
  type: string;
  groups: Group[];
  mensas: Mensa[];
  user: User;
}

let AppContext = createContext<State>(initialState);

let reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setMensas": {
      return { ...state, mensas: action.mensas };
    }
    case "setGroups": {
      return { ...state, groups: action.groups };
    }
  }

  return state;
};

function AppContextProvider(props: React.PropsWithChildren) {
  const fullInitialState = {
    ...initialState,
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
