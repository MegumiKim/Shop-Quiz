import React from "react";

type SumProps = {
  total: number;
};

const Sum = ({ total }: SumProps) => {
  return <h1>List of People ({total})</h1>;
};

export default Sum;
