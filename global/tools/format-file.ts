// The format pass of the base, run by OpenCode after every write (its "formatter" setting):
// fixes all it can, says nothing. Node 22.18 or later, no package of its own.
//   node /opt/local-ai-base/tools/format-file.ts <file>     one file
//   node /opt/local-ai-base/tools/format-file.ts --all      the whole project, from its root
import { command } from './lint-run.ts';

process.exitCode = await command('format', process.argv[2]);
