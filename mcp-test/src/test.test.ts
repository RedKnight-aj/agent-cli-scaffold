import { describe, it, expect } from 'vitest';
import { MCPAgent, createMCPAgent } from './index.js';

describe('MCPAgent', () => {
  it('should create an MCP agent', () => {
    const agent = createMCPAgent();
    expect(agent.greet()).toBe('MCP Agent: MCP Agent');
  });

  it('should process input', () => {
    const agent = createMCPAgent();
    expect(agent.process('test')).toBe('Processed: test');
  });
});