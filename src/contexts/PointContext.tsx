import React, { createContext, useState, useContext } from "react";

export interface PointContextType {
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

export const PointContext = createContext<PointContextType | null>(null);

export function usePoint() {
  const ctx = useContext(PointContext);
  if (!ctx) {
    throw new Error("usePoint must be used inside PointContextProvider");
  }
  return ctx;
}

export function PointContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [point, setPoint] = useState<number>(0);

  const value = { point, setPoint };
  return (
    <PointContext.Provider value={value}>{children}</PointContext.Provider>
  );
}

export default PointContext;
