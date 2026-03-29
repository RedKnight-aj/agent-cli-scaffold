export interface MCPOptions {
  name?: string;
}

export class MCPAgent {
  private name: string;

  constructor(options: MCPOptions = {}) {
    this.name = options.name || 'MCP Agent';
  }

  greet(): string {
    return `MCP Agent: ${this.name}`;
  }

  process(input: string): string {
    return `Processed: ${input}`;
  }
}

export function createMCPAgent(options?: MCPOptions): MCPAgent {
  return new MCPAgent(options);
}