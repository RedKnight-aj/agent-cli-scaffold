#!/usr/bin/env node

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { AgentOrchestrator, log } = require('./src/index.js');

const orchestrator = new AgentOrchestrator({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const input = process.argv.slice(2).join(' ');

  if (!input) {
    console.log('Usage: ./bin/cli.js <task>');
    console.log('Example: ./bin/cli.js "Write a hello world program"');
    process.exit(1);
  }

  log('Starting task:', input);

  const result = await orchestrator.run(input);

  log('Result:', result);
  console.log('\nFinal result:', result);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});