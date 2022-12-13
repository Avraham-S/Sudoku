import { useEffect, useState } from "react";
import "./App.css";
import { Cell } from "./Components/Cell/Cell";

const generateRandomNumber = (size) => Math.trunc(Math.random() * size) + 1;

const generatePuzzle = function (size) {
  try {
    const puzzle = [];
    for (let i = 0; i < size; i++) {
      puzzle.push(new Array(size).fill(0));
    }

    let boxY = 0;
    for (let y = 0; y < size; y++) {
      let boxX = 0;
      if (y === boxY) {
        boxY += size / 3;
      }
      for (let x = 0; x < size; x++) {
        const numSet = new Set();

        for (let i = 0; i < size; i++) {
          numSet.add(puzzle[y][i]);
          numSet.add(puzzle[i][x]);
        }
        if (x === boxX) {
          boxX += size / 3;
        }
        for (let subY = boxY - size / 3; subY < boxY; subY++) {
          for (let subX = boxX - size / 3; subX < boxX; subX++) {
            numSet.add(puzzle[subY][subX]);
          }
        }
        if (numSet.size > size) throw new Error("longer than 9");

        let number = generateRandomNumber(size);
        while (numSet.has(number)) {
          number = generateRandomNumber(size);
        }
        puzzle[y][x] = number;
      }
    }
    return puzzle;
  } catch (error) {
    return generatePuzzle(size);
  }
};

function App() {
  const [solved, setSolved] = useState(false);
  const [puzzleMap, setPuzzleMap] = useState();
  const [puzzle, setPuzzle] = useState();
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    const puzzle = generatePuzzle(9).flat();
    setPuzzle(puzzle);
    const randomIndexes = new Set();

    while (randomIndexes.size <= 29) {
      const randomIndex = Math.floor(Math.random() * 81 + 1);
      randomIndexes.add(randomIndex);
    }

    const puzzleMap = puzzle.map((num, i) => {
      return (
        <Cell
          key={Math.trunc(
            (i + 1) * Math.random() * 20000 -
              10000 +
              10000 * Math.random() * 20000 -
              10000 +
              10000
          )}
          num={num}
          revealed={randomIndexes.has(i)}
          index={i}
          setAnswer={setAnswer}
        />
      );
    });

    setPuzzleMap(puzzleMap);
  }, []);

  const setColsStyle = (size) => {
    let rowsStyle = "";
    for (let i = 0; i < size; i++) {
      rowsStyle += "1fr,";
    }
    const final = rowsStyle.split(",").join(" ");
    return final;
  };

  const cellContainerStyles = {
    display: "grid",
    gridTemplateColumns: setColsStyle(9),
    width: "fit-content",
    zIndex: "10",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = Object.values(answer)
      .map((ansNum, i) => {
        return ansNum === puzzle[i];
      })
      .every((v) => v === true);
    setSolved(result);
  };

  return (
    <>
      <div
        id="overlay"
        style={{
          backgroundColor: solved ? "green" : "#f0f8ff",
        }}
      >
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
        <div className="overlay-cell"></div>
      </div>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div id="cell-container" style={cellContainerStyles}>
            {puzzleMap}
          </div>

          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
