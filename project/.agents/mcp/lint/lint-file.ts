// The lint pass from a terminal: one line per error left, 20 at most. Exit code 1 when errors
// remain, 2 when it cannot run. Node 22.18 or later, no package of its own. From the project root:
//   node .agents/mcp/lint/lint-file.ts <file>     one file
//   node .agents/mcp/lint/lint-file.ts --all      the whole project
import { realpathSync } from 'node:fs';
import {
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  lintFiles,
  projectOf,
  report,
} from './run.ts';

export async function command(argument: string | undefined): Promise<number> {
  if (argument === undefined) {
    process.stdout.write('Usage: node lint-file.ts <file> | --all\n');
    return 2;
  }
  const all = argument === '--all';
  const project = projectOf(all ? join(resolve('.'), 'x') : resolve(argument));

  if (project === undefined) {
    process.stdout.write('No .agents/mcp/lint/ above this folder: run it from the project.\n');
    return 2;
  }
  try {
    const lines = await lintFiles(realpathSync(project), all ? 'all' : [realpathSync(resolve(argument))]);
    const text = report(lines);

    if (text !== '') {
      process.stdout.write(`${text}\n`);
    }
    return lines.length === 0 ? 0 : 1;
  } catch (error) {
    process.stdout.write(`${(error as Error).message.split('\n')[0] ?? ''}\n`);
    return 2;
  }
}

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  process.exitCode = await command(process.argv[2]);
}
