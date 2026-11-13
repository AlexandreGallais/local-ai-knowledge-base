// Prints what the format pass makes of each case of samples/cases/format/*.input.*, to write its
// expected file once it was read and found right. Run from samples/: node format-try.mjs
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';

const tool = fileURLToPath(new URL('../global/tools/format-file.ts', import.meta.url));
const cases = fileURLToPath(new URL('./cases/format/', import.meta.url));
const target = fileURLToPath(new URL('./angular-app/src/app/', import.meta.url));

for (const name of readdirSync(cases).filter((file) => file.includes('.input.'))) {
  const path = `${target}zz-${name.replace('.input', '')}`;

  copyFileSync(`${cases}${name}`, path);
  execFileSync(process.execPath, [
    tool,
    path,
  ]);
  console.log(`== ${name}\n${readFileSync(path, 'utf8')}`);
  rmSync(path);
}
