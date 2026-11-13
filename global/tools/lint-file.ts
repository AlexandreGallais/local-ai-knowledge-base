// The lint pass of the base: one line per error left, 20 at most. Exit code 1 when errors remain.
// Node 22.18 or later, no package of its own.
//   node /opt/local-ai-base/tools/lint-file.ts <file>     one file
//   node /opt/local-ai-base/tools/lint-file.ts --all      the whole project, from its root
import { command } from './lint-run.ts';

process.exitCode = await command('lint', process.argv[2]);
