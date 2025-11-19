import React from "react";
import "./App.css";
import { MyCartContextProvider } from "./contexts/MyCartContext";
import { MyShopContextProvider } from "./contexts/MyShopContext";
import { PointContextProvider } from "./contexts/PointContext";
import Main from "./components/Main";

export interface IState {
  people: {
    name: string;
    age: number;
    url?: string | null;
    note?: string;
  }[];
}

function App() {
  return (
    <div className="App">
      <PointContextProvider>
        <MyShopContextProvider>
          <MyCartContextProvider>
            <Main />
          </MyCartContextProvider>
        </MyShopContextProvider>
      </PointContextProvider>
    </div>
  );
}

export default App;
