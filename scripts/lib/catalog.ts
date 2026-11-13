// The checks of the symbol catalog (docs/synoptics): each card has its fields, each property name
// follows the naming convention of symbol-property-naming.md, and each card has its row in a French
// to English index.
import {
  analyseLines,
  splitLines,
} from './markdown.ts';

export interface CatalogFinding {
  file: string;
  message: string;
}

export interface Card {
  english: string;
  french: string;
  fields: Set<string>;
  hasUnitSet: boolean;
  properties: {
    name: string;
    type: string;
  }[];
}

// An equipment card: "### <English name> (<French name>)", then one bullet per field.
const CARD_HEADING = /^### (.+) \((.+)\)$/;

export const CARD_FIELDS = [
  'Symbol',
  'Subtypes',
  'Real working',
  'States',
  'Properties',
  'Model',
];

// In a "- Properties:" bullet: "`a`, `b` (number" or "`c` (boolean".
const TYPED_NAMES = /((?:`\w+`(?:, )?)+) \((number|boolean)\b/g;
const TS_FENCE = /^```(?:ts|typescript)$/;
const INTERFACE = /\binterface\s+(\w+)/;
const PROPERTY = /^\s*(?:readonly\s+)?(\w+)\??:\s*([^;]+);/;
const UNITLESS_NAMES = new Set(['value']);
const found = (file: string, message: string): CatalogFinding => ({
  file,
  message,
});

// The unit suffixes of the closed list: the backticked words of the second column of the tables of
// section "2. Units" of symbol-property-naming.md.
export function unitSuffixes(namingText: string): string[] {
  return analyseLines(namingText)
    .filter((line) => line.section.startsWith('2. Units') && line.text.startsWith('|'))
    .flatMap((line) => (line.text.split('|')[2] ?? '').match(/`[A-Za-z0-9]+`/g) ?? [])
    .map((word) => word.slice(1, -1));
}

function endsWithSuffix(name: string, suffix: string): boolean {
  const before = name.at(-suffix.length - 1) ?? '';

  return name.length > suffix.length && name.endsWith(suffix) && /[a-z0-9]/.test(before);
}

export function checkPropertyName(name: string, type: string, file: string, suffixes: readonly string[]): CatalogFinding[] {
  const types = new Set(type
    .split('|')
    .map((item) => item.trim()));

  if (types.has('boolean') && !/^(?:is|has|can)[A-Z]/.test(name)) {
    return [found(file, `boolean property "${name}" must start with is, has or can`)];
  }
  if (types.has('number') && !UNITLESS_NAMES.has(name) && !suffixes.some((suffix) => endsWithSuffix(name, suffix))) {
    return [found(file, `number property "${name}" must end with a unit suffix of symbol-property-naming.md`)];
  }
  return [];
}

// The property names of the TypeScript examples of a document. The properties of an interface whose
// name ends with "Wrong" are wrong on purpose.
export function checkPropertyNames(text: string, file: string, suffixes: readonly string[]): CatalogFinding[] {
  const findings: CatalogFinding[] = [];
  let isTypeScript = false;
  let isInFence = false;
  let isWrong = false;

  for (const line of splitLines(text)) {
    const trimmed = line.trim();
    const property = PROPERTY.exec(line);

    if (trimmed.startsWith('```')) {
      isTypeScript = !isInFence && TS_FENCE.test(trimmed);
      isInFence = !isInFence;
      isWrong = false;
    } else if (isTypeScript && INTERFACE.test(line)) {
      isWrong = (INTERFACE.exec(line)?.[1] ?? '').endsWith('Wrong');
    } else if (isTypeScript && !isWrong && property !== null) {
      findings.push(...checkPropertyName(property[1] ?? '', property[2] ?? '', file, suffixes));
    }
  }
  return findings;
}

function addBullet(card: Card, text: string): void {
  const label = /^- ([A-Z][a-z]+(?: [a-z]+)?):/.exec(text)?.[1];

  if (label === undefined) {
    return;
  }
  card.fields.add(label);
  if (label === 'Properties') {
    card.hasUnitSet ||= /`unit` \(string|`scaledDisplay`/.test(text);
    for (const match of text.matchAll(TYPED_NAMES)) {
      for (const name of (match[1] ?? '').match(/\w+/g) ?? []) {
        card.properties.push({
          name,
          type: match[2] ?? '',
        });
      }
    }
  }
}

export function readCards(text: string): Card[] {
  const cards: Card[] = [];

  for (const line of analyseLines(text).filter((item) => !item.inCode)) {
    const heading = CARD_HEADING.exec(line.text);

    if (heading !== null) {
      cards.push({
        english: heading[1] ?? '',
        french: heading[2] ?? '',
        fields: new Set(),
        hasUnitSet: false,
        properties: [],
      });
    } else if (line.text.startsWith('### ') || line.text.startsWith('## ')) {
      cards.push({
        english: '',
        french: '',
        fields: new Set(CARD_FIELDS),
        hasUnitSet: false,
        properties: [],
      });
    } else {
      const card = cards.at(-1);

      if (card !== undefined) {
        addBullet(card, line.text);
      }
    }
  }
  return cards.filter((card) => card.english !== '');
}

// The rows "| French | English | Document |" of the French to English indexes.
export function readFrenchIndex(text: string): Map<string, string> {
  const rows = new Map<string, string>();

  for (const line of splitLines(text).filter((item) => item.startsWith('| ') && !item.startsWith('| French'))) {
    const cells = line
      .split('|')
      .map((cell) => cell.trim());
    const french = cells[1] ?? '';

    if (cells.length > 3 && french !== '' && !french.startsWith('---')) {
      rows.set(french.toLowerCase(), cells[2] ?? '');
    }
  }
  return rows;
}

// The English name of a French term, as the French to English indexes give it.
export function lookUpFrench(indexTexts: readonly string[], french: string): string | undefined {
  for (const text of indexTexts) {
    const english = readFrenchIndex(text).get(french.toLowerCase());

    if (english !== undefined) {
      return english;
    }
  }
  return undefined;
}

// A generic display carries its unit in a "unit" property: its numbers are in that unit.
function isInUnitProperty(card: Card, type: string): boolean {
  return type === 'number' && card.hasUnitSet;
}

export function checkCards(text: string, file: string, suffixes: readonly string[], indexTexts: readonly string[]): CatalogFinding[] {
  return readCards(text).flatMap((card) => [
    ...CARD_FIELDS
      .filter((field) => !card.fields.has(field))
      .map((field) => found(file, `card "${card.english}" has no "- ${field}:" line`)),
    ...card.properties.flatMap((property) => (isInUnitProperty(card, property.type) ? [] : checkPropertyName(property.name, property.type, file, suffixes))),
    ...lookUpFrench(indexTexts, card.french) === card.english ? [] : [found(file, `card "${card.english}" has no row "| ${card.french} | ${card.english} |" in a French to English index`)],
  ]);
}
