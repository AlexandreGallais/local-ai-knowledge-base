// MCP server "format": formats the file it is given with the format pass of the project (decision
// 0017): layout, sorted imports, members and keys, CSS order. It writes the file and says what
// changed. Run by OpenCode in the project folder: node .agents/mcp/format/server.ts
import {
  existsSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  extname,
  relative,
} from 'node:path';
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
  formatFiles,
  MissingPackage,
  SCRIPT_FILES,
  STYLE_FILES,
} from './run.ts';

const KINDS = [
  ...SCRIPT_FILES,
  ...STYLE_FILES,
];

export async function formatFile(args: Arguments): Promise<string> {
  const root = projectRoot();
  const file = inside(root, requiredText(args, 'file'));
  const shown = relative(root, file);

  if (!existsSync(file)) {
    throw new ToolError(`No file "${shown}".`);
  }
  if (!KINDS.includes(extname(file))) {
    throw new ToolError(`"${shown}" is not formatted here: only ${KINDS.join(' ')} files.`);
  }
  const before = readFileSync(file, 'utf8');

  try {
    await formatFiles(realpathSync(root), [realpathSync(file)]);
  } catch (error) {
    if (error instanceof MissingPackage) {
      throw new ToolError(error.message);
    }
    throw new ToolError(`${shown} was not formatted: ${(error as Error).message.split('\n')[0] ?? ''}`);
  }
  return readFileSync(file, 'utf8') === before ? `${shown}: already formatted.` : `${shown}: formatted. Read it again before you edit it.`;
}

export const server: Server = {
  name: 'format',
  version: '0.3.0',
  instructions: 'Formats a file with the format pass of this project. OpenCode already formats each file you write; call format_file on a file you did not write or that looks unformatted.',
  tools: [
    {
      name: 'format_file',
      description: 'Format one file of the project (.ts, .html, .json, .css, .scss) and write it. Says whether it changed.',
      properties: {
        file: {
          type: 'string',
          description: 'Path of the file, from the project root, as "src/app/user-list.ts".',
        },
      },
      required: ['file'],
      run: formatFile,
    },
  ],
};

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
