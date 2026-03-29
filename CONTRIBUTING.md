# Contributing to agent-cli-scaffold

Thank you for your interest in improving this tool!

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/agent-cli-scaffold.git
cd agent-cli-scaffold
npm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow the code style below
- Add tests for new functionality
- Update documentation if needed

### 4. Submit a PR

- Push your branch: `git push origin feature/your-feature-name`
- Open a pull request against `main`
- Fill out the PR template

## Code Style

- **TypeScript** with strict mode
- **ESLint** + Prettier (configured in project)
- Run `npm run lint` before committing

### Formatting

```bash
# Auto-format
npm run format

# Lint check
npm run lint
```

## Test Requirements

- All tests must pass: `npm test`
- New features require test coverage
- Run `npm run test:coverage` to check coverage

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { generate } from './src/generator'

describe('generator', () => {
  it('should generate basic template', () => {
    const result = generate('my-agent', { template: 'basic' })
    expect(result.success).toBe(true)
  })
})
```

## Commit Messages

Follow [Conventional Commits](https:// conventionalcommits.org):

```
feat: add new template
fix: resolve template resolution error
docs: update README
style: format code
test: add tests for generator
refactor: simplify template logic
```

## Questions?

- Open an issue for bugs or feature requests
- Disucss in GitHub Discussions

---

<p align="center">Made with ❤️ by the community</p>