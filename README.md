# agent-cli-scaffold

Professional CLI Tool Generator - Create agents, MCP servers, and multi-agent systems with a single command.

## Installation

```bash
npm install -g agent-cli-scaffold
```

## Usage

```bash
# Create a basic CLI agent
npx agent-cli-scaffold my-agent

# Create with specific template
npx agent-cli-scaffold my-agent --template basic

# Create MCP server
npx agent-cli-scaffold mcp-server --template mcp-server

# Create multi-agent system
npx agent-cli-scaffold orchestrator --template multi-agent

# Include MCP client wrapper
npx agent-cli-scaffold my-agent --mcp

# Skip prompts
npx agent-cli-scaffold my-agent --yes
```

## Templates

### basic
Simple Node.js CLI with commander - perfect for building CLI tools with subcommands.

### mcp-server
Full MCP server (stdio mode) - implements the Model Context Protocol for AI integration.

### multi-agent
Orchestrated agents with handoff - for building complex multi-agent systems that delegate tasks between specialized agents.

## Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--template` | `-t` | Template to use (basic, mcp-server, multi-agent) |
| `--mcp` | | Include MCP client wrapper |
| `--yes` | `-y` | Skip prompts and use defaults |

## Features

- ✅ Interactive prompts (inquirer)
- ✅ Template engine (handlebars)
- ✅ MCP client wrapper included
- ✅ Basic testing (vitest)
- ✅ README auto-generation
- ✅ TypeScript by default
- ✅ Git initialization
- ✅ npm publish ready

## Development

```bash
# Clone and setup
git clone https://github.com/yourorg/agent-cli-scaffold.git
cd agent-cli-scaffold
npm install

# Build
npm run build

# Test
npm test
```

## License

MIT