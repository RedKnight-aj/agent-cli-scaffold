// Multi-agent orchestrator

export interface AgentConfig {
  name: string;
  systemPrompt: string;
}

export interface OrchestratorOptions {
  apiKey?: string;
  agents?: AgentConfig[];
}

export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  assignee?: string;
}

export function log(...args: unknown[]): void {
  if (process.env.DEBUG) {
    console.log('[debug]', ...args);
  }
}

export class BaseAgent {
  constructor(
    public name: string,
    public systemPrompt: string
  ) {}

  async run(input: string): Promise<string> {
    return `Processed by ${this.name}: ${input}`;
  }
}

export class AgentOrchestrator {
  private agents: Map<string, BaseAgent> = new Map();
  private tasks: Map<string, Task> = new Map();
  private apiKey?: string;

  constructor(options: OrchestratorOptions = {}) {
    this.apiKey = options.apiKey;

    // Register default agents
    if (options.agents) {
      for (const agent of options.agents) {
        this.register(agent.name, new BaseAgent(agent.name, agent.systemPrompt));
      }
    } else {
      // Register default agents
      this.register('researcher', new BaseAgent('researcher', 'Research information'));
      this.register('writer', new BaseAgent('writer', 'Write content based on research'));
      this.register('reviewer', new BaseAgent('reviewer', 'Review and refine content'));
    }
  }

  register(name: string, agent: BaseAgent): void {
    this.agents.set(name, agent);
  }

  async assignTask(task: Task): Promise<void> {
    this.tasks.set(task.id, task);

    // Simple round-robin assignment
    const agents = Array.from(this.agents.values());
    const taskCount = this.tasks.size;
    const agent = agents[taskCount % agents.length];

    task.assignee = agent.name;
    task.status = 'in_progress';

    log(`Assigned task ${task.id} to ${agent.name}`);
  }

  async run(input: string): Promise<string> {
    const taskId = `task_${Date.now()}`;
    const task: Task = {
      id: taskId,
      description: input,
      status: 'pending',
    };

    await this.assignTask(task);

    // Execute the task
    const agent = this.agents.get(task.assignee!);
    if (agent) {
      task.result = await agent.run(input);
      task.status = 'completed';
    }

    return task.result || 'No result';
  }

  getStatus(): { tasks: number; agents: number } {
    return {
      tasks: this.tasks.size,
      agents: this.agents.size,
    };
  }
}