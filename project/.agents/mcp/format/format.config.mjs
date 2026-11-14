// Format pass of this project: everything that can be fixed by itself, silently. OpenCode runs it
// after each write (the "formatter" of opencode.json); by hand:
// `node .agents/mcp/format/format-file.ts <file>` or `--all`.
import { formatConfig } from './format.mjs';
import { projectOptions } from './options.mjs';

export default await formatConfig(projectOptions());
