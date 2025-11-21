import React from "react";
import { usePoint } from "../contexts/PointContext";

function Points() {
  const { point } = usePoint();

  return (
    <h3 className="my_point">
     ⭐ <span className="point">{point}</span>
    </h3>
  );
}

export default Points;
