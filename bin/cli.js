#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Command } = require('commander');
const { generate } = require('../dist/index.js');

const program = new Command();

program
  .name('agent-cli-scaffold')
  .description('Professional CLI Tool Generator - Create agents, MCP servers, and multi-agent systems')
  .version('1.0.0');

program
  .argument('<name>', 'Name of the project to create')
  .option('-t, --template <template>', 'Template to use: basic, mcp-server, multi-agent', 'basic')
  .option('--mcp', 'Include MCP client wrapper')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (name, options) => {
    try {
      await generate({ name, ...options });
      console.log(`\n✅ Successfully created ${name} using "${options.template}" template`);
      console.log(`\nTo get started:`);
      console.log(`  cd ${name}`);
      console.log(`  npm install`);
      console.log(`  npm run build`);
      console.log(`  ./bin/cli.js --help`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();