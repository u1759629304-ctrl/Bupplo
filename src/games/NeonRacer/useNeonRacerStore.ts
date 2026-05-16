import { create } from 'zustand'

interface NeonRacerState {
  score: number
  highScore: number
  speed: number
  carX: number
  gameState: 'start' | 'playing' | 'gameover'
  setGameState: (state: 'start' | 'playing' | 'gameover') => void
  setCarX: (x: number) => void
  incrementScore: () => void
  increaseSpeed: () => void
  reset: () => void
}

const getHighScore = () => {
    try {
        return parseInt(localStorage.getItem('neon_racer_highscore') || '0', 10);
    } catch {
        return 0;
    }
}

export const useNeonRacerStore = create<NeonRacerState>((set) => ({
  score: 0,
  highScore: getHighScore(),
  speed: 50,
  carX: 0,
  gameState: 'start',
  setGameState: (state) => set((prev) => {
    if (state === 'gameover' && prev.score > prev.highScore) {
       localStorage.setItem('neon_racer_highscore', prev.score.toString());
       return { gameState: state, highScore: prev.score };
    }
    return { gameState: state };
  }),
  setCarX: (x) => set({ carX: x }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  increaseSpeed: () => set((state) => ({ speed: Math.min(state.speed + 5, 150) })),
  reset: () => set({ score: 0, speed: 50, carX: 0, gameState: 'playing' }),
}))

