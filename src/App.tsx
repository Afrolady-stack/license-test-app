import { useMemo, useState } from "react";
import "./App.css";

type Question = {
  category: string;
  question: string;
  answer: boolean;
  explanation: string;
};

const questions: Question[] = [
  {
    category: "Traffic Signals",
    question: "A green traffic light means vehicles may proceed, but drivers must still watch for pedestrians and other vehicles.",
    answer: true,
    explanation: "Green means you may proceed, but only after confirming safety."
  },
  {
    category: "Traffic Signals",
    question: "A yellow traffic light means you should speed up to pass through the intersection before it turns red.",
    answer: false,
    explanation: "Yellow means stop if you can do so safely. Do not rush into the intersection."
  },
  {
    category: "Traffic Signals",
    question: "A red light means vehicles and streetcars must not proceed beyond the stopping position.",
    answer: true,
    explanation: "At a red light, you must stop before the stop line or intersection."
  },
  {
    category: "Traffic Signals",
    question: "A flashing red light means slow down and proceed without stopping.",
    answer: false,
    explanation: "A flashing red light means stop first, then proceed only after confirming safety."
  },
  {
    category: "Traffic Signals",
    question: "A flashing yellow light means proceed carefully while paying attention to other traffic.",
    answer: true,
    explanation: "Flashing yellow requires caution, not a complete stop unless needed."
  },
  {
    category: "Traffic Signals",
    question: "Even if your signal is green, you should not enter an intersection if traffic ahead is blocked and you may stop inside the intersection.",
    answer: true,
    explanation: "Do not enter if you may block the intersection."
  },
  {
    category: "Traffic Signs",
    question: "A stop sign means you must stop immediately before the stop line or intersection.",
    answer: true,
    explanation: "A full stop is required at a stop sign."
  },
  {
    category: "Traffic Signs",
    question: "A no-entry sign means vehicles may enter only if the road is clear.",
    answer: false,
    explanation: "No-entry means vehicles must not enter."
  },
  {
    category: "Traffic Signs",
    question: "A maximum speed limit sign means you must not exceed the speed shown.",
    answer: true,
    explanation: "The posted maximum speed is the legal upper limit."
  },
  {
    category: "Traffic Signs",
    question: "A minimum speed limit sign means you should not drive slower than the indicated speed unless unavoidable.",
    answer: true,
    explanation: "Minimum speed rules are common on expressways."
  },
  {
    category: "Traffic Signs",
    question: "A pedestrian crossing sign means drivers should pay attention because pedestrians may be crossing.",
    answer: true,
    explanation: "Pedestrian crossings require special caution."
  },
  {
    category: "Traffic Signs",
    question: "A no parking sign means stopping briefly to load passengers is always prohibited.",
    answer: false,
    explanation: "No parking and no stopping are different. Some short stops may still be allowed unless no stopping is also shown."
  },
  {
    category: "Pedestrians",
    question: "When approaching a pedestrian crossing where pedestrians may cross, drivers should slow down and be ready to stop.",
    answer: true,
    explanation: "Pedestrians have priority at crossings."
  },
  {
    category: "Pedestrians",
    question: "If a pedestrian is crossing at a pedestrian crossing, a driver may pass if there is enough space.",
    answer: false,
    explanation: "You must stop and allow the pedestrian to cross safely."
  },
  {
    category: "Pedestrians",
    question: "Drivers must not overtake or pass another vehicle just before a pedestrian crossing.",
    answer: true,
    explanation: "Overtaking near crossings is dangerous because pedestrians may be hidden."
  },
  {
    category: "Pedestrians",
    question: "When passing pedestrians on a narrow road, it is safe to keep normal speed if you sound the horn.",
    answer: false,
    explanation: "You should slow down and keep a safe distance."
  },
  {
    category: "Pedestrians",
    question: "Children, elderly people, and people with disabilities require extra caution from drivers.",
    answer: true,
    explanation: "They may move unpredictably or need more time."
  },
  {
    category: "Emergency Vehicles",
    question: "When an emergency vehicle approaches near an intersection, drivers should move to the left and stop outside the intersection when possible.",
    answer: true,
    explanation: "Emergency vehicles have priority."
  },
  {
    category: "Emergency Vehicles",
    question: "If an emergency vehicle approaches from behind, drivers should ignore it if they are already moving with traffic.",
    answer: false,
    explanation: "Drivers must give way safely."
  },
  {
    category: "Emergency Vehicles",
    question: "On a one-way road, if moving left would block the emergency vehicle, drivers may move to the right side of the road.",
    answer: true,
    explanation: "The goal is to avoid obstructing the emergency vehicle."
  },
  {
    category: "Route Buses",
    question: "Drivers should not obstruct a route bus that is signaling to leave a bus stop.",
    answer: true,
    explanation: "Route buses have priority when starting from a stop."
  },
  {
    category: "Route Buses",
    question: "Any vehicle may drive in an exclusive bus lane at any time if traffic is light.",
    answer: false,
    explanation: "Exclusive lanes are restricted to designated vehicles unless exceptions apply."
  },
  {
    category: "Intersections",
    question: "When turning left, a vehicle should move close to the left edge of the road and proceed slowly.",
    answer: true,
    explanation: "This helps prevent bicycles or motorcycles from entering the left side blind spot."
  },
  {
    category: "Intersections",
    question: "When turning right, a vehicle should move close to the center of the road before turning.",
    answer: true,
    explanation: "This is the correct position for a right turn, except where signs or markings say otherwise."
  },
  {
    category: "Intersections",
    question: "A driver may turn right at high speed if the traffic light is green.",
    answer: false,
    explanation: "Right turns require caution because of pedestrians, bicycles, and oncoming traffic."
  },
  {
    category: "Intersections",
    question: "At an uncontrolled intersection where the intersecting road is wider, the vehicle on the wider road generally has priority.",
    answer: true,
    explanation: "Road width helps determine priority where no signal or sign controls traffic."
  },
  {
    category: "Intersections",
    question: "At a stop sign, stopping slowly without fully stopping is acceptable if there are no other vehicles.",
    answer: false,
    explanation: "A complete stop is required."
  },
  {
    category: "Roundabouts",
    question: "Vehicles entering a roundabout must proceed slowly and must not obstruct vehicles already in the roundabout.",
    answer: true,
    explanation: "Vehicles already in the roundabout have priority."
  },
  {
    category: "Roundabouts",
    question: "In a roundabout, vehicles generally proceed clockwise.",
    answer: true,
    explanation: "In Japan, roundabouts are driven clockwise."
  },
  {
    category: "Roundabouts",
    question: "When leaving a roundabout, you should signal left before the exit you intend to take.",
    answer: true,
    explanation: "Signal to show your intention to exit."
  },
  {
    category: "Railroad Crossings",
    question: "Before entering a railroad crossing, drivers must stop, look, and listen.",
    answer: true,
    explanation: "Railroad crossings require a full safety check."
  },
  {
    category: "Railroad Crossings",
    question: "If the crossing gate is rising, it is safe to enter immediately.",
    answer: false,
    explanation: "You must wait until it is fully safe and check both directions."
  },
  {
    category: "Railroad Crossings",
    question: "You should not change gears while crossing a railroad crossing.",
    answer: true,
    explanation: "Changing gears may cause the vehicle to stall."
  },
  {
    category: "Railroad Crossings",
    question: "If traffic ahead is congested and your vehicle may stop on the railroad crossing, you must not enter.",
    answer: true,
    explanation: "Never enter a crossing unless there is space beyond it."
  },
  {
    category: "Railroad Crossings",
    question: "If your car breaks down on a railroad crossing, you should immediately alert the train operator and move the vehicle if possible.",
    answer: true,
    explanation: "Use the emergency button, smoke flare, or other warning method."
  },
  {
    category: "Speed",
    question: "Stopping distance is the total of reaction distance and braking distance.",
    answer: true,
    explanation: "Stopping distance = reaction distance + braking distance."
  },
  {
    category: "Speed",
    question: "Reaction distance becomes shorter when the driver is tired.",
    answer: false,
    explanation: "Tiredness makes reaction slower, increasing reaction distance."
  },
  {
    category: "Speed",
    question: "Braking distance becomes longer when the road is wet.",
    answer: true,
    explanation: "Wet roads reduce friction."
  },
  {
    category: "Speed",
    question: "The faster a vehicle travels, the longer its stopping distance becomes.",
    answer: true,
    explanation: "Both reaction distance and braking distance increase with speed."
  },
  {
    category: "Speed",
    question: "On ordinary roads without signs, automobiles generally have a legal maximum speed of 60 km/h.",
    answer: true,
    explanation: "This is the general legal speed limit for ordinary roads unless signs indicate otherwise."
  },
  {
    category: "Speed",
    question: "Motorized bicycles may generally travel up to 60 km/h on ordinary roads.",
    answer: false,
    explanation: "Motorized bicycles have a lower legal speed limit."
  },
  {
    category: "Braking",
    question: "Sudden braking should be avoided except when necessary to avoid danger.",
    answer: true,
    explanation: "Sudden braking can cause rear-end collisions or skidding."
  },
  {
    category: "Braking",
    question: "On slippery roads, sudden steering and sudden braking should be avoided.",
    answer: true,
    explanation: "Sudden actions can cause skidding."
  },
  {
    category: "Braking",
    question: "Pumping the brake pedal several times can warn vehicles behind you and help avoid rear-end collisions.",
    answer: true,
    explanation: "This is cadence braking and also signals danger to following vehicles."
  },
  {
    category: "Braking",
    question: "ABS means the driver can brake carelessly without risk.",
    answer: false,
    explanation: "ABS helps control wheel lock, but safe speed and distance are still required."
  },
  {
    category: "Lane Rules",
    question: "Vehicles generally keep to the left side of the road in Japan.",
    answer: true,
    explanation: "Japan uses left-side traffic."
  },
  {
    category: "Lane Rules",
    question: "Unnecessary lane changes are allowed as long as the driver signals.",
    answer: false,
    explanation: "Unnecessary lane changes are dangerous and prohibited."
  },
  {
    category: "Lane Rules",
    question: "When changing lanes, check safety, signal, and move gradually.",
    answer: true,
    explanation: "Lane changes require safety confirmation and signaling."
  },
  {
    category: "Lane Rules",
    question: "A yellow lane line always means lane changes are freely allowed.",
    answer: false,
    explanation: "Yellow lane markings often restrict lane changes."
  },
  {
    category: "Lane Rules",
    question: "Drivers must follow lane direction signs and pavement markings.",
    answer: true,
    explanation: "Designated direction markings must be obeyed."
  },
  {
    category: "Overtaking",
    question: "Overtaking near the top of an uphill slope is prohibited.",
    answer: true,
    explanation: "Visibility is poor and oncoming traffic may be hidden."
  },
  {
    category: "Overtaking",
    question: "Overtaking is dangerous on curves because visibility and vehicle stability are reduced.",
    answer: true,
    explanation: "Curves increase risk during overtaking."
  },
  {
    category: "Overtaking",
    question: "A driver may overtake just before a railroad crossing if no train is visible.",
    answer: false,
    explanation: "Overtaking near railroad crossings is prohibited."
  },
  {
    category: "Overtaking",
    question: "When being overtaken, a driver should not increase speed.",
    answer: true,
    explanation: "Increasing speed while being overtaken is dangerous."
  },
  {
    category: "Overtaking",
    question: "Passing and overtaking have exactly the same meaning.",
    answer: false,
    explanation: "Overtaking involves changing course to pass a vehicle ahead."
  },
  {
    category: "Parking and Stopping",
    question: "Parking means stopping continuously, waiting for passengers or cargo, or leaving the vehicle so it cannot be driven immediately.",
    answer: true,
    explanation: "This is the general meaning of parking."
  },
  {
    category: "Parking and Stopping",
    question: "Stopping means stopping for a short time that is not considered parking.",
    answer: true,
    explanation: "Short stops may not be parking, depending on the situation."
  },
  {
    category: "Parking and Stopping",
    question: "Parking or stopping is prohibited within 5 meters of a road corner.",
    answer: true,
    explanation: "Corners require visibility and safety space."
  },
  {
    category: "Parking and Stopping",
    question: "Parking or stopping is allowed on pedestrian crossings if it is only for a short time.",
    answer: false,
    explanation: "Stopping or parking on pedestrian crossings is prohibited."
  },
  {
    category: "Parking and Stopping",
    question: "A driver should not leave children alone inside a vehicle.",
    answer: true,
    explanation: "This is dangerous because of heat, mischief, and emergencies."
  },
  {
    category: "Parking and Stopping",
    question: "When leaving a vehicle, the driver should stop the engine, lock the doors, and take the key.",
    answer: true,
    explanation: "This prevents theft and danger."
  },
  {
    category: "Expressways",
    question: "On expressways, sudden braking is especially dangerous because vehicles travel at high speed.",
    answer: true,
    explanation: "High speed increases risk and stopping distance."
  },
  {
    category: "Expressways",
    question: "Pedestrians and bicycles may use expressways if there is no other road available.",
    answer: false,
    explanation: "Pedestrians and bicycles are not permitted on expressways."
  },
  {
    category: "Expressways",
    question: "Before entering an expressway, drivers should check fuel, tires, cargo, and vehicle condition.",
    answer: true,
    explanation: "Breakdowns on expressways are very dangerous."
  },
  {
    category: "Expressways",
    question: "If you miss your expressway exit, you should reverse carefully on the shoulder.",
    answer: false,
    explanation: "Never reverse on an expressway. Continue to the next exit."
  },
  {
    category: "Expressways",
    question: "When entering a main expressway lane, use the acceleration lane to increase speed and merge safely.",
    answer: true,
    explanation: "You must not obstruct vehicles already in the main lane."
  },
  {
    category: "Expressways",
    question: "When leaving an expressway, reduce speed sufficiently in the deceleration lane.",
    answer: true,
    explanation: "Do not slow down suddenly in the main lane."
  },
  {
    category: "Expressways",
    question: "If your vehicle breaks down on an expressway, use hazard lights and an emergency warning reflector device.",
    answer: true,
    explanation: "You must warn following vehicles."
  },
  {
    category: "Expressways",
    question: "On expressways, stopping or parking is generally allowed on the shoulder for rest.",
    answer: false,
    explanation: "Stopping on expressways is only allowed in emergencies or designated areas."
  },
  {
    category: "Bad Weather",
    question: "In rain, drivers should reduce speed and keep a longer distance from the vehicle ahead.",
    answer: true,
    explanation: "Rain makes roads slippery and reduces visibility."
  },
  {
    category: "Bad Weather",
    question: "Hydroplaning can occur when driving fast through water, causing loss of steering and braking control.",
    answer: true,
    explanation: "This is very dangerous on wet roads."
  },
  {
    category: "Bad Weather",
    question: "In fog, drivers should use high beams because they always improve visibility.",
    answer: false,
    explanation: "High beams can reflect in fog and make visibility worse. Use fog lights or low beams."
  },
  {
    category: "Bad Weather",
    question: "In snow or icy conditions, drivers should avoid sudden starting, steering, and braking.",
    answer: true,
    explanation: "Sudden actions cause skidding."
  },
  {
    category: "Bad Weather",
    question: "On snowy roads, stopping distance can become longer than on dry roads.",
    answer: true,
    explanation: "Snow and ice greatly reduce friction."
  },
  {
    category: "Bad Weather",
    question: "In strong wind, drivers should reduce speed and hold the steering wheel firmly.",
    answer: true,
    explanation: "Strong wind can affect vehicle direction."
  },
  {
    category: "Night Driving",
    question: "At night, pedestrians wearing dark clothing may be difficult to see.",
    answer: true,
    explanation: "Night visibility is limited."
  },
  {
    category: "Night Driving",
    question: "At night, drivers should always use high beams even when there is an oncoming vehicle.",
    answer: false,
    explanation: "Use low beams when passing oncoming vehicles to avoid dazzling them."
  },
  {
    category: "Night Driving",
    question: "Drivers may misjudge distance and speed at night.",
    answer: true,
    explanation: "Night driving affects perception."
  },
  {
    category: "Night Driving",
    question: "Interior lights should not be used unnecessarily while driving at night.",
    answer: true,
    explanation: "Interior lights reduce visibility outside."
  },
  {
    category: "Blind Spots",
    question: "Mirrors do not show all areas around the vehicle, so drivers must also check directly.",
    answer: true,
    explanation: "Blind spots remain even when mirrors are adjusted."
  },
  {
    category: "Blind Spots",
    question: "A two-wheeled vehicle may be hidden in a car’s blind spot.",
    answer: true,
    explanation: "Motorcycles and bicycles are easy to miss."
  },
  {
    category: "Blind Spots",
    question: "Blind spots are only behind the vehicle.",
    answer: false,
    explanation: "Blind spots can be in front, sides, rear, and around pillars."
  },
  {
    category: "Blind Spots",
    question: "Parked vehicles can create blind spots where children or bicycles may suddenly appear.",
    answer: true,
    explanation: "Always anticipate hidden hazards near parked vehicles."
  },
  {
    category: "Hazard Anticipation",
    question: "Safe driving means anticipating possible hazards, not only reacting after danger appears.",
    answer: true,
    explanation: "Hazard anticipation is a major part of safe driving."
  },
  {
    category: "Hazard Anticipation",
    question: "If you cannot see a hazard, you can assume there is no danger.",
    answer: false,
    explanation: "Invisible hazards may still exist."
  },
  {
    category: "Hazard Anticipation",
    question: "Drivers should drive with a mindset of 'there might be danger ahead.'",
    answer: true,
    explanation: "This helps prevent accidents."
  },
  {
    category: "Hazard Anticipation",
    question: "When passing parked cars, drivers should expect doors to open or pedestrians to appear.",
    answer: true,
    explanation: "These are common hidden hazards."
  },
  {
    category: "Alcohol and Fatigue",
    question: "Driving after drinking alcohol is prohibited even if the amount is small.",
    answer: true,
    explanation: "Alcohol affects judgment and reaction."
  },
  {
    category: "Alcohol and Fatigue",
    question: "A driver may drive after drinking if they feel normal.",
    answer: false,
    explanation: "Feeling normal does not mean alcohol has no effect."
  },
  {
    category: "Alcohol and Fatigue",
    question: "Offering alcohol to someone who will drive is also wrong.",
    answer: true,
    explanation: "Do not encourage or allow drunk driving."
  },
  {
    category: "Alcohol and Fatigue",
    question: "Fatigue can delay reaction time and cause accidents.",
    answer: true,
    explanation: "Tired drivers react slowly."
  },
  {
    category: "Alcohol and Fatigue",
    question: "If you feel sleepy while driving, you should continue until your destination to avoid stopping.",
    answer: false,
    explanation: "You should stop safely and rest."
  },
  {
    category: "Mobile Phones",
    question: "Using a mobile phone while driving can distract the driver and is prohibited.",
    answer: true,
    explanation: "Phone use reduces attention and causes danger."
  },
  {
    category: "Mobile Phones",
    question: "Looking briefly at a phone while driving is safe if traffic is light.",
    answer: false,
    explanation: "Even brief distraction can cause an accident."
  },
  {
    category: "Seat Belts",
    question: "Drivers and passengers should wear seat belts correctly.",
    answer: true,
    explanation: "Seat belts reduce injury."
  },
  {
    category: "Seat Belts",
    question: "Seat belts are unnecessary for short trips.",
    answer: false,
    explanation: "Seat belts are necessary even for short trips."
  },
  {
    category: "Seat Belts",
    question: "Child seats should be used according to the child’s age, height, and weight.",
    answer: true,
    explanation: "Correct child seat use is important for safety."
  },
  {
    category: "Seat Belts",
    question: "A child may sit on an adult’s lap instead of using a child seat.",
    answer: false,
    explanation: "This is unsafe in a crash."
  },
  {
    category: "Vehicle Maintenance",
    question: "Before driving, drivers should check important items such as tires, lights, fuel, and brakes.",
    answer: true,
    explanation: "Pre-driving checks help prevent accidents and breakdowns."
  },
  {
    category: "Vehicle Maintenance",
    question: "Worn tires can increase the risk of slipping and poor braking.",
    answer: true,
    explanation: "Tire condition affects safety."
  },
  {
    category: "Vehicle Maintenance",
    question: "If the brake fluid level is low, it may indicate a leak or brake problem.",
    answer: true,
    explanation: "Brake fluid is essential for safe braking."
  },
  {
    category: "Vehicle Maintenance",
    question: "If a warning light appears, the driver should ignore it if the vehicle still moves.",
    answer: false,
    explanation: "Warning lights may indicate serious problems."
  },
  {
    category: "Vehicle Maintenance",
    question: "A driver should make sure cargo is secure before traveling.",
    answer: true,
    explanation: "Loose cargo can fall or affect stability."
  },
  {
    category: "Cargo",
    question: "Cargo must not obstruct the driver’s view or hide lights and license plates.",
    answer: true,
    explanation: "Cargo must be loaded safely."
  },
  {
    category: "Cargo",
    question: "A driver may overload a vehicle if the trip is short.",
    answer: false,
    explanation: "Overloading is dangerous and illegal."
  },
  {
    category: "Cargo",
    question: "Cargo should be loaded evenly to keep the vehicle stable.",
    answer: true,
    explanation: "Uneven cargo can affect steering and braking."
  },
  {
    category: "Cargo",
    question: "If cargo falls from a vehicle, the driver should take measures to prevent danger to others.",
    answer: true,
    explanation: "The driver is responsible for securing cargo."
  },
  {
    category: "Emergencies",
    question: "If a traffic accident occurs, the driver should prevent further danger, help injured people, and report to the police.",
    answer: true,
    explanation: "These are the basic duties after an accident."
  },
  {
    category: "Emergencies",
    question: "If the accident is minor, there is no need to report it to the police.",
    answer: false,
    explanation: "Traffic accidents should be reported."
  },
  {
    category: "Emergencies",
    question: "If someone is injured, first aid should be given as much as possible while waiting for help.",
    answer: true,
    explanation: "Helping injured people is a duty."
  },
  {
    category: "Emergencies",
    question: "If your vehicle breaks down at night, you should turn on hazard lights or other warning devices.",
    answer: true,
    explanation: "You must warn other road users."
  },
  {
    category: "Emergencies",
    question: "If your tire bursts, you should hold the steering wheel firmly, avoid sudden braking, and slow down gradually.",
    answer: true,
    explanation: "Sudden braking can cause loss of control."
  },
  {
    category: "Earthquakes",
    question: "If a major earthquake occurs while driving, you should avoid sudden braking and gradually reduce speed.",
    answer: true,
    explanation: "Sudden braking can cause collisions."
  },
  {
    category: "Earthquakes",
    question: "After parking during an earthquake evacuation, you should lock the doors and take the key so nobody can move the vehicle.",
    answer: false,
    explanation: "In some evacuation situations, leave the key so emergency workers can move the vehicle if needed."
  },
  {
    category: "Earthquakes",
    question: "During an earthquake, drivers should listen to traffic information and follow police instructions.",
    answer: true,
    explanation: "Disaster traffic control may be implemented."
  },
  {
    category: "Driver Responsibility",
    question: "Drivers must consider the safety of others, not only their own convenience.",
    answer: true,
    explanation: "Driving is a social responsibility."
  },
  {
    category: "Driver Responsibility",
    question: "Drivers should drive aggressively if they are confident in their skills.",
    answer: false,
    explanation: "Overconfidence and aggressive driving are dangerous."
  },
  {
    category: "Driver Responsibility",
    question: "Traffic rules exist to prevent danger, ensure smooth traffic, and reduce pollution.",
    answer: true,
    explanation: "These are key purposes of traffic law."
  },
  {
    category: "Driver Responsibility",
    question: "If a driver is irritated, worried, or hurried, their attention may decrease.",
    answer: true,
    explanation: "Mental state affects safe driving."
  }
];

function shuffleArray(array: Question[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [mode, setMode] = useState<"study" | "exam">("study");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [filter, setFilter] = useState("All");
  const [examQuestions, setExamQuestions] = useState<Question[]>(shuffleArray(questions));

  const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))];

  const filteredQuestions = useMemo(() => {
    const baseQuestions = mode === "exam" ? examQuestions : questions;

    if (filter === "All") return baseQuestions;
    return baseQuestions.filter(q => q.category === filter);
  }, [filter, mode, examQuestions]);

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

    if (mode === "exam") {
      setExamQuestions(shuffleArray(questions));
    }
  }

  function changeFilter(category: string) {
    setFilter(category);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function changeMode(newMode: "study" | "exam") {
    setMode(newMode);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);

    if (newMode === "exam") {
      setExamQuestions(shuffleArray(questions));
    }
  }

  if (!question) {
    return (
      <div className="app">
        <main className="card">
          <h2>No questions found.</h2>
          <button onClick={() => changeFilter("All")}>Show All Questions</button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Japanese License Conversion Practice</h1>
        <p>
          Practice true/false questions based on your driving school PDFs.
          Focus on signs, rules, hazards, parking, intersections, expressways,
          emergencies, and road safety.
        </p>
      </header>

      <main className="card">
        <div className="topBar">
          <button
            className={mode === "study" ? "active" : ""}
            onClick={() => changeMode("study")}
          >
            Study Mode
          </button>

          <button
            className={mode === "exam" ? "active" : ""}
            onClick={() => changeMode("exam")}
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

            <p>
              Percentage: {Math.round((score / filteredQuestions.length) * 100)}%
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

                {mode === "exam" && (
                  <p>
                    Correct answer:{" "}
                    <strong>{question.answer ? "True / Correct" : "False / Wrong"}</strong>
                  </p>
                )}

                <button onClick={nextQuestion}>Next Question</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}