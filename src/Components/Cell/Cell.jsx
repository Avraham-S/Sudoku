import React, { useState, useEffect } from "react";

export const Cell = ({ num, revealed, index, setAnswer }) => {
  const [number, setNumber] = useState("");
  const numbers = "123456789";

  useEffect(() => {
    setAnswer((prev) => {
      return { ...prev, [index]: +number };
    });
  }, [number]);

  useEffect(() => {
    if (revealed) setNumber(num);
  }, []);

  return (
    <input
      type="text"
      className={revealed ? "revealed cell" : "cell"}
      style={revealed ? { pointerEvents: "none" } : {}}
      value={number}
      onChange={(e) => {
        if (
          e.target.value.length > 1 ||
          (e.nativeEvent.inputType !== "deleteContentBackward" &&
            !numbers.includes(e.nativeEvent.data))
        )
          return;
        setNumber(e.target.value);
      }}
    />
  );
};
