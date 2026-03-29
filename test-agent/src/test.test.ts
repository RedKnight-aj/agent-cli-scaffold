import { describe, it, expect } from 'vitest';
import { Agent, createAgent } from './index.js';

describe('Agent', () => {
  it('should create an agent with default name', () => {
    const agent = createAgent();
    expect(agent.greet()).toBe('Hello from Agent!');
  });

  it('should create an agent with custom name', () => {
    const agent = createAgent({ name: 'TestAgent' });
    expect(agent.greet()).toBe('Hello from TestAgent!');
  });

  it('should process input', () => {
    const agent = createAgent();
    expect(agent.run('test input')).toBe('Processed: test input');
  });
});