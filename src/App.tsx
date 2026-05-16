import { useMemo, useState } from "react";
import "./App.css";

const questions = [
  {
    category: "Traffic Signals",
    question: "When the traffic light is green, vehicles may proceed, but they must still pay attention to pedestrians and other traffic.",
    answer: true,
    explanation: "Green means you may proceed, but it does not mean you can ignore pedestrians or hazards."
  },
  {
    category: "Alcohol",
    question: "A driver may drive after drinking alcohol if they only drank a small amount.",
    answer: false,
    explanation: "Driving under the influence of alcohol is prohibited, even after a small amount."
  },
  {
    category: "Pedestrians",
    question: "When approaching a pedestrian crossing where pedestrians may be crossing, a driver should slow down and be ready to stop.",
    answer: true,
    explanation: "Pedestrian safety is a major part of the test. Always prepare to stop."
  },
  {
    category: "Railroad Crossings",
    question: "At a railroad crossing, a driver must stop, check left and right, and listen before proceeding.",
    answer: true,
    explanation: "You must always stop and confirm safety before entering a railroad crossing."
  },
  {
    category: "Emergency Vehicles",
    question: "When an emergency vehicle approaches, drivers should continue normally if the light is green.",
    answer: false,
    explanation: "Emergency vehicles have priority. You must give way safely."
  },
  {
    category: "Parking",
    question: "Parking is allowed anywhere as long as the driver stays inside the vehicle.",
    answer: false,
    explanation: "Parking and stopping are restricted in many places, even if the driver remains inside."
  },
  {
    category: "Expressways",
    question: "On an expressway, sudden braking and sudden steering are dangerous because vehicles are moving at high speed.",
    answer: true,
    explanation: "Expressway questions often focus on avoiding sudden actions."
  },
  {
    category: "Bad Weather",
    question: "In rain, snow, or fog, drivers should reduce speed and increase following distance.",
    answer: true,
    explanation: "Poor visibility and slippery roads increase stopping distance."
  },
  {
    category: "Blind Spots",
    question: "A driver should rely only on mirrors because mirrors show every blind spot.",
    answer: false,
    explanation: "Mirrors do not show everything. Drivers must also check directly."
  },
  {
    category: "Seat Belts",
    question: "Seat belts reduce injury in a crash and should be worn correctly.",
    answer: true,
    explanation: "Seat belt and child seat questions are common in the test."
  },
  {
    category: "Speed",
    question: "Stopping distance becomes longer as speed increases.",
    answer: true,
    explanation: "Higher speed increases both reaction distance and braking distance."
  },
  {
    category: "Mobile Phones",
    question: "Using a mobile phone while driving is allowed if the driver only looks at it briefly.",
    answer: false,
    explanation: "Using a phone while driving distracts the driver and is prohibited."
  }
];

export default function App() {
  const [mode, setMode] = useState("study");
  const [current, setCurrent] = useState(0);
 const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(questions.map(q => q.category))];

  const filteredQuestions = useMemo(() => {
    if (filter === "All") return questions;
    return questions.filter(q => q.category === filter);
  }, [filter]);

  const question = filteredQuestions[current];

  function answerQuestion(value: boolean) {
    setSelected(value);

    if (value === question.answer) {
      setScore(prev => prev + 1);
    }
  }

  function nextQuestion() {
    if (current + 1 < filteredQuestions.length) {
      setCurrent(prev => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }
function changeFilter(category: string) {
    setFilter(category);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Japanese License Conversion Practice</h1>
        <p>
          Practice true/false questions based on your driving school PDFs.
          Focus on signs, rules, hazards, parking, intersections, and expressways.
        </p>
      </header>

      <main className="card">
        <div className="topBar">
          <button
            className={mode === "study" ? "active" : ""}
            onClick={() => setMode("study")}
          >
            Study Mode
          </button>

          <button
            className={mode === "exam" ? "active" : ""}
            onClick={() => setMode("exam")}
          >
            Exam Mode
          </button>
        </div>

        <select value={filter} onChange={e => changeFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {finished ? (
          <section className="result">
            <h2>Test Complete</h2>
            <p>
              Your score: {score} / {filteredQuestions.length}
            </p>
            <button onClick={restart}>Try Again</button>
          </section>
        ) : (
          <section>
            <p className="progress">
              Question {current + 1} of {filteredQuestions.length}
            </p>

            <p className="category">{question.category}</p>

            <h2>{question.question}</h2>

            <div className="answers">
              <button
                disabled={selected !== null}
                onClick={() => answerQuestion(true)}
              >
                True / Correct
              </button>

              <button
                disabled={selected !== null}
                onClick={() => answerQuestion(false)}
              >
                False / Wrong
              </button>
            </div>

            {selected !== null && (
              <div
                className={
                  selected === question.answer ? "feedback correct" : "feedback wrong"
                }
              >
                <h3>
                  {selected === question.answer ? "Correct!" : "Wrong"}
                </h3>

                {mode === "study" && <p>{question.explanation}</p>}

                <button onClick={nextQuestion}>Next Question</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}