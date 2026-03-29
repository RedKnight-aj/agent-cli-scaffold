// MCP Client wrapper for calling external MCP servers

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { ListToolsResultSchema, CallToolResultSchema } from '@modelcontextprotocol/sdk/types.js';

export interface MCPClientOptions {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export class MCPClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  async connect(options: MCPClientOptions): Promise<void> {
    this.transport = new StdioClientTransport({
      command: options.command,
      args: options.args || [],
      env: options.env,
    });

    this.client = new Client(
      {
        name: 'mcp-client',
        version: '0.1.0',
      },
      {
        capabilities: {},
      }
    );

    await this.client.connect(this.transport);
  }

  async listTools(): Promise<{ name: string; description: string }[]> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    const result = await this.client.request(
      { method: 'tools/list' },
      ListToolsResultSchema
    );
    return result.tools.map((t) => ({
      name: t.name,
      description: t.description || '',
    }));
  }

  async callTool(tool: string, args: Record<string, unknown>): Promise<string> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    const result = await this.client.request(
      { method: 'tools/call', params: { name: tool, arguments: args } },
      CallToolResultSchema
    );

    // Extract text from result.content array
    if (Array.isArray(result?.content)) {
      return result.content
        .map((item) => (item.type === 'text' ? item.text : JSON.stringify(item)))
        .join('\n');
    }

    return JSON.stringify(result);
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.transport = null;
    }
  }
}

export async function createMCPClient(
  options: MCPClientOptions
): Promise<MCPClient> {
  const client = new MCPClient();
  await client.connect(options);
  return client;
}