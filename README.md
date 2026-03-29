# ⚡ Ship AI Agents in Seconds, Not Days

<p align="center">
  <a href="https://www.npmjs.com/package/agent-cli-scaffold"><img src="https://img.shields.io/npm/v/agent-cli-scaffold?style=flat&colorA=1a1a2e&colorB=7f5af0" alt="npm"></a>
  <a href="https://www.npmjs.com/package/agent-cli-scaffold"><img src="https://img.shields.io/npm/dm/agent-cli-scaffold?style=flat&colorA=1a1a2e&colorB=7f5af0" alt="downloads"></a>
  <a href="https://github.com/yourorg/agent-cli-scaffold/actions"><img src="https://img.shields.io/github/actions/workflow/status/yourorg/agent-cli-scaffold/ci.yml?branch=main&style=flat&colorA=1a1a2e&colorB=7f5af0" alt="build"></a>
  <a href="https://codecov.io/gh/yourorg/agent-cli-scaffold"><img src="https://img.shields.io/codecov/c/github/yourorg/agent-cli-scaffold?style=flat&colorA=1a1a2e&colorB=7f5af0" alt="coverage"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/agent-cli-scaffold?style=flat&colorA=1a1a2e&colorB=7f5af0" alt="license"></a>
</p>

```
╭────────────────────────────────────────────────────────────╮
│  $ npx agent-cli-scaffold my-agent                      │
│                                                      │
│  ████████  Generated in 2.3s                         │
│                                                      │
│  ✓ src/index.ts (your agent logic)                     │
│  ✓ src/cli.ts (CLI interface)                         │
│  ✓ src/mcp-client.ts (MCP integration)                 │
│  ✓ test/agent.test.ts                                │
│  ✓ README.md                                          │
│  ✓ .gitignore                                         │
│  ✓ package.json                                       │
│                                                      │
│  → cd my-agent && npm run dev                         │
╰────────────────────────────────────────────────────────────╯
```

## Why This Exists

You needed 3 repositories, 7 config files, and 200+ lines of boilerplate just to **ship one AI agent**.

**This tool generates production-ready agent projects** from a single command — fully typed, tested, and wired for MCP integration.

## Quick Start

```bash
# One command, one agent
npx agent-cli-scaffold my-agent

# Ship with full MCP integration
npx agent-cli-scaffold mcp-server --template mcp-server

# Ready to deploy
cd my-agent && npm link && my-agent --help
```

## Features

| Feature | Description |
|---------|-------------|
| ✅ | Interactive CLI prompts with validation |
| ✅ | 3 production templates (basic, mcp-server, multi-agent) |
| ✅ | TypeScript + strict mode |
| ✅ | MCP client wrapper included |
| ✅ | Vitest testing ready |
| ✅ | README auto-generation |
| ✅ | Git init + first commit |
| ✅ | npm publish ready |

## Templates

| Template | Icon | Use Case |
|----------|------|----------|
| **basic** | 🖥️ | CLI tools with subcommands |
| **mcp-server** | 🤖 | MCP server (stdio mode) for AI integration |
| **multi-agent** | 🧠 | Orchestrated multi-agent systems |

## Real Usage

```bash
# Create a CLI agent
npx agent-cli-scaffold my-cli --template basic

# Create an MCP server
npx agent-cli-scaffold ai-assistant --template mcp-server

# Create multi-agent orchestrator
npx agent-cli-scaffold orchestrator --template multi-agent

# Skip all prompts
npx agent-cli-scaffold my-agent --yes
```

## Who Is This For?

- **AI Engineers** building agentic systems
- **DevOps** automating with MCP-powered CLIs
- **Founders** shipping MVPs fast
- **Teams** standardizing agent infrastructure

<p align="center">
  <a href="https://github.com/yourorg/agent-cli-scaffold/stargazers">
    <img src="https://img.shields.io/github/stars/yourorg/agent-cli-scaffold?style=flat&labelColor=1a1a2e&colorB=7f5af0" alt="stars">
  </a>
  <a href="https://github.com/yourorg/agent-cli-scaffold/network/members">
    <img src="https://img.shields.io/github/forks/yourorg/agent-cli-scaffold?style=flat&labelColor=1a1a2e&colorB=7f5af0" alt="forks">
  </a>
</p>

---

<p align="center"><sub>Star this repo if it helped →</sub></p>

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © 2024