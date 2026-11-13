// Checks that each term of a symbol list has its card in the catalog (docs/synoptics), or a row in an
// alias table that names its card or explains why it has none.
//
// node scripts/check-symbols.ts --list <list.md> [--aliases <aliases.md>]...
//
// The list is Markdown: each bullet of an H2 section is a term; "a, b" gives two terms; "push button:
// momentary, latching" gives "push button momentary" and "push button latching"; text in parentheses
// is dropped. Sections whose heading starts with "Précisions" or "Notes" are skipped. The alias table
// of the base, docs/synoptics/term-aliases.md, is always read.
import {
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { readCards } from './lib/catalog.ts';
import { splitLines } from './lib/markdown.ts';

export interface Alias {
  cards: string[];
  note: string;
}

export interface SymbolReport {
  byCard: string[];
  byAlias: string[];
  byNote: string[];
  findings: string[];
}

const SKIPPED_SECTIONS = /^## (?:Précisions|Notes)/;
const NO_CARD = new Set([
  '',
  '—',
  '-',
]);

export function normalizeTerm(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[-/]/g, ' ')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function splitBullet(bullet: string): string[] {
  const text = bullet
    .replaceAll(/\([^)]*\)/g, '')
    .trim();
  const colon = text.indexOf(':');

  if (colon > 0) {
    const prefix = text
      .slice(0, colon)
      .trim();

    return text
      .slice(colon + 1)
      .split(',')
      .map((item) => `${prefix} ${item.trim()}`);
  }
  const terms: string[] = [];

  for (const item of text
    .split(',')
    .map((part) => part.trim())) {
    const previous = terms.at(-1);

    if (/^\d/.test(item) && previous !== undefined) {
      terms[terms.length - 1] = `${previous} ${item}`;
    } else {
      terms.push(item);
    }
  }
  return terms;
}

// The terms of a symbol list, normalized, in the order of the list.
export function listTerms(text: string): string[] {
  const terms: string[] = [];
  let isSkipped = true;

  for (const line of splitLines(text)) {
    if (line.startsWith('## ')) {
      isSkipped = SKIPPED_SECTIONS.test(line);
    } else if (!isSkipped && line.startsWith('- ')) {
      terms.push(...splitBullet(line.slice(2))
        .map((term) => normalizeTerm(term))
        .filter((term) => term !== ''));
    }
  }
  return terms;
}

// The rows "| Term | Card | Note |" of an alias table; several cards are separated by ";".
export function readAliases(text: string): Map<string, Alias> {
  const aliases = new Map<string, Alias>();

  for (const line of splitLines(text).filter((item) => item.startsWith('| ') && !item.startsWith('| Term'))) {
    const cells = line
      .split('|')
      .map((cell) => cell.trim());
    const term = cells[1] ?? '';

    if (cells.length > 4 && term !== '' && !term.startsWith('---')) {
      aliases.set(normalizeTerm(term), {
        cards: (cells[2] ?? '')
          .split(';')
          .map((card) => card.trim())
          .filter((card) => !NO_CARD.has(card)),
        note: cells[3] ?? '',
      });
    }
  }
  return aliases;
}

function checkAliasCards(aliases: Map<string, Alias>, cardNames: Set<string>): string[] {
  return [...aliases].flatMap(([
    term,
    alias,
  ]) => [
    ...alias.cards
      .filter((card) => !cardNames.has(normalizeTerm(card)))
      .map((card) => `alias "${term}" names the card "${card}", which does not exist`),
    ...alias.cards.length === 0 && alias.note === '' ? [`alias "${term}" has neither a card nor a note`] : [],
  ]);
}

export function checkSymbols(listText: string, catalogTexts: readonly string[], aliasTexts: readonly string[]): SymbolReport {
  const cardNames = new Set(catalogTexts.flatMap((text) => readCards(text).map((card) => normalizeTerm(card.english))));
  const aliases = new Map(aliasTexts.flatMap((text) => [...readAliases(text)]));
  const report: SymbolReport = {
    byCard: [],
    byAlias: [],
    byNote: [],
    findings: checkAliasCards(aliases, cardNames),
  };

  for (const term of listTerms(listText)) {
    const alias = aliases.get(term);

    if (cardNames.has(term)) {
      report.byCard.push(term);
    } else if (alias === undefined) {
      report.findings.push(`term "${term}" has no card and no row in an alias table`);
    } else if (alias.cards.length > 0) {
      report.byAlias.push(term);
    } else {
      report.byNote.push(`${term}: ${alias.note}`);
    }
  }
  return report;
}

function optionValues(args: readonly string[], name: string): string[] {
  return args.flatMap((arg, index) => (arg === name && args[index + 1] !== undefined ? [args[index + 1] ?? ''] : []));
}

function main(): void {
  const args = process.argv.slice(2);
  const synoptics = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'docs', 'synoptics');
  const lists = optionValues(args, '--list');
  const catalogs = readdirSync(synoptics)
    .filter((name) => name.startsWith('catalog-') && name.endsWith('.md'))
    .map((name) => readFileSync(join(synoptics, name), 'utf8'));
  const aliasTexts = [
    join(synoptics, 'term-aliases.md'),
    ...optionValues(args, '--aliases').map((path) => resolve(path)),
  ].map((path) => readFileSync(path, 'utf8'));

  if (lists.length !== 1) {
    console.log('Usage: node scripts/check-symbols.ts --list <list.md> [--aliases <aliases.md>]...');
    process.exitCode = 2;
    return;
  }
  const report = checkSymbols(readFileSync(resolve(lists[0] ?? ''), 'utf8'), catalogs, aliasTexts);

  for (const finding of report.findings) {
    console.log(finding);
  }
  for (const note of report.byNote) {
    console.log(`no card yet, ${note}`);
  }
  console.log(`${report.byCard.length} term(s) by card name, ${report.byAlias.length} by alias, ${report.byNote.length} by note only.`);
  if (report.findings.length > 0) {
    console.log(`Symbol check failed: ${report.findings.length} finding(s).`);
    process.exitCode = 1;
    return;
  }
  console.log('Symbol check passed: each term has its card or a note.');
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
