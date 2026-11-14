// Builds the plain-text search index of this brick: one file per tool of library/, in index/.
// The server builds it by itself when index/ is missing; run it again after a change of library/.
// Node 22.18 or later, no package. From the project root:
//   node .agents/mcp/<brick>/build-index.ts
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  indexText,
  type Section,
  sections,
} from './search.ts';

function markdownFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);

    if (entry.isDirectory()) {
      return markdownFiles(path);
    }
    return entry.name.endsWith('.md') ? [path] : [];
  });
}

function folderSections(brick: string, folder: string): Section[] {
  return markdownFiles(folder).flatMap((path) => sections(
    relative(brick, path)
      .split(sep)
      .join('/'),
    readFileSync(path, 'utf8'),
  ));
}

// Returns the names of the index files written, in order.
export function buildIndexes(brick: string): string[] {
  const output = join(brick, 'index');
  const library = join(brick, 'library');
  const written: string[] = [];

  rmSync(output, {
    recursive: true,
    force: true,
  });
  mkdirSync(output, { recursive: true });
  if (!existsSync(library)) {
    return written;
  }
  for (const entry of readdirSync(library, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const name = `${entry.name}.idx`;

    writeFileSync(join(output, name), indexText(folderSections(brick, join(library, entry.name))));
    written.push(name);
  }
  return written;
}

function main(): void {
  const brick = resolve(process.argv[2] ?? import.meta.dirname);
  const written = buildIndexes(brick);

  process.stdout.write(`Search index built: ${written.length} file(s) in ${join(brick, 'index')}.\n`);
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
