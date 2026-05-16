export interface Game {
  id: string;
  title: string;
  category: string;
  tags: string[];
  color: "purple" | "blue" | "red" | "green" | "yellow";
  gradient: string;
  description: string;
  features: string[];
  image?: string;
  developer?: string;
}

export const GAMES: Game[] = [
  {
    id: "neon-racer",
    title: "Neon Racer",
    category: "Racing",
    tags: ["Multiplayer", "Speed", "Action"],
    color: "purple",
    gradient: "from-purple-900 to-black",
    description: "Race through neon-drenched cyberpunk cities at breakneck speeds.",
    features: ["Online multiplayer", "Customize your vehicle", "15 unique tracks", "Synthwave soundtrack"],
    image: "https://imgur.com/ygeWxmS.png"
  },
  {
    id: "shadow-ninja",
    title: "Shadow Ninja",
    category: "Action",
    tags: ["Stealth", "Platformer", "Hardcore"],
    color: "purple",
    gradient: "from-fuchsia-900 to-black",
    description: "Use the shadows to your advantage to defeat the warlord.",
    features: ["Fluid parkour movement", "Challenging boss fights", "Level editor"],
    image: "https://imgur.com/bmIALyr.png"
  },
  {
    id: "gta-vice-city",
    title: "GTA III Vice City",
    category: "Action",
    tags: ["Open World", "Classic", "Crime"],
    color: "yellow",
    gradient: "from-yellow-900 to-black",
    description: "Welcome to the 1980s. Welcome to Vice City.",
    features: ["Open world", "Iconic soundtrack", "Story mode"],
    image: "https://play-lh.googleusercontent.com/ujih8zF9R2ghF-qx2-gfu9hzDybab_hkmbTcelcS_lipXzbN0Yq9uSjXXNhfMucNqW84=w526-h296-rw",
    developer: "Rockstar Games"
  },
  {
    id: "classic-chess",
    title: "Classic Chess",
    category: "Strategy",
    tags: ["Board", "Brain", "Multiplayer"],
    color: "green",
    gradient: "from-green-900 to-black",
    description: "The classic game of chess. Play against friends or our advanced AI.",
    features: ["Online matchmaking", "Elo system", "Puzzle mode"]
  },
  {
    id: "fruit-ninja",
    title: "Fruit Ninja",
    category: "Arcade",
    tags: ["Casual", "Highscore", "Action"],
    color: "red",
    gradient: "from-red-900 to-black",
    description: "Slice as much fruit as you can without dropping them or hitting bombs!",
    features: ["Endless mode", "Combo system", "Unlockable blades"]
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    tags: ["Hardcore", "Casual", "Endless"],
    color: "yellow",
    gradient: "from-yellow-700 to-black",
    description: "Tap to flap. Don't hit the pipes. Sounds simple, right?",
    features: ["Global leaderboards", "Retro pixel art", "Frustratingly fun"]
  },
  {
    id: "pac-man",
    title: "Pac-Man",
    category: "Arcade",
    tags: ["Classic", "Maze", "Retro"],
    color: "blue",
    gradient: "from-blue-900 to-black",
    description: "Eat all the dots and avoid the ghosts in this classic maze chase.",
    features: ["256 levels", "Original sounds", "Speed runs"]
  },
  {
    id: "tetris",
    title: "Tetris",
    category: "Puzzle",
    tags: ["Falling blocks", "Classic", "Brain"],
    color: "purple",
    gradient: "from-purple-900 to-black",
    description: "Clear lines by fitting falling blocks together perfectly.",
    features: ["Marathon mode", "Sprint mode", "Hold and spin mechanics"]
  },
  {
    id: "snake",
    title: "Snake Classic",
    category: "Arcade",
    tags: ["Retro", "Endless", "Casual"],
    color: "green",
    gradient: "from-emerald-900 to-black",
    description: "Eat the apples to grow, but don't bite your own tail!",
    features: ["Classic rules", "Multiple speed settings", "Local highscores"]
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Action",
    tags: ["Shooter", "Sci-Fi", "Retro"],
    color: "red",
    gradient: "from-rose-900 to-black",
    description: "Defend Earth from wave after wave of descending aliens.",
    features: ["UFO bonus points", "Destructible shields", "Increasing difficulty"]
  },
  {
    id: "pong",
    title: "Pong",
    category: "Sports",
    tags: ["2 Player", "Retro", "Simple"],
    color: "blue",
    gradient: "from-cyan-900 to-black",
    description: "The original digital sport. Bounce the ball past your opponent.",
    features: ["Local multiplayer", "AI opponent", "Neon glowing graphics"]
  },
  {
    id: "solitaire",
    title: "Solitaire",
    category: "Puzzle",
    tags: ["Cards", "Relaxing", "Classic"],
    color: "blue",
    gradient: "from-indigo-900 to-black",
    description: "The classic card game of patience and strategy.",
    features: ["Klondike rules", "Daily challenges", "Custom card backs"]
  },
  {
    id: "doom",
    title: "Doom",
    category: "Action",
    tags: ["FPS", "Retro", "Violent"],
    color: "red",
    gradient: "from-red-900 to-black",
    description: "Rip and tear your way through the demonic hordes.",
    features: ["Classic 2.5D engine", "Multiple weapons", "Secret areas"]
  },
  {
    id: "minecraft",
    title: "Minecraft",
    category: "Simulation",
    tags: ["Sandbox", "Building", "Survival"],
    color: "green",
    gradient: "from-teal-900 to-black",
    description: "Survive and build entirely out of blocks in a massive generated world.",
    features: ["Crafting system", "Day/night cycle", "Infinite world"]
  },
  {
    id: "mario",
    title: "Super Mario Bros",
    category: "Action",
    tags: ["Platformer", "Side-scrolling", "Classic"],
    color: "red",
    gradient: "from-red-800 to-black",
    description: "Run, jump, and stomp enemies to save the princess.",
    features: ["8 varied worlds", "Hidden secrets", "Power-ups"]
  }
];

export const CATEGORIES = [
  "All",
  "Action",
  "Arcade",
  "Puzzle",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing"
];
