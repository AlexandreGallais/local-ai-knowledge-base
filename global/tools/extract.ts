// Reads a heavy file once and keeps the result in .agents/work/extract/<hash>/ of the project:
// document.json (the tree of parts) and images/. The outline, a part and the image list are then
// served from the cache. Used by the MCP server "parse", or as a command:
//   node /opt/local-ai-base/tools/extract.ts <file> [--part <id>] [--depth <n>] [--images]
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import {
  basename,
  extname,
  join,
  relative,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  readJson,
  readText,
} from './heavy/data.ts';
import {
  type HeavyDocument,
  imageList,
  renderOutline,
  renderPart,
} from './heavy/document.ts';
import {
  readExcel,
  readPowerPoint,
  readWord,
} from './heavy/office.ts';
import { readPdf } from './heavy/pdf.ts';
import { readSvg } from './heavy/svg.ts';
import { readXd } from './heavy/xd.ts';
import { openZip } from './heavy/zip.ts';

// Changes when a reader changes, so that an old cache is never served.
const READER_VERSION = '0.2.0-1';

export const MAX_FILE_BYTES = 512 * 1024 * 1024;

export const EXTENSIONS = {
  xd: ['.xd'],
  word: [
    '.docx',
    '.docm',
  ],
  excel: [
    '.xlsx',
    '.xlsm',
  ],
  powerpoint: [
    '.pptx',
    '.pptm',
  ],
  pdf: ['.pdf'],
  svg: ['.svg'],
  json: [
    '.json',
    '.geojson',
  ],
  text: [
    '.log',
    '.txt',
    '.csv',
    '.tsv',
    '.ndjson',
    '.jsonl',
    '.xml',
  ],
};

export class ExtractError extends Error {}

function familyOf(file: string): string {
  const extension = extname(file).toLowerCase();
  const found = Object
    .entries(EXTENSIONS)
    .find(([, list]) => list.includes(extension));

  if (found === undefined) {
    throw new ExtractError(`No reader for "${extension}". Readers: ${Object.values(EXTENSIONS).flat()
      .join(' ')}. For an old Office file (.doc, .xls, .ppt), ask the user to save it in the new format.`);
  }
  return found[0];
}

async function read(file: string, bytes: Buffer): Promise<HeavyDocument> {
  const name = basename(file);
  const family = familyOf(file);

  switch (family) {
    case 'xd': {
      return readXd(openZip(bytes), name);
    }
    case 'word': {
      return readWord(openZip(bytes), name);
    }
    case 'excel': {
      return readExcel(openZip(bytes), name);
    }
    case 'powerpoint': {
      return readPowerPoint(openZip(bytes), name);
    }
    case 'pdf': {
      return await readPdf(bytes, name);
    }
    case 'svg': {
      return readSvg(bytes.toString('utf8'), name);
    }
    case 'json': {
      return readJson(bytes.toString('utf8'), name);
    }
    default: {
      return readText(bytes.toString('utf8'), name);
    }
  }
}

export interface Extracted {
  document: HeavyDocument;
  // The folder of the cache, from the project root: .agents/work/extract/<hash>.
  folder: string;
}

function cacheFolder(projectRoot: string, bytes: Buffer): string {
  const hash = createHash('sha256')
    .update(READER_VERSION)
    .update(bytes)
    .digest('hex')
    .slice(0, 16);

  return join(projectRoot, '.agents', 'work', 'extract', hash);
}

function writeCache(folder: string, document: HeavyDocument): void {
  mkdirSync(join(folder, 'images'), { recursive: true });
  for (const image of document.images) {
    if (image.bytes !== undefined) {
      writeFileSync(join(folder, 'images', image.name), image.bytes);
    }
  }
  const stored: HeavyDocument = {
    ...document,
    images: document.images.map(({
      bytes: _bytes,
      ...rest
    }) => rest),
  };

  writeFileSync(join(folder, 'document.json'), `${JSON.stringify(stored)}\n`);
}

export async function extract(file: string, projectRoot: string): Promise<Extracted> {
  if (!existsSync(file) || !statSync(file).isFile()) {
    throw new ExtractError(`No file "${relative(projectRoot, file)}".`);
  }
  if (statSync(file).size > MAX_FILE_BYTES) {
    throw new ExtractError(`File over ${MAX_FILE_BYTES / 1024 / 1024} MB: ask the user for a smaller export.`);
  }
  familyOf(file);
  const bytes = readFileSync(file);
  const folder = cacheFolder(projectRoot, bytes);
  const cached = join(folder, 'document.json');
  const shown = relative(projectRoot, folder)
    .split('\\')
    .join('/');

  if (existsSync(cached)) {
    return {
      document: JSON.parse(readFileSync(cached, 'utf8')) as HeavyDocument,
      folder: shown,
    };
  }
  let document: HeavyDocument;

  try {
    document = await read(file, bytes);
  } catch (error) {
    throw new ExtractError(`Cannot read ${basename(file)}: ${(error as Error).message.split('\n')[0] ?? ''}`);
  }
  writeCache(folder, document);
  return {
    document,
    folder: shown,
  };
}

export async function outlineOf(file: string, projectRoot: string, depth?: number): Promise<string> {
  const { document } = await extract(file, projectRoot);

  return renderOutline(document, depth);
}

export async function partOf(file: string, projectRoot: string, id: string): Promise<string> {
  const { document } = await extract(file, projectRoot);
  const found = renderPart(document, id);

  if (found === undefined) {
    throw new ExtractError(`No part "${id}" in ${basename(file)}. Call the outline to see the ids.`);
  }
  return found;
}

export async function imagesOf(file: string, projectRoot: string): Promise<string> {
  const {
    document,
    folder,
  } = await extract(file, projectRoot);

  return imageList(document, `${folder}/images`);
}

async function main(args: string[]): Promise<void> {
  const file = args[0];
  const option = (name: string): string | undefined => {
    const index = args.indexOf(name);

    return index === -1 ? undefined : args[index + 1];
  };

  if (file === undefined) {
    process.stderr.write('Usage: node extract.ts <file> [--part <id>] [--depth <n>] [--images]\n');
    process.exitCode = 2;
    return;
  }
  const root = process.env['PROJECT_ROOT'] ?? process.cwd();
  const wanted = option('--part');
  const depth = option('--depth');

  try {
    if (wanted !== undefined) {
      process.stdout.write(`${await partOf(file, root, wanted)}\n`);
    } else if (args.includes('--images')) {
      process.stdout.write(`${await imagesOf(file, root)}\n`);
    } else {
      process.stdout.write(`${await outlineOf(file, root, depth === undefined ? undefined : Number(depth))}\n`);
    }
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}

if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  await main(process.argv.slice(2));
}
