// Lint pass of this project: only what the format pass cannot fix. Run it with the lint tools of the
// MCP server, or `node .agents/mcp/lint/lint-file.ts <file>` or `--all`.
// A rule whose plugin is not installed is left out; Angular rules come with @angular/core.
import { lintConfig } from './lint.mjs';
import { projectOptions } from './options.mjs';

export default await lintConfig(projectOptions());
