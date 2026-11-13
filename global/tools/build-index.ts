// Builds the plain-text search indexes of the global base, one file per tool of library/ and one
// per topic of docs/, in <base>/index/. import-base.ts runs it after an install.
// Run with Node 22.18 or later, no package:
//   node build-index.ts [base-folder]
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
  dirname,
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

function folderSections(base: string, folder: string): Section[] {
  return markdownFiles(folder).flatMap((path) => sections(
    relative(base, path)
      .split(sep)
      .join('/'),
    readFileSync(path, 'utf8'),
  ));
}

// Returns the names of the index files written, in order.
export function buildIndexes(base: string): string[] {
  const output = join(base, 'index');
  const written: string[] = [];

  rmSync(output, {
    recursive: true,
    force: true,
  });
  mkdirSync(output, { recursive: true });
  for (const kind of [
    'docs',
    'library',
  ]) {
    const root = join(base, kind);

    if (!existsSync(root)) {
      continue;
    }
    for (const entry of readdirSync(root, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const name = `${kind}-${entry.name}.idx`;

      writeFileSync(join(output, name), indexText(folderSections(base, join(root, entry.name))));
      written.push(name);
    }
  }
  return written;
}

function main(): void {
  const base = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
  const written = buildIndexes(base);

  console.log(`Search index built: ${written.length} file(s) in ${join(base, 'index')}.`);
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
