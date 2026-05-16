import { useState, useEffect, useRef } from "react";
import { Button } from "@/src/components/ui/Button";

interface Pipe { x: number; topHeight: number; passed: boolean; }

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flappy_highscore') || '0', 10);
  });

  const requestRef = useRef<number>(0);
  const birdImageRef = useRef<HTMLImageElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const bgOffset = useRef(0);
  const startTime = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://freepngimg.com/save/109939-logo-pic-bird-flappy-free-transparent-image-hq/600x333';
    birdImageRef.current = img;

    const bgImg = new Image();
    bgImg.src = 'https://i.pinimg.com/564x/b2/b0/84/b2b084ad6061dfe2122302266ea8af58.jpg';
    bgImageRef.current = bgImg;
  }, []);
  
  // Game state
  const bird = useRef({ y: 300, vy: 0, radius: 20, gravity: 0.6, jump: -8 });
  const pipes = useRef<Pipe[]>([]);
  const frameCount = useRef(0);
  const spacePressed = useRef(false);

  const pipeWidth = 60;
  const pipeGap = 150;
  const pipeSpeed = 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing' && !spacePressed.current) {
          bird.current.vy = bird.current.jump;
          spacePressed.current = true;
        } else if (gameState === 'start' || gameState === 'gameover') {
          startGame();
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') spacePressed.current = false;
    };
    const handlePointerDown = () => {
      if (gameState === 'playing') {
        bird.current.vy = bird.current.jump;
      } else if (gameState === 'start' || gameState === 'gameover') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Use window for click so anywhere works
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gameState]);

  const startGame = () => {
    bird.current = { y: window.innerHeight / 2, vy: 0, radius: 20, gravity: 0.6, jump: -8 };
    pipes.current = [];
    frameCount.current = 0;
    bgOffset.current = 0;
    startTime.current = Date.now();
    scoreRef.current = 0;
    setScore(0);
    setGameState('playing');
  };

  const gameOver = () => {
    setGameState('gameover');
    setHighScore(prev => {
      const newHigh = Math.max(prev, scoreRef.current);
      localStorage.setItem('flappy_highscore', newHigh.toString());
      return newHigh;
    });
  };

  const gameLoop = () => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#4EC0CA'; // Sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (bgImageRef.current && bgImageRef.current.complete) {
        // Scroll background (half the pipe speed for parallax)
        bgOffset.current -= pipeSpeed * 0.5;
        const imgW = bgImageRef.current.width;
        const imgH = bgImageRef.current.height;
        // Scale background to fit height
        const scale = canvas.height / imgH;
        const scaledW = imgW * scale;
        
        if (bgOffset.current <= -scaledW) {
            bgOffset.current += scaledW;
        }

        // Draw multiple times to fill screen
        let cx = bgOffset.current;
        while (cx < canvas.width) {
            ctx.drawImage(bgImageRef.current, cx, 0, scaledW, canvas.height);
            cx += scaledW;
        }
    }

    // Update Bird
    bird.current.vy += bird.current.gravity;
    bird.current.y += bird.current.vy;

    // Spawn Pipes
    frameCount.current++;
    if (frameCount.current % 100 === 0) {
      const minHeight = 50;
      const maxHeight = canvas.height - pipeGap - minHeight;
      const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      pipes.current.push({ x: canvas.width, topHeight, passed: false });
    }

    // Update & Draw Pipes
    
    // Draw ground outline
    const groundY = canvas.height - 50;
    
    const isInvincible = Date.now() - startTime.current < 2000;

    for (let i = pipes.current.length - 1; i >= 0; i--) {
      const p = pipes.current[i];
      p.x -= pipeSpeed;

      const topGrad = ctx.createLinearGradient(p.x, 0, p.x + pipeWidth, 0);
      topGrad.addColorStop(0, '#559E19');
      topGrad.addColorStop(0.5, '#73BF2E');
      topGrad.addColorStop(1, '#559E19');
      
      ctx.fillStyle = topGrad;
      ctx.strokeStyle = '#325C0D';
      ctx.lineWidth = 2;

      // Draw top pipe
      ctx.fillRect(p.x, 0, pipeWidth, p.topHeight);
      ctx.strokeRect(p.x, 0, pipeWidth, p.topHeight);
      
      const capHeight = 30;
      // Top pipe cap
      ctx.fillRect(p.x - 5, p.topHeight - capHeight, pipeWidth + 10, capHeight);
      ctx.strokeRect(p.x - 5, p.topHeight - capHeight, pipeWidth + 10, capHeight);
      
      // Draw bottom pipe
      const bottomY = p.topHeight + pipeGap;
      const bottomHeight = canvas.height - bottomY;
      ctx.fillRect(p.x, bottomY, pipeWidth, bottomHeight);
      ctx.strokeRect(p.x, bottomY, pipeWidth, bottomHeight);

      // Bottom pipe cap
      ctx.fillRect(p.x - 5, bottomY, pipeWidth + 10, capHeight);
      ctx.strokeRect(p.x - 5, bottomY, pipeWidth + 10, capHeight);

      // Collision
      const b = bird.current;
      // hit pipe?
      if (!isInvincible) {
          if (
            p.x < 100 + b.radius && p.x + pipeWidth > 100 - b.radius &&
            (b.y - b.radius < p.topHeight || b.y + b.radius > bottomY)
          ) {
            gameOver();
          }
      }

      // Score
      if (p.x + pipeWidth < 100 && !p.passed) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        p.passed = true;
      }

      // Remove off-screen pipes
      if (p.x + pipeWidth < 0) {
        pipes.current.splice(i, 1);
      }
    }

    // Draw Ground
    ctx.fillStyle = '#DED895';
    ctx.fillRect(0, groundY, canvas.width, 50);

    // Ground/Ceiling collision
    if (!isInvincible && (bird.current.y + bird.current.radius > groundY || bird.current.y - bird.current.radius < 0)) {
      gameOver();
    } else if (isInvincible) {
      if (bird.current.y - bird.current.radius < 0) bird.current.y = bird.current.radius;
      if (bird.current.y + bird.current.radius > groundY) bird.current.y = groundY - bird.current.radius;
    }

    // Draw Bird
    ctx.save();
    ctx.translate(100, bird.current.y);
    
    if (isInvincible) {
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 20;
    }

    // rotation based on velocity
    let rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (bird.current.vy * 0.1)));
    ctx.rotate(rotation);
    
    if (birdImageRef.current && birdImageRef.current.complete) {
        ctx.drawImage(birdImageRef.current, -36, -20, 72, 40);
    } else {
        ctx.fillStyle = '#F4D330'; // yellow bird
        ctx.beginPath();
        ctx.arc(0, 0, bird.current.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(6, -4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(8, -4, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    if (isInvincible) {
        ctx.shadowBlur = 0;
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

  // Window resize
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
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-black select-none touch-none">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10">
        <div className="flex justify-between items-start">
             <div className="glass-panel px-6 py-3 rounded-2xl pointer-events-auto flex items-center gap-6">
                <div>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">Score</span>
                  <span className="text-3xl font-display font-bold text-white text-glow">{score}</span>
                </div>
                <div>
                  <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">High</span>
                  <span className="text-xl font-display font-bold text-white/70">{highScore}</span>
                </div>
             </div>
        </div>

        {gameState === "start" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <div className="glass-panel p-12 rounded-3xl text-center max-w-sm glow-yellow border border-yellow-500/30">
                <h2 className="font-display text-5xl font-bold mb-4 text-yellow-500">Flappy</h2>
                <p className="text-white/70 mb-8 font-medium">
                    Tap of Druk op Spatie om te vliegen.
                </p>
                <Button size="lg" variant="yellow" onClick={startGame} className="w-full text-lg">
                    Start
                </Button>
                </div>
            </div>
        )}

        {gameState === "gameover" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm">
                <div className="glass-panel p-12 rounded-3xl text-center max-w-sm glow-red border border-red-500/30">
                <h2 className="font-display text-5xl font-bold text-red-500 mb-2">Game Over</h2>
                <p className="text-white/50 mb-8 font-bold uppercase tracking-widest text-sm">Je bent gevallen!</p>
                
                <Button size="lg" variant="yellow" onClick={startGame} className="w-full text-lg">
                    Opnieuw
                </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
