import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

export interface GenerateOptions {
  name: string;
  template: string;
  mcp?: boolean;
  yes?: boolean;
}

const TEMPLATE_NAMES = ['basic', 'mcp-server', 'multi-agent'];

function validateProjectName(name: string): boolean {
  // Check for valid npm package name
  const validName = /^[a-z0-9-_]+$/.test(name);
  if (!validName) {
    throw new Error('Invalid project name. Use lowercase letters, numbers, and hyphens only.');
  }
  if (name.startsWith('-') || name.startsWith('_')) {
    throw new Error('Project name cannot start with hyphen or underscore.');
  }
  return true;
}

async function promptUser(options: GenerateOptions): Promise<GenerateOptions> {
  if (options.yes) {
    return options;
  }

  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: TEMPLATE_NAMES,
      default: options.template || 'basic',
    },
  ]);

  const { mcp } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'mcp',
      message: 'Include MCP client wrapper?',
      default: options.mcp || false,
    },
  ]);

  return { ...options, template, mcp };
}

async function generateFiles(
  projectDir: string,
  template: string,
  data: Record<string, string>
): Promise<void> {
  const templateDir = path.join(TEMPLATES_DIR, template);

  if (!await fs.pathExists(templateDir)) {
    throw new Error(`Template "${template}" not found. Available: ${TEMPLATE_NAMES.join(', ')}`);
  }

  // Copy template files
  await copyTemplateFiles(templateDir, projectDir, data);

  // Process handlebars templates
  await processHandlebars(projectDir, data);
}

async function copyTemplateFiles(
  srcDir: string,
  destDir: string,
  data: Record<string, string>
): Promise<void> {
  const files = await fs.readdir(srcDir, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, file.name.replace(/\.hbs$/, ''));

    if (file.isDirectory()) {
      await fs.mkdirp(destPath);
      await copyTemplateFiles(srcPath, destPath, data);
    } else if (file.name.endsWith('.hbs')) {
      const content = await fs.readFile(srcPath, 'utf-8');
      const template = handlebars.compile(content);
      const rendered = template(data);
      await fs.writeFile(destPath, rendered);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

async function processHandlebars(
  projectDir: string,
  data: Record<string, string>
): Promise<void> {
  // Find and process all .hbs files
  async function processDir(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDir(entryPath);
      } else if (entry.name.endsWith('.hbs')) {
        const content = await fs.readFile(entryPath, 'utf-8');
        const template = handlebars.compile(content);
        const rendered = template(data);
        const newPath = entryPath.replace(/\.hbs$/, '');
        await fs.rename(entryPath, newPath);
        await fs.writeFile(newPath, rendered);
      }
    }
  }

  await processDir(projectDir);
}

function generateGitIgnore(template: string): string {
  let base = `# Dependencies
node_modules/
dist/

# Build
*.tsbuildinfo

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;

  if (template !== 'basic') {
    base += `
# Logs
*.log
npm-debug.log*
`;
  }

  return base;
}

function generatePackageJson(name: string, template: string, mcp: boolean): string {
  const base = {
    name,
    version: '0.1.0',
    description: `Generated ${template} agent`,
    main: 'dist/index.js',
    type: 'module',
    scripts: {
      build: 'tsc',
      start: 'node dist/index.js',
      dev: 'tsx src/index.ts',
      test: 'vitest run',
      'test:watch': 'vitest',
    },
    keywords: ['agent', template],
    author: '',
    license: 'MIT',
  };

  const devDependencies = {
    '@types/node': '^20.10.6',
    'tsx': '^4.7.0',
    'typescript': '^5.3.3',
    'vitest': '^1.2.0',
  };

  if (template === 'mcp-server') {
    const deps: Record<string, string> = { '@modelcontextprotocol/sdk': '^0.5.0' };
    if (mcp) {
      deps['@modelcontextprotocol/sdk'] = '^0.5.0'; // Already included, but keep
    }
    return JSON.stringify(
      { ...base, dependencies: deps, devDependencies },
      null,
      2
    );
  }

  if (template === 'multi-agent') {
    const deps: Record<string, string> = { '@anthropic-ai/sdk': '^0.20.0' };
    if (mcp) {
      deps['@modelcontextprotocol/sdk'] = '^0.5.0';
    }
    return JSON.stringify(
      { ...base, dependencies: deps, devDependencies },
      null,
      2
    );
  }

  const deps: Record<string, string> = mcp ? { '@modelcontextprotocol/sdk': '^0.5.0' } : {};
  return JSON.stringify({ ...base, dependencies: deps, devDependencies }, null, 2);
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        lib: ['ES2022'],
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true,
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2
  );
}

function generateVitestConfig(): string {
  return `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
`;
}

function generateReadme(name: string, template: string): string {
  const templates: Record<string, string> = {
    basic: 'Simple Node.js CLI with commander',
    'mcp-server': 'Full MCP server (stdio mode)',
    'multi-agent': 'Orchestrated agents with handoff',
  };

  return `# ${name}

${templates[template] || 'Agent CLI'}

## Installation

\`\`\`bash
npm install
npm run build
\`\`\`

## Usage

\`\`\`bash
./bin/cli.js --help
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## License

MIT
`;
}

export async function generate(options: GenerateOptions): Promise<void> {
  const { name, template, mcp, yes } = options;

  // Validate project name
  validateProjectName(name);

  // Check if directory already exists
  const projectDir = path.join(process.cwd(), name);
  if (await fs.pathExists(projectDir)) {
    throw new Error(`Directory "${name}" already exists. Choose a different name or remove the existing directory.`);
  }

  // Prompt for options if not provided
  const opts = await promptUser({ name, template, mcp, yes });

  // Create spinner
  const spinner = ora(`Creating ${name} with "${opts.template}" template...`).start();

  try {
    // Create project directory
    await fs.mkdirp(projectDir);

    // Generate data for templates
    const data = {
      name: opts.name,
      template: opts.template,
      mcp: opts.mcp ? 'true' : 'false',
      date: new Date().toISOString().split('T')[0],
    };

    // Generate files from template
    await generateFiles(projectDir, opts.template, data);

    // Add MCP client if requested (for basic and multi-agent templates)
    if (opts.mcp && (opts.template === 'basic' || opts.template === 'multi-agent')) {
      const mcpClientSrc = path.join(__dirname, '..', 'templates', 'shared', 'src', 'mcp-client.ts');
      const mcpClientDest = path.join(projectDir, 'src', 'mcp-client.ts');
      if (await fs.pathExists(mcpClientSrc)) {
        await fs.copy(mcpClientSrc, mcpClientDest);
      }
    }

    // Generate additional files
    await fs.writeFile(path.join(projectDir, '.gitignore'), generateGitIgnore(opts.template));
    await fs.writeFile(path.join(projectDir, 'package.json'), generatePackageJson(opts.name, opts.template, opts.mcp || false));
    await fs.writeFile(path.join(projectDir, 'tsconfig.json'), generateTsConfig());
    await fs.writeFile(path.join(projectDir, 'vitest.config.ts'), generateVitestConfig());
    await fs.writeFile(path.join(projectDir, 'README.md'), generateReadme(opts.name, opts.template));

    // Initialize git repo
    await fs.mkdirp(path.join(projectDir, '.git'));
    await fs.writeFile(path.join(projectDir, '.git', 'config'), `[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
`);
    await fs.writeFile(path.join(projectDir, '.git', 'description'), '');

    // Try to make the CLI executable
    const cliPath = path.join(projectDir, 'bin', 'cli.js');
    if (await fs.pathExists(cliPath)) {
      await fs.chmod(cliPath, 0o755);
    }

    spinner.succeed(`Created ${name}`);
  } catch (error) {
    spinner.fail(`Failed to create ${name}`);
    // Clean up on failure
    if (await fs.pathExists(projectDir)) {
      await fs.remove(projectDir);
    }
    throw error;
  }
}