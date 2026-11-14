// The format pass, run by OpenCode after every write (the "formatter" of opencode.json): it fixes
// all it can and says nothing. It never fails a write: without the lint packages, it does nothing.
// Node 22.18 or later, no package of its own. From the project root:
//   node .agents/mcp/format/format-file.ts <file>     one file
//   node .agents/mcp/format/format-file.ts --all      the whole project
import { realpathSync } from 'node:fs';
import {
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  formatFiles,
  projectOf,
} from './run.ts';

export async function command(argument: string | undefined): Promise<number> {
  if (argument === undefined) {
    process.stdout.write('Usage: node format-file.ts <file> | --all\n');
    return 2;
  }
  const all = argument === '--all';
  const project = projectOf(all ? join(resolve('.'), 'x') : resolve(argument));

  if (project === undefined) {
    return 0;
  }
  try {
    await formatFiles(realpathSync(project), all ? 'all' : [realpathSync(resolve(argument))]);
  } catch (error) {
    // A missing package or a file that does not parse: the write stays as it is.
    if (all) {
      process.stdout.write(`${(error as Error).message.split('\n')[0] ?? ''}\n`);
      return 1;
    }
  }
  return 0;
}

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  process.exitCode = await command(process.argv[2]);
}
