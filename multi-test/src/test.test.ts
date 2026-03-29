import { describe, it, expect } from 'vitest';
import { AgentOrchestrator, BaseAgent, log } from './index.js';

describe('Multi-Agent Orchestrator', () => {
  it('should create orchestrator with default agents', () => {
    const orchestrator = new AgentOrchestrator();
    const status = orchestrator.getStatus();
    expect(status.agents).toBe(3);
  });

  it('should register custom agents', () => {
    const orchestrator = new AgentOrchestrator({
      agents: [
        { name: 'test', systemPrompt: 'Test agent' },
      ],
    });
    const status = orchestrator.getStatus();
    expect(status.agents).toBe(1);
  });

  it('should run a task', async () => {
    const orchestrator = new AgentOrchestrator();
    const result = await orchestrator.run('test task');
    expect(result).toContain('test task');
  });
});