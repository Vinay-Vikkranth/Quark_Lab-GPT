import { RxLightningBolt, RxStopwatch } from "react-icons/rx";
import { PiShieldCheck } from "react-icons/pi";
import { LuSwords } from "react-icons/lu";
import bgGames from "../../../assets/bg-games.jpg";

const games = [
  {
    name: "Flashcard Rush",
    description: "Test your memory with timed flashcard challenges",
    players: "2.3k players",
    icon: <RxLightningBolt className="text-white h-5 w-5" />,
  },
  {
    name: "Knowledge Quest",
    description: "Embark on a learning adventure with quests",
    players: "1.8k players",
    icon: <PiShieldCheck className="text-white h-5 w-5" />,
  },
  {
    name: "Time Challenge",
    description: "Race against the clock to answer questions",
    players: "3.1k players",
    icon: <RxStopwatch className="text-white h-5 w-5" />,
  },
  {
    name: "Study Battle",
    description: "Compete with friends in educational challenges",
    players: "2.7k players",
    icon: <LuSwords className="text-white h-5 w-5" />,
  },
];

export default function Games() {
  const text = "Learn with games";

  return (
    <div className="relative isolate w-full min-h-screen overflow-hidden">
      {/* Blurred Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url(${bgGames})`,
          filter: "blur(8px) brightness(0.6)",
          transform: "scale(1.05)",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 py-24 px-6 sm:px-6 md:px-16 lg:px-8">
        <div className="flex flex-col items-center mx-auto max-w-7xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-center text-white mb-10 tracking-wider">
            {text}
          </h1>

          <div className="gamesContainer w-full rounded-3xl p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-gradient-to-br from-blue-700/80 to-purple-800/80 backdrop-blur-sm">
            {games.map((game, idx) => (
              <div
                key={idx}
                className="flex flex-col transition-colors bg-white/15 hover:bg-white/20 rounded-xl h-48 p-4"
              >
                <div className="flex gap-2 items-center mb-2">
                  <div className="p-2 rounded-full bg-white/20 aspect-square">
                    {game.icon}
                  </div>
                  <h3 className="font-medium text-2xl text-white">
                    {game.name}
                  </h3>
                </div>
                <p className="text-white/85">{game.description}</p>
                <div className="flex gap-4 items-center mt-auto">
                  <div className="flex">
                    <div className="-mr-2 w-5 h-5 border border-white bg-teal-400 rounded-full"></div>
                    <div className="-mr-2 w-5 h-5 border border-white bg-blue-400 rounded-full"></div>
                    <div className="-mr-2 w-5 h-5 border border-white bg-indigo-300 rounded-full"></div>
                  </div>
                  <span className="text-sm text-white/75">{game.players}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
