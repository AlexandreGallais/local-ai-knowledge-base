// MCP server "geometry": the tested functions of the kit (math and SVG geometry) and the placement
// resolver, called with numbers, so that the AI never computes a position by hand.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/geometry.ts
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  fileURLToPath,
  pathToFileURL,
} from 'node:url';
import {
  type PlacementConfig,
  resolvePlacement,
} from '../tools/placement.ts';
import { baseRoot } from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  text,
  ToolError,
} from './lib/mcp.ts';

interface KitFunction {
  readonly name: string;
  readonly folder: string;
  readonly file: string;
  readonly signature: string;
  readonly summary: string;
}

const MAX_LISTED = 30;
const KIT_FOLDERS = [
  'math',
  'geometry',
];

function signatureOf(source: string, name: string): string {
  const start = source.indexOf(`export function ${name}(`);
  const end = source.indexOf('{\n', start);

  return source
    .slice(start + 'export function '.length, end)
    .replaceAll(/\s+/g, ' ')
    .replaceAll(/\( /g, '(')
    .replaceAll(/,? \)/g, ')')
    .trim();
}

function kitFunctions(): readonly KitFunction[] {
  const kit = join(baseRoot(), 'kit');

  return KIT_FOLDERS.flatMap((folder) => (existsSync(join(kit, folder)) ? readdirSync(join(kit, folder)) : [])
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.spec.ts'))
    .flatMap((file) => {
      const source = readFileSync(join(kit, folder, file), 'utf8');
      const name = /export function (\w+)\(/.exec(source)?.[1];
      const summary = /\/\*\*\n \* (.+)/.exec(source)?.[1] ?? '';

      return name === undefined ? [] : [
        {
          name,
          folder,
          file,
          signature: signatureOf(source, name),
          summary,
        },
      ];
    }));
}

export function listFunctions(args: Arguments): string {
  const words = text(args, 'query')
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 2);
  const found = kitFunctions().filter((item) => words.length === 0 || words.some((word) => `${item.name} ${item.summary}`.toLowerCase().includes(word)));

  if (found.length === 0) {
    return 'No function matches. Call list_functions without a query to see them all.';
  }
  return [
    ...found
      .slice(0, MAX_LISTED)
      .map((item) => `${item.folder}: ${item.signature} - ${item.summary}`),
    ...found.length > MAX_LISTED ? [`(${String(found.length - MAX_LISTED)} more: give a more precise query)`] : [],
  ].join('\n');
}

function parseJson(args: Arguments, name: string): unknown {
  try {
    return JSON.parse(requiredText(args, name));
  } catch (error) {
    if (error instanceof ToolError) {
      throw error;
    }
    throw new ToolError(`"${name}" is not valid JSON: ${(error as Error).message}`);
  }
}

export async function callFunction(args: Arguments): Promise<string> {
  const name = requiredText(args, 'name');
  const found = kitFunctions().find((item) => item.name === name);

  if (found === undefined) {
    throw new ToolError(`No function "${name}" in the kit. Call list_functions with a query.`);
  }
  const values = parseJson(args, 'arguments');

  if (!Array.isArray(values)) {
    throw new ToolError(`"arguments" is a JSON array, one item per parameter: ${found.signature}`);
  }
  const module = await import(pathToFileURL(join(baseRoot(), 'kit', found.folder, found.file)).href) as Record<string, (...items: unknown[]) => unknown>;

  try {
    return JSON.stringify(module[name]?.(...values));
  } catch (error) {
    throw new ToolError(`${name}: ${(error as Error).message}`);
  }
}

export function resolve(args: Arguments): string {
  return JSON.stringify(resolvePlacement(parseJson(args, 'config') as PlacementConfig), null, 1);
}

export const server: Server = {
  name: 'geometry',
  version: '0.2.0',
  instructions: 'Never compute a position, an angle or a rounding by hand: find the function with list_functions, then call_function. To place SVG elements from rules, resolve_placement.',
  tools: [
    {
      name: 'list_functions',
      description: 'The tested functions of the kit (math and SVG geometry): signature and what each one gives, 30 at most.',
      properties: {
        query: {
          type: 'string',
          description: 'Optional English words, as "circle" or "round".',
        },
      },
      required: [],
      run: listFunctions,
    },
    {
      name: 'call_function',
      description: 'Runs one function of the kit and gives its result as JSON.',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the function, as list_functions gives it.',
        },
        arguments: {
          type: 'string',
          description: 'A JSON array, one item per parameter, as \'[{"center":{"x":0,"y":0},"radius":10}, 6, -90]\'.',
        },
      },
      required: [
        'name',
        'arguments',
      ],
      run: callFunction,
    },
    {
      name: 'resolve_placement',
      description: 'Places SVG elements from a placement config (docs/placement/placement-format.md): positions and transforms, or the errors.',
      properties: {
        config: {
          type: 'string',
          description: 'The placement config, as JSON text.',
        },
      },
      required: ['config'],
      run: resolve,
    },
  ],
};

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}
