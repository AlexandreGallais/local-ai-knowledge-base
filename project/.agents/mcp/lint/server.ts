// MCP server "lint": the lint pass of the project (decision 0017) on one file or on the whole
// project. It fixes nothing and returns one line per error left, with the id of its rule.
// Run by OpenCode in the project folder: node .agents/mcp/lint/server.ts
import {
  existsSync,
  realpathSync,
} from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type Arguments,
  inside,
  projectRoot,
  requiredText,
  serve,
  type Server,
  ToolError,
} from './mcp.ts';
import {
  lintFiles,
  MissingPackage,
  report,
} from './run.ts';

async function guarded(files: string[] | 'all'): Promise<string> {
  try {
    return report(await lintFiles(realpathSync(projectRoot()), files));
  } catch (error) {
    if (error instanceof MissingPackage) {
      throw new ToolError(error.message);
    }
    throw new ToolError(`The lint could not run: ${(error as Error).message.split('\n')[0] ?? ''}`);
  }
}

export async function lintFile(args: Arguments): Promise<string> {
  const root = projectRoot();
  const file = inside(root, requiredText(args, 'file'));

  if (!existsSync(file)) {
    throw new ToolError(`No file "${relative(root, file)}".`);
  }
  const text = await guarded([realpathSync(file)]);

  return text === '' ? `${relative(root, file)}: no lint error.` : text;
}

export async function lintProject(): Promise<string> {
  const text = await guarded('all');

  return text === '' ? 'No lint error in the project.' : text;
}

export const server: Server = {
  name: 'lint',
  version: '0.3.0',
  instructions: 'The lint of this project. After you write a file, call lint_file on it and fix every error. Before you say "done", call lint_project until it reports no error.',
  tools: [
    {
      name: 'lint_file',
      description: 'Lint one file of the project (.ts, .html, .json, .css, .scss). One line per error: file:line:column rule-id message. 20 errors at most.',
      properties: {
        file: {
          type: 'string',
          description: 'Path of the file, from the project root, as "src/app/user-list.ts".',
        },
      },
      required: ['file'],
      run: lintFile,
    },
    {
      name: 'lint_project',
      description: 'Lint the whole project. One line per error, 20 at most, then their count.',
      properties: {},
      required: [],
      run: lintProject,
    },
  ],
};

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
