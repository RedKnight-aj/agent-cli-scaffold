export interface AgentOptions {
  name?: string;
}

export class Agent {
  private name: string;

  constructor(options: AgentOptions = {}) {
    this.name = options.name || 'Agent';
  }

  greet(): string {
    return `Hello from ${this.name}!`;
  }

  run(input: string): string {
    return `Processed: ${input}`;
  }
}

export function createAgent(options?: AgentOptions): Agent {
  return new Agent(options);
}