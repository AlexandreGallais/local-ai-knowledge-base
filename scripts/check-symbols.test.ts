import assert from 'node:assert/strict';
import {
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  checkSymbols,
  listTerms,
  readAliases,
} from './check-symbols.ts';
import {
  lookUpFrench,
  readCards,
} from './lib/catalog.ts';

const SYNOPTICS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'docs', 'synoptics');
const CATALOG = `### Pipe (tuyau)

- Symbol: a line.

### Push-pull button (bouton-poussoir à tirer pour réarmer)

- Symbol: a mushroom head.
`;
const ALIASES = `| Term | Card | Note |
| --- | --- | --- |
| push button latching pull | Push-pull button | pulled to reset |
| mystery | — | question open |
`;

function readSynoptics(prefix: string): string[] {
  return readdirSync(SYNOPTICS)
    .filter((name) => name.startsWith(prefix) && name.endsWith('.md'))
    .map((name) => readFileSync(join(SYNOPTICS, name), 'utf8'));
}

test('a list bullet gives one term per item, with its prefix and without parentheses', () => {
  const list = '## Notes\n\n- skipped\n\n## Pumps\n\n- centrifugal pump, 1 to 3 speeds\n- push button: momentary, latching pull (pulled to reset)\n- Two-Way valve\n';

  assert.deepEqual(listTerms(list), [
    'centrifugal pump 1 to 3 speeds',
    'push button momentary',
    'push button latching pull',
    'two way valve',
  ]);
});
test('a term is covered by its card, by an alias or by a note', () => {
  const report = checkSymbols('## Parts\n\n- pipe\n- push button: latching pull\n- mystery\n', [CATALOG], [ALIASES]);

  assert.deepEqual(report.byCard, ['pipe']);
  assert.deepEqual(report.byAlias, ['push button latching pull']);
  assert.deepEqual(report.byNote, ['mystery: question open']);
  assert.deepEqual(report.findings, []);
});
test('a term without card or alias, and an alias to a missing card, are refused', () => {
  const report = checkSymbols('## Parts\n\n- gizmo\n', [CATALOG], [`${ALIASES}| widget | Widget card | |\n`]);

  assert.deepEqual(report.findings, [
    'alias "widget" names the card "Widget card", which does not exist',
    'term "gizmo" has no card and no row in an alias table',
  ]);
});
test('every alias of the base names existing cards', () => {
  const aliases = readAliases(readFileSync(join(SYNOPTICS, 'term-aliases.md'), 'utf8'));
  const report = checkSymbols('', readSynoptics('catalog-'), [readFileSync(join(SYNOPTICS, 'term-aliases.md'), 'utf8')]);

  assert.ok(aliases.size > 40);
  assert.deepEqual(report.findings, []);
});
test('every card of the catalog has its French name in an index, which gives back its English name', () => {
  const indexes = readSynoptics('index-fr-en');
  const cards = readSynoptics('catalog-').flatMap((text) => readCards(text));

  assert.ok(cards.length > 150);
  for (const card of cards) {
    assert.equal(lookUpFrench(indexes, card.french), card.english, card.english);
  }
});
