// MCP server "parse": read a heavy file (Adobe XD, Word, Excel, PowerPoint, PDF, SVG, big JSON,
// logs) without opening it: its outline first, then one part by its id, and the images it holds.
// The result is kept in .agents/work/extract/ of the project; the file itself is never changed.
// Run by OpenCode in the project folder: node .agents/mcp/parse/server.ts
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  EXTENSIONS,
  ExtractError,
  imagesOf,
  outlineOf,
  partOf,
} from './extract.ts';
import {
  type Arguments,
  inside,
  projectRoot,
  requiredText,
  serve,
  type Server,
  ToolError,
} from './mcp.ts';

async function guarded(work: () => Promise<string>): Promise<string> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ExtractError) {
      throw new ToolError(error.message);
    }
    throw error;
  }
}

function fileOf(args: Arguments): string {
  return inside(projectRoot(), requiredText(args, 'file'));
}

export async function parseOutline(args: Arguments): Promise<string> {
  const depth = typeof args['depth'] === 'number' ? args['depth'] : undefined;

  return await guarded(async () => await outlineOf(fileOf(args), projectRoot(), depth));
}

export async function parsePart(args: Arguments): Promise<string> {
  const id = requiredText(args, 'id');

  return await guarded(async () => await partOf(fileOf(args), projectRoot(), id));
}

export async function parseImages(args: Arguments): Promise<string> {
  return await guarded(async () => await imagesOf(fileOf(args), projectRoot()));
}

const FILE = {
  type: 'string' as const,
  description: `Path of the file, from the project root. Read here: ${Object.values(EXTENSIONS).flat()
    .join(' ')}.`,
};

export const server: Server = {
  name: 'parse',
  version: '0.3.0',
  maxChars: 12_500,
  instructions: 'Never read a heavy file raw. Call outline first, then part with one id of the outline, then images if you need the pictures.',
  tools: [
    {
      name: 'outline',
      description: 'The outline of a heavy file: its screens, headings, sheets, slides or pages, each with a stable id and its size. 8,000 characters at most.',
      properties: {
        file: FILE,
        depth: {
          type: 'number',
          description: 'Levels shown, 2 by default. Lower it if the outline is truncated.',
        },
      },
      required: ['file'],
      run: parseOutline,
    },
    {
      name: 'part',
      description: 'One part of a heavy file, whole, by its id from the outline: S1.2, h2.1, Sheet1!A1:H50, s3, p7, #id. 12,000 characters at most.',
      properties: {
        file: FILE,
        id: {
          type: 'string',
          description: 'The id of the part, exactly as the outline shows it.',
        },
      },
      required: [
        'file',
        'id',
      ],
      run: parsePart,
    },
    {
      name: 'images',
      description: 'The images held by a heavy file, extracted in a folder of .agents/work/extract/, each with the id of the part that holds it.',
      properties: { file: FILE },
      required: ['file'],
      run: parseImages,
    },
  ],
};

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
