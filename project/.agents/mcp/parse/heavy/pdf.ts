// PDF: read with pdf.js (Mozilla, Apache-2.0), vendored in vendor/pdfjs/ from the legacy build of
// pdfjs-dist, so that nothing is installed. Text is grouped in lines, top to bottom; a line in a
// larger font than the body is marked as a heading. Images drawn on a page are written as PNG.
// Nothing in the file is run: eval is off, fonts are not loaded.
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  crc32,
  deflateSync,
} from 'node:zlib';
import type {
  HeavyDocument,
  ImageFile,
  PartNode,
} from './document.ts';
import {
  node,
  oneLine,
} from './document.ts';

interface TextItem {
  str?: string;
  transform?: number[];
  height?: number;
}

interface PdfImage {
  width: number;
  height: number;
  kind?: number;
  data?: Uint8Array | Uint8ClampedArray;
}

interface PdfPage {
  getTextContent: () => Promise<{ items: TextItem[] }>;
  getOperatorList: () => Promise<{
    fnArray: number[];
    argsArray: unknown[][];
  }>;
  objs: { get: (name: string, callback: (value: PdfImage | null) => void) => void };
  view: number[];
}

interface PdfDocument {
  numPages: number;
  getPage: (number: number) => Promise<PdfPage>;
}

interface PdfJs {
  getDocument: (options: object) => {
    promise: Promise<PdfDocument>;
    destroy: () => Promise<void>;
  };
  OPS: Record<string, number>;
  VerbosityLevel: { ERRORS: number };
}

interface Line {
  y: number;
  size: number;
  text: string;
}

const MAX_IMAGES_PER_PAGE = 20;
const IMAGE_TIMEOUT_MS = 2000;
const VENDOR = join(import.meta.dirname, '..', 'vendor', 'pdfjs', 'pdf.mjs');

async function pdfjs(): Promise<PdfJs> {
  return await import(pathToFileURL(VENDOR).href) as PdfJs;
}

// pdf.js writes its warnings with console.log: on the stdout of an MCP server, they would break the
// protocol. They are silenced while it runs.
async function muted<T>(work: () => Promise<T>): Promise<T> {
  const saved = {
    log: console.log,
    warn: console.warn,
    info: console.info,
  };
  const silent = (): void => undefined;

  console.log = silent;
  console.warn = silent;
  console.info = silent;
  try {
    return await work();
  } finally {
    console.log = saved.log;
    console.warn = saved.warn;
    console.info = saved.info;
  }
}

function chunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  const body = Buffer.concat([
    Buffer.from(type, 'latin1'),
    data,
  ]);
  const check = Buffer.alloc(4);

  length.writeUInt32BE(data.length);
  check.writeUInt32BE(crc32(body));
  return Buffer.concat([
    length,
    body,
    check,
  ]);
}

// A PNG from raw pixels: 1 byte per pixel (gray), 3 (RGB) or 4 (RGBA).
export function encodePng(width: number, height: number, channels: number, pixels: Uint8Array | Uint8ClampedArray): Buffer {
  const header = Buffer.alloc(13);
  const colorType = new Map([
    [1, 0],
    [3, 2],
    [4, 6],
  ]).get(channels) ?? 2;
  const stride = width * channels;
  const rows = Buffer.alloc((stride + 1) * height);

  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = colorType;
  for (let row = 0; row < height; row += 1) {
    rows[row * (stride + 1)] = 0;
    Buffer
      .from(pixels.buffer, pixels.byteOffset + row * stride, stride)
      .copy(rows, row * (stride + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([
      0x89,
      0x50,
      0x4E,
      0x47,
      0x0D,
      0x0A,
      0x1A,
      0x0A,
    ]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function lines(items: TextItem[]): Line[] {
  const result: Line[] = [];
  const sorted = items
    .filter((item) => (item.str ?? '').trim() !== '')
    .map((item) => ({
      x: item.transform?.[4] ?? 0,
      y: item.transform?.[5] ?? 0,
      size: Math.abs(item.transform?.[3] ?? item.height ?? 0),
      text: item.str ?? '',
    }))
    .toSorted((first, second) => second.y - first.y || first.x - second.x);

  for (const item of sorted) {
    const last = result.at(-1);

    if (last !== undefined && Math.abs(last.y - item.y) <= Math.max(2, item.size / 3)) {
      last.text += ` ${item.text}`;
      last.size = Math.max(last.size, item.size);
    } else {
      result.push({
        y: item.y,
        size: item.size,
        text: item.text,
      });
    }
  }
  return result;
}

function bodySize(all: Line[]): number {
  const counts = new Map<number, number>();

  for (const line of all) {
    const size = Math.round(line.size);

    counts.set(size, (counts.get(size) ?? 0) + line.text.length);
  }
  return [...counts.entries()].toSorted((first, second) => second[1] - first[1])[0]?.[0] ?? 0;
}

async function pageImage(page: PdfPage, name: string): Promise<PdfImage | undefined> {
  return await new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(undefined);
    }, IMAGE_TIMEOUT_MS);

    page.objs.get(name, (value) => {
      clearTimeout(timer);
      resolve(value ?? undefined);
    });
  });
}

function channelsOf(image: PdfImage): number {
  const pixels = image.width * image.height;
  const length = image.data?.length ?? 0;

  return pixels === 0 ? 0 : Math.round(length / pixels);
}

async function pageImages(library: PdfJs, page: PdfPage, id: string, images: ImageFile[]): Promise<string[]> {
  const operators = await page.getOperatorList();
  const names = operators.fnArray
    .map((code, index) => code === library.OPS['paintImageXObject'] ? String(operators.argsArray[index]?.[0] ?? '') : '')
    .filter((name) => name !== '')
    .slice(0, MAX_IMAGES_PER_PAGE);
  const found: string[] = [];

  for (const name of names) {
    const image = await pageImage(page, name);
    const channels = image === undefined ? 0 : channelsOf(image);

    if (image?.data !== undefined && [
      1,
      3,
      4,
    ].includes(channels)) {
      const file: ImageFile = {
        id: `img${images.length + 1}`,
        name: `img${images.length + 1}.png`,
        place: id,
        detail: `${image.width}x${image.height}`,
        bytes: encodePng(image.width, image.height, channels, image.data),
      };

      images.push(file);
      found.push(`[image ${file.name}]`);
    } else {
      found.push(`[image ${name}: not extracted]`);
    }
  }
  return found;
}

async function readPage(library: PdfJs, document: PdfDocument, number: number, images: ImageFile[]): Promise<{
  part: PartNode;
  lines: Line[];
}> {
  const page = await document.getPage(number);
  const content = await page.getTextContent();
  const id = `p${number}`;
  const found = lines(content.items);
  const pictures = await pageImages(library, page, id, images);

  return {
    part: node(id, '', [
      ...found.map((line) => line.text),
      ...pictures,
    ]),
    lines: found,
  };
}

async function readPages(bytes: Buffer, images: ImageFile[]): Promise<{
  part: PartNode;
  lines: Line[];
}[]> {
  const library = await pdfjs();
  const task = library.getDocument({
    data: new Uint8Array(bytes),
    isEvalSupported: false,
    useSystemFonts: false,
    disableFontFace: true,
    verbosity: library.VerbosityLevel.ERRORS,
  });
  const pages: {
    part: PartNode;
    lines: Line[];
  }[] = [];

  try {
    const document = await task.promise;

    for (let number = 1; number <= document.numPages; number += 1) {
      pages.push(await readPage(library, document, number, images));
    }
  } finally {
    await task.destroy();
  }
  return pages;
}

export async function readPdf(bytes: Buffer, fileName: string): Promise<HeavyDocument> {
  const images: ImageFile[] = [];
  const pages = await muted(async () => await readPages(bytes, images));
  const body = bodySize(pages.flatMap((page) => page.lines));
  const parts = pages.map(({
    part,
    lines: pageLines,
  }) => {
    const headings = pageLines.filter((line) => Math.round(line.size) > body);
    const marked = part.body.map((text) => headings.some((line) => line.text === text) ? `## ${text}` : text);
    const first = headings[0]?.text ?? pageLines[0]?.text ?? '(no text: a scan? ask the user for a text copy)';

    return {
      ...part,
      line: `page "${oneLine(first, 80)}" (${marked.join('\n').length} chars)`,
      body: marked,
    };
  });

  return {
    title: `${fileName} (PDF, ${parts.length} page(s))`,
    facts: ['Text is in reading order, line by line; a line in a larger font than the body is marked "##".'],
    parts,
    images,
  };
}
