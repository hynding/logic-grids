export class ControlDriver {
    register(config: { move: (direction: string) => void}) {}
    move(grid: number[][], direction: string, onSuccess: () => void) {}
  }