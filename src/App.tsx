import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Difficulty = "easy" | "medium" | "hard";
type Mode = "study" | "exam";

type Question = {
  id: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  answer: boolean;
  explanation: string;
};

const allQuestions: Question[] = [
  {
    id: 1,
    category: "Traffic Signals",
    difficulty: "easy",
    question: "A green light means you may proceed, but only after confirming safety.",
    answer: true,
    explanation: "Even with a green light, you must watch for pedestrians and other traffic."
  },
  {
    id: 2,
    category: "Traffic Signals",
    difficulty: "medium",
    question: "A yellow light means drivers should speed up before the light changes.",
    answer: false,
    explanation: "Yellow means stop safely if possible."
  },
  {
    id: 3,
    category: "Traffic Signals",
    difficulty: "hard",
    question: "Even when the signal is green, you must not enter an intersection if traffic ahead may block you inside it.",
    answer: true,
    explanation: "Do not enter an intersection if you may get stuck and block traffic."
  },
  {
    id: 4,
    category: "Railroad Crossings",
    difficulty: "hard",
    question: "Drivers must stop before a railroad crossing even if no train is visible.",
    answer: true,
    explanation: "You must stop, look, and listen before crossing."
  },
  {
    id: 5,
    category: "Railroad Crossings",
    difficulty: "medium",
    question: "You may change gears while crossing a railroad crossing if you are moving slowly.",
    answer: false,
    explanation: "Avoid changing gears on railroad crossings because the vehicle may stall."
  },
  {
    id: 6,
    category: "Pedestrians",
    difficulty: "medium",
    question: "Drivers may pass through a pedestrian crossing if there is enough room beside the pedestrian.",
    answer: false,
    explanation: "Pedestrians have priority. You must stop and let them cross safely."
  },
  {
    id: 7,
    category: "Pedestrians",
    difficulty: "hard",
    question: "Drivers should slow down near a pedestrian crossing when pedestrians may cross.",
    answer: true,
    explanation: "You must be ready to stop."
  },
  {
    id: 8,
    category: "Expressways",
    difficulty: "hard",
    question: "Reversing on an expressway is prohibited even if you miss your exit.",
    answer: true,
    explanation: "Continue to the next exit. Never reverse on an expressway."
  },
  {
    id: 9,
    category: "Expressways",
    difficulty: "medium",
    question: "When entering an expressway, you should use the acceleration lane to match the speed of traffic.",
    answer: true,
    explanation: "Merge safely without disturbing vehicles already on the expressway."
  },
  {
    id: 10,
    category: "Parking",
    difficulty: "medium",
    question: "Parking within 5 meters of a road corner is prohibited.",
    answer: true,
    explanation: "Corners need visibility and space for safety."
  },
  {
    id: 11,
    category: "Parking",
    difficulty: "hard",
    question: "Parking on a pedestrian crossing is allowed if it is only for a short time.",
    answer: false,
    explanation: "Stopping or parking on pedestrian crossings is prohibited."
  },
  {
    id: 12,
    category: "Night Driving",
    difficulty: "hard",
    question: "At night, pedestrians wearing dark clothes may be difficult to see.",
    answer: true,
    explanation: "Visibility is reduced at night."
  },
  {
    id: 13,
    category: "Blind Spots",
    difficulty: "medium",
    question: "Mirrors alone can eliminate all blind spots.",
    answer: false,
    explanation: "You must also check directly."
  },
  {
    id: 14,
    category: "Weather",
    difficulty: "hard",
    question: "Hydroplaning may cause loss of steering control.",
    answer: true,
    explanation: "Water between the tires and road can reduce control."
  },
  {
    id: 15,
    category: "Traffic Signs",
    difficulty: "easy",
    question: "A stop sign requires a complete stop before proceeding.",
    answer: true,
    explanation: "You must stop fully before the stop line."
  },
  {
    id: 16,
    category: "Traffic Signs",
    difficulty: "easy",
    question: "A no-entry sign allows vehicles to enter if traffic is light.",
    answer: false,
    explanation: "No-entry means vehicles must not enter."
  },
  {
    id: 17,
    category: "Emergency Vehicles",
    difficulty: "medium",
    question: "Drivers should give way to approaching emergency vehicles.",
    answer: true,
    explanation: "Emergency vehicles have priority."
  },
  {
    id: 18,
    category: "Braking",
    difficulty: "hard",
    question: "Stopping distance becomes longer on wet roads.",
    answer: true,
    explanation: "Wet roads reduce friction and increase braking distance."
  },
  {
    id: 19,
    category: "Overtaking",
    difficulty: "hard",
    question: "Overtaking near a pedestrian crossing is dangerous and generally prohibited.",
    answer: true,
    explanation: "Pedestrians may be hidden from view."
  },
  {
    id: 20,
    category: "Alcohol",
    difficulty: "easy",
    question: "Driving after drinking a small amount of alcohol may still be dangerous.",
    answer: true,
    explanation: "Alcohol affects judgment and reaction time."
  },
  {
    id: 21,
    category: "Alcohol",
    difficulty: "hard",
    question: "A driver may drive after drinking alcohol if they feel normal.",
    answer: false,
    explanation: "Feeling normal does not mean alcohol has no effect."
  },
  {
    id: 22,
    category: "Seat Belts",
    difficulty: "easy",
    question: "Seat belts should be worn correctly by drivers and passengers.",
    answer: true,
    explanation: "Seat belts reduce injury in crashes."
  },
  {
    id: 23,
    category: "Emergencies",
    difficulty: "hard",
    question: "After an accident, the driver should prevent further danger, help injured people, and report to police.",
    answer: true,
    explanation: "These are basic duties after a traffic accident."
  },
  {
    id: 24,
    category: "Vehicle Checks",
    difficulty: "medium",
    question: "Before driving, drivers should check tires, lights, fuel, and brakes.",
    answer: true,
    explanation: "Pre-driving checks help prevent accidents and breakdowns."
  }
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState<Mode>("study");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | Difficulty>("all");
  const [showWrongOnly, setShowWrongOnly] = useState<boolean>(false);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [examQuestions, setExamQuestions] = useState<Question[]>(shuffleArray(allQuestions).slice(0, 20));
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(allQuestions.map((q) => q.category)))];
  }, []);

  const filteredQuestions = useMemo(() => {
    let base = showWrongOnly ? wrongQuestions : mode === "exam" ? examQuestions : allQuestions;

    if (categoryFilter !== "All") {
      base = base.filter((q) => q.category === categoryFilter);
    }

    if (difficultyFilter !== "all") {
      base = base.filter((q) => q.difficulty === difficultyFilter);
    }

    return base;
  }, [mode, categoryFilter, difficultyFilter, showWrongOnly, wrongQuestions, examQuestions]);

  const question = filteredQuestions[current];

  useEffect(() => {
    if (mode !== "exam" || finished) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setFinished(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mode, finished]);

  function resetProgress() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(1800);
  }

  function startExam() {
    setMode("exam");
    setShowWrongOnly(false);
    setExamQuestions(shuffleArray(allQuestions).slice(0, 20));
    resetProgress();
  }

  function startStudy() {
    setMode("study");
    resetProgress();
  }

  function answerQuestion(value: boolean) {
    if (!question) return;

    setSelected(value);

    if (value === question.answer) {
      setScore((prev) => prev + 1);
    } else {
      setWrongQuestions((prev) => {
        const alreadySaved = prev.some((q) => q.id === question.id);
        return alreadySaved ? prev : [...prev, question];
      });
    }
  }

  function nextQuestion() {
    if (current + 1 < filteredQuestions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    if (mode === "exam") {
      setExamQuestions(shuffleArray(allQuestions).slice(0, 20));
    }

    resetProgress();
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (!question) {
    return (
      <div className="app">
        <header className="hero">
          <h1>Japanese License Conversion Practice</h1>
        </header>

        <main className="card">
          <h2>No questions available.</h2>
          <p>If you clicked wrong-answer review, answer some questions incorrectly first.</p>

          <button
            onClick={() => {
              setShowWrongOnly(false);
              resetProgress();
            }}
          >
            Show All Questions
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Japanese License Conversion Practice</h1>
        <p>
          Practice traffic signs, pedestrians, intersections, expressways,
          railroad crossings, parking, weather, emergencies, and trick questions.
        </p>
      </header>

      <main className="card">
        <div className="topBar">
          <button className={mode === "study" ? "active" : ""} onClick={startStudy}>
            Study Mode
          </button>

          <button className={mode === "exam" ? "active" : ""} onClick={startExam}>
            Timed Exam
          </button>
        </div>

        {mode === "exam" && (
          <div className="timer">Time Remaining: {formatTime(timeLeft)}</div>
        )}

        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              resetProgress();
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value as "all" | Difficulty);
              resetProgress();
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard Questions</option>
          </select>
        </div>

        <div className="wrongReview">
          <button
            onClick={() => {
              setShowWrongOnly((prev) => !prev);
              resetProgress();
            }}
          >
            {showWrongOnly ? "Show All Questions" : "Review Wrong Answers"}
          </button>
        </div>

        {finished ? (
          <section className="result">
            <h2>Test Complete</h2>

            <p>
              Score: {score} / {filteredQuestions.length}
            </p>

            <p>Percentage: {Math.round((score / filteredQuestions.length) * 100)}%</p>

            <p>Wrong Questions Saved: {wrongQuestions.length}</p>

            <button onClick={restart}>Restart</button>
          </section>
        ) : (
          <section>
            <p className="progress">
              Question {current + 1} of {filteredQuestions.length}
            </p>

            <p className="category">{question.category}</p>

            <p className="difficulty">
              Difficulty: {question.difficulty.toUpperCase()}
            </p>

            <h2>{question.question}</h2>

            <div className="answers">
              <button disabled={selected !== null} onClick={() => answerQuestion(true)}>
                True / Correct
              </button>

              <button disabled={selected !== null} onClick={() => answerQuestion(false)}>
                False / Wrong
              </button>
            </div>

            {selected !== null && (
              <div className={selected === question.answer ? "feedback correct" : "feedback wrong"}>
                <h3>{selected === question.answer ? "Correct" : "Wrong"}</h3>

                <p>{question.explanation}</p>

                <button onClick={nextQuestion}>Next Question</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}