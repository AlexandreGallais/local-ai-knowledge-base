// Writes a fake export of one part of nearly 500 KB, to try a copy and paste on a workstation.
// Its content is invented text, no real data. Run with Node 22.18 or later:
//   node scripts/paste-sample.ts <folder>
import {
  copyFileSync,
  mkdirSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExport } from './export.ts';

const TARGET_BYTES = 495_000;
const LINE = 'The pump P-101 starts when the level of tank T-1 is above 40 percent; the valve V-12 opens.';

export function sampleFiles(): {
  path: string;
  content: string;
}[] {
  const lines = Array.from({ length: Math.floor(TARGET_BYTES / (LINE.length + 12)) }, (_, index) => `${String(index).padStart(6, '0')} ${LINE}`);

  return [
    {
      path: 'sample/accents-and-signs.md',
      content: 'Vanne à boisseau, débit 12,5 m³/h, ±0,5 bar, « guillemets », tab:\tend, backticks ``` and | pipes |.\n',
    },
    {
      path: 'sample/long-text.md',
      content: `${lines.join('\n')}\n`,
    },
  ];
}

function main(folder: string): void {
  const parts = buildExport(sampleFiles());

  mkdirSync(folder, { recursive: true });
  for (const part of parts) {
    writeFileSync(join(folder, part.name), part.text);
  }
  copyFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'import.ts'), join(folder, 'import.ts'));
  console.log(`Wrote import.ts and ${parts.map((part) => `${part.name} (${Buffer.byteLength(part.text)} bytes)`).join(', ')} to ${folder}.`);
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main(resolve(process.argv[2] ?? 'paste-sample'));
}
