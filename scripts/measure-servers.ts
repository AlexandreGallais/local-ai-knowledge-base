// Measures what the MCP servers of the base cost before any call: the tool schemas the model
// receives at every request, in characters and estimated tokens (4 characters per token).
// Run with Node 22.18 or later, from the root of the repository, no package:
//   node scripts/measure-servers.ts
import { readdirSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type Server,
  toolList,
} from '../global/servers/lib/mcp.ts';

const SERVERS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers');

async function main(): Promise<void> {
  const names = readdirSync(SERVERS)
    .filter((name) => name.endsWith('.ts'))
    .sort();
  let total = 0;

  console.log('| Server | Tools | Schema characters | Estimated tokens |');
  console.log('| --- | --- | --- | --- |');
  for (const name of names) {
    const module = await import(join(SERVERS, name)) as { server: Server };
    const size = JSON.stringify(toolList(module.server)).length + module.server.instructions.length;

    total += size;
    console.log(`| ${module.server.name} | ${module.server.tools.length} | ${size} | ${Math.ceil(size / 4)} |`);
  }
  console.log(`| **All** | | ${total} | ${Math.ceil(total / 4)} |`);
}

await main();
