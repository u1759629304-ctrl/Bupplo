import { useState, useEffect, useRef } from "react";
import { Button } from "@/src/components/ui/Button";

interface Rect { x: number; y: number; w: number; h: number; }

export default function ShadowNinjaGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('shadow_ninja_highscore') || '0', 10);
  });

  const requestRef = useRef<number>(0);
  const ninjaImageRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    const img = new Image();
    img.src = 'https://art.pixilart.com/76a141809fc79b7.png';
    ninjaImageRef.current = img;
  }, []);
  
  // Game state references
  const keys = useRef<{ [key: string]: boolean }>({});
  const player = useRef({ x: 50, y: 500, w: 40, h: 50, vx: 0, vy: 0, speed: 6, jumpPower: -11, grounded: false, doubleJump: false, facing: 1 });
  const camera = useRef({ x: 0, y: 0 });
  
  const gravity = 0.5;

  // Level data
  const platforms: Rect[] = [
    { x: -500, y: 600, w: 1000, h: 100 },
    { x: 600, y: 500, w: 200, h: 30 },
    { x: 950, y: 400, w: 150, h: 30 },
    { x: 1300, y: 250, w: 150, h: 30 },
    { x: 1600, y: 450, w: 100, h: 30 },
    { x: 1900, y: 550, w: 120, h: 30 },
    { x: 2200, y: 400, w: 200, h: 30 },
    { x: 2600, y: 500, w: 150, h: 30 },
    { x: 2900, y: 600, w: 500, h: 100 }, // final platform
  ];
  
  const enemies = useRef([
    { x: 650, y: 460, w: 30, h: 40, patrolStart: 600, patrolEnd: 800, dir: 1, speed: 2, active: true },
    { x: 1350, y: 210, w: 30, h: 40, patrolStart: 1300, patrolEnd: 1450, dir: 1, speed: 2.5, active: true },
    { x: 2250, y: 360, w: 30, h: 40, patrolStart: 2200, patrolEnd: 2400, dir: 1, speed: 3, active: true },
    { x: 3000, y: 560, w: 30, h: 40, patrolStart: 2900, patrolEnd: 3300, dir: 1, speed: 3.5, active: true }
  ]);

  const goal = { x: 3200, y: 500, w: 60, h: 100 };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keys.current[e.key] = true;
    const handleKeyUp = (e: KeyboardEvent) => keys.current[e.key] = false;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const resetGame = () => {
    player.current = { x: 50, y: 500, w: 40, h: 50, vx: 0, vy: 0, speed: 6, jumpPower: -11, grounded: false, doubleJump: false, facing: 1 };
    enemies.current = [
        { x: 650, y: 460, w: 30, h: 40, patrolStart: 600, patrolEnd: 770, dir: 1, speed: 2, active: true },
        { x: 1350, y: 210, w: 30, h: 40, patrolStart: 1300, patrolEnd: 1420, dir: 1, speed: 2.5, active: true },
        { x: 2250, y: 360, w: 30, h: 40, patrolStart: 2200, patrolEnd: 2370, dir: 1, speed: 3, active: true },
        { x: 3000, y: 560, w: 30, h: 40, patrolStart: 2900, patrolEnd: 3300, dir: 1, speed: 3.5, active: true }
    ];
    setScore(0);
    scoreRef.current = 0;
    setGameState("playing");
  };

  const checkCollision = (rect1: Rect, rect2: Rect) => {
    return rect1.x < rect2.x + rect2.w &&
           rect1.x + rect1.w > rect2.x &&
           rect1.y < rect2.y + rect2.h &&
           rect1.y + rect1.h > rect2.y;
  };

  const gameLoop = () => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p = player.current;

    // Movement
    if (keys.current['ArrowLeft'] || keys.current['a']) {
        p.vx = -p.speed;
        p.facing = -1;
    }
    else if (keys.current['ArrowRight'] || keys.current['d']) {
        p.vx = p.speed;
        p.facing = 1;
    }
    else p.vx = 0;

    // Jump
    if ((keys.current['ArrowUp'] || keys.current['w'] || keys.current[' '])) {
        if (p.grounded) {
           p.vy = p.jumpPower;
           p.grounded = false;
           p.doubleJump = true;
           keys.current['ArrowUp'] = false; keys.current['w'] = false; keys.current[' '] = false; // pseudo-debounce
        } else if (p.doubleJump) {
           p.vy = p.jumpPower;
           p.doubleJump = false;
           keys.current['ArrowUp'] = false; keys.current['w'] = false; keys.current[' '] = false;
        }
    }

    p.vy += gravity;
    p.x += p.vx;
    p.y += p.vy;

    p.grounded = false;

    // Collision with platforms
    for (let plat of platforms) {
        if (checkCollision({x: p.x, y: p.y, w: p.w, h: p.h}, plat)) {
            // resolve vertically
            if (p.vy > 0 && p.y + p.h - p.vy <= plat.y) {
                p.y = plat.y - p.h;
                p.vy = 0;
                p.grounded = true;
                p.doubleJump = true;
            } else if (p.vy < 0 && p.y - p.vy >= plat.y + plat.h) {
                p.y = plat.y + plat.h;
                p.vy = 0;
            } else {
                // resolve horizontally
                if (p.vx > 0) p.x = plat.x - p.w;
                else if (p.vx < 0) p.x = plat.x + plat.w;
            }
        }
    }

    const updateHighScore = () => {
        setHighScore(prev => {
           const newHigh = Math.max(prev, scoreRef.current);
           localStorage.setItem('shadow_ninja_highscore', newHigh.toString());
           return newHigh;
        });
    };

    // Death by falling
    if (p.y > 1500) {
        updateHighScore();
        setGameState("gameover");
    }

    // Zoom setup
    const ZOOM = 1.3;
    const viewWidth = canvas.width / ZOOM;
    const viewHeight = canvas.height / ZOOM;

    // Camera follow (smooth)
    const targetCamX = p.x - viewWidth / 2 + (p.facing * 100); 
    const targetCamY = p.y - viewHeight / 2 + 50; 
    
    camera.current.x += (targetCamX - camera.current.x) * 0.1;
    camera.current.y += (targetCamY - camera.current.y) * 0.1;

    // Enemy update & collision
    for (let e of enemies.current) {
        if (!e.active) continue;
        e.x += e.speed * e.dir;
        if (e.x > e.patrolEnd) e.dir = -1;
        if (e.x < e.patrolStart) e.dir = 1;

        if (checkCollision(p, e)) {
            // if hitting from above (stomp)
            if (p.vy > 0 && p.y + p.h - p.vy <= e.y + e.h * 0.5) {
                e.active = false;
                p.vy = -10; // bounce
                scoreRef.current += 100;
                setScore(scoreRef.current);
            } else {
                updateHighScore();
                setGameState("gameover"); // collision from side
            }
        }
    }

    // Goal collision
    if (checkCollision(p, goal)) {
        scoreRef.current += 1000;
        setScore(scoreRef.current);
        updateHighScore();
        setGameState("won");
    }

    // Draw
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#090514');
    bgGradient.addColorStop(1, '#1c0c36');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(ZOOM, ZOOM);
    ctx.translate(-camera.current.x, -camera.current.y);

    // Draw parallax background elements (trees / buildings)
    ctx.fillStyle = "#150a2b";
    for(let i = -2; i < 20; i++) {
        ctx.fillRect(i * 300 + (camera.current.x * 0.8), 200, 100, 800);
        ctx.fillRect(i * 300 + 150 + (camera.current.x * 0.8), 350, 80, 800);
    }
    
    ctx.fillStyle = "#1f0f40";
    for(let i = -2; i < 20; i++) {
        ctx.fillRect(i * 350 + (camera.current.x * 0.5), 400, 150, 800);
    }

    // Draw platforms
    platforms.forEach(plat => {
        // Platform gradient
        const platGrad = ctx.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.h);
        platGrad.addColorStop(0, '#312e81');
        platGrad.addColorStop(1, '#0f172a');
        
        ctx.fillStyle = platGrad;
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        
        ctx.strokeStyle = "#8b5cf6";
        ctx.lineWidth = 2;
        ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);
        
        // Grass top
        ctx.fillStyle = "#4c1d95";
        ctx.fillRect(plat.x, plat.y, plat.w, 5);
    });

    // Draw goal
    const goalGrad = ctx.createLinearGradient(goal.x, goal.y, goal.x, goal.y + goal.h);
    goalGrad.addColorStop(0, '#10b981');
    goalGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = goalGrad;
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "#a7f3d0";
    ctx.lineWidth = 3;
    ctx.strokeRect(goal.x + 10, goal.y + 10, goal.w - 20, goal.h - 10);
    ctx.shadowBlur = 0;

    // Draw enemies
    enemies.current.forEach(e => {
        if (e.active) {
            ctx.fillStyle = "#ef4444";
            ctx.shadowColor = "#ef4444";
            ctx.shadowBlur = 15;
            
            // Draw little imp figure
            ctx.beginPath();
            ctx.arc(e.x + e.w/2, e.y + 15, 12, 0, Math.PI * 2); // head
            ctx.fill();
            
            ctx.fillRect(e.x + 5, e.y + 20, e.w - 10, e.h - 20); // body
            
            // eyes
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 0;
            ctx.fillRect(e.x + (e.dir === 1 ? 16 : 8), e.y + 10, 4, 4);
            ctx.fillRect(e.x + (e.dir === 1 ? 24 : 16), e.y + 10, 4, 4);
        }
    });

    // Draw player
    if (ninjaImageRef.current && ninjaImageRef.current.complete) {
        ctx.save();
        ctx.translate(p.x + p.w/2, p.y + p.h/2);
        
        // Add a light blue glow
        ctx.shadowColor = "#bae6fd";
        ctx.shadowBlur = 20;
        
        if (p.facing === -1) {
            ctx.scale(-1, 1);
        }
        
        // draw ninja image (make it a bit taller/wider manually to fit the rect nicely)
        ctx.drawImage(ninjaImageRef.current, -p.w/1.5, -p.h/1.5, p.w * 1.5, p.h * 1.5);
        ctx.restore();
    } else {
        // Fallback drawing if image not loaded
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 15;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.shadowBlur = 0; // reset
    }

    ctx.restore();

    requestRef.current = requestAnimationFrame(gameLoop);
  };


  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [gameState]);

  // Handle resize
  useEffect(() => {
     const resize = () => {
         if (canvasRef.current) {
             canvasRef.current.width = window.innerWidth;
             canvasRef.current.height = window.innerHeight - 80;
         }
     }
     resize();
     window.addEventListener("resize", resize);
     return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
        
        {gameState === 'playing' && (
            <div className="flex justify-between items-start">
             <div className="glass-panel px-6 py-3 rounded-2xl pointer-events-auto flex items-center gap-6">
                <div>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">Score</span>
                  <span className="text-3xl font-display font-bold text-white/90 text-glow">{score}</span>
                </div>
                <div>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">High</span>
                  <span className="text-xl font-display font-bold text-white/70">{highScore}</span>
                </div>
             </div>
             
             <div className="glass-panel px-6 py-3 rounded-2xl">
                <span className="text-white/50 text-sm font-bold uppercase tracking-widest block text-right">Controls</span>
                <div className="flex gap-2 mt-1">
                  <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20">A</kbd>
                  <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20">D</kbd>
                  <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20 mr-2">Move</kbd>
                  <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20">Space</kbd>
                  <span className="text-white/50 text-sm ml-1">Jump</span>
                </div>
            </div>
            </div>
        )}

        {gameState === "start" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-md">
                <div className="glass-panel p-12 rounded-3xl text-center max-w-lg glow-purple-strong border border-white/20">
                <h2 className="font-display text-5xl font-bold mb-4">Shadow Ninja</h2>
                <p className="text-white/70 mb-8 font-medium">
                    Een hardcore stealth platformer. Spring op vijanden om ze te verslaan. Dash door de schaduwen. Bereik het groene portaal.
                </p>
                <Button size="lg" variant="purple" onClick={resetGame} className="w-full text-lg">
                    Start Missie
                </Button>
                </div>
            </div>
        )}

        {gameState === "gameover" && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/40 pointer-events-auto backdrop-blur-md">
                <div className="glass-panel p-12 rounded-3xl text-center max-w-lg glow-red border border-red-500/30">
                <h2 className="font-display text-5xl font-bold text-red-500 mb-2">GEFAALD</h2>
                <p className="text-white/50 mb-8 font-bold uppercase tracking-widest text-sm">Missie Mislukt</p>
                
                <Button size="lg" variant="purple" onClick={resetGame} className="w-full text-lg">
                    Opnieuw Proberen
                </Button>
                </div>
            </div>
        )}

        {gameState === "won" && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-900/40 pointer-events-auto backdrop-blur-md">
                <div className="glass-panel p-12 rounded-3xl text-center max-w-lg glow-green border border-green-500/30">
                <h2 className="font-display text-5xl font-bold text-green-500 mb-2">MISSIE VOLTOOID</h2>
                <p className="text-white/50 mb-8 font-bold uppercase tracking-widest text-sm">Doel Bereikt</p>
                
                <div className="mb-8">
                    <span className="text-white/50 text-sm font-bold uppercase tracking-widest block mb-1">Score</span>
                    <span className="text-6xl font-display font-bold text-white text-glow">{score}</span>
                </div>

                <Button size="lg" variant="purple" onClick={resetGame} className="w-full text-lg">
                    Opnieuw Spelen
                </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
