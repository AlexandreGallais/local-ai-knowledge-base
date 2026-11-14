// Local search over Markdown documents, without a black box: sections are indexed in plain text
// files that a person can read, and ranked with BM25. No package; Node 22.18 or later.
//   tokenize:   words of a query or a text, names of variables split as a person reads them
//   sections:   one entry per H2 section of a Markdown file
//   indexText:  the plain-text index of sections, the same text for the same input
//   search:     the best sections for a query, 10 at most
export interface Section {
  // "path/to/file.md#anchor", relative to the indexed folder.
  id: string;
  title: string;
  text: string;
}

export interface IndexEntry {
  id: string;
  title: string;
  length: number;
  body: Map<string, number>;
  titleTerms: Set<string>;
}

export interface Hit {
  id: string;
  title: string;
  score: number;
}

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'can',
  'do',
  'does',
  'for',
  'from',
  'how',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'of',
  'on',
  'or',
  'so',
  'that',
  'the',
  'their',
  'then',
  'there',
  'these',
  'this',
  'to',
  'use',
  'was',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'why',
  'will',
  'with',
  'you',
  'your',
]);
const CHUNK = /[\p{L}\p{N}_$-]+/gu;
const K1 = 1.2;
const B = 0.75;
const TITLE_WEIGHT = 2;
const NAME_WEIGHT = 3;
// Points given to a title that names the API of a one-name query, exactly or as its start.
const EXACT_WEIGHT = 40;
const PREFIX_WEIGHT = 15;

export const MAX_HITS = 10;

// A light English stemmer: plural and verb endings, enough to match "signals" with "signal".
export function stem(word: string): string {
  if (word.length <= 4 || !/^[a-z]+$/.test(word)) {
    return word;
  }
  if (word.endsWith('ies')) {
    return `${word.slice(0, -3)}y`;
  }
  if (word.endsWith('sses')) {
    return word.slice(0, -2);
  }
  if (/[^s]s$/.test(word)) {
    return word.slice(0, -1);
  }
  if (word.endsWith('ing') && word.length > 6) {
    return word.slice(0, -3);
  }
  if (word.endsWith('ed') && word.length > 5) {
    return word.slice(0, -2);
  }
  return word;
}

// "getBBox" gives get, bbox, box and getbbox; "DOMMatrix2D" gives dom, matrix, dommatrix and
// dommatrix2d; "signal_store" gives signal, store and signal_store.
export function splitName(chunk: string): string[] {
  const whole = chunk.replaceAll(/^[-_$]+|[-_$]+$/g, '');
  const parts = whole.split(/[-_$]+/);
  const coarse = parts.flatMap((part) => part.split(/(?<=\p{Ll})(?=\p{Lu})|(?<=\p{L})(?=\p{N})|(?<=\p{N})(?=\p{L})/u));
  const fine = coarse.flatMap((part) => part.split(/(?<=\p{Lu})(?=\p{Lu}\p{Ll})/u));

  return [
    ...new Set([
      whole,
      ...parts,
      ...coarse,
      ...fine,
    ].map((word) => word.toLowerCase())),
  ].filter((word) => word.length >= 2);
}

export function tokenize(text: string): string[] {
  return [...text.matchAll(CHUNK)]
    .flatMap((match) => splitName(match[0]))
    .filter((word) => !STOP_WORDS.has(word))
    .map((word) => stem(word));
}

// GitHub's heading anchor: lower case, spaces to hyphens, punctuation removed.
export function slug(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}\s_-]/gu, '')
    .replaceAll(/\s/g, '-');
}

function stripHeader(text: string): string {
  return text.startsWith('---\n') ? text.slice(Math.max(text.indexOf('\n---', 4) + 4, 0)) : text;
}

// One section per H2 heading; the text before the first H2 belongs to the H1 of the file.
export function sections(path: string, markdown: string): Section[] {
  const lines = stripHeader(markdown).split('\n');
  const fileTitle = lines
    .find((line) => line.startsWith('# '))
    ?.slice(2)
    .trim() ?? path;
  const result: Section[] = [];
  let current: Section = {
    id: path,
    title: fileTitle,
    text: '',
  };
  let fence = false;

  for (const line of lines) {
    fence = line
      .trimStart()
      .startsWith('```') ? !fence : fence;
    if (!fence && line.startsWith('## ')) {
      result.push(current);
      const heading = line
        .slice(3)
        .trim();

      current = {
        id: `${path}#${slug(heading)}`,
        title: `${fileTitle} > ${heading}`,
        text: '',
      };
      continue;
    }
    current.text += `${line}\n`;
  }
  result.push(current);
  return result.filter((section) => section.text.trim() !== '' || section.id.includes('#'));
}

function counts(words: string[]): Map<string, number> {
  const map = new Map<string, number>();

  for (const word of words) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

// One line per section: id, title, length, body terms with their counts, title terms.
// Sections and terms are sorted, so the same documents always give the same text.
export function indexText(entries: Section[]): string {
  const lines = [...entries]
    .sort((a, b) => a.id.localeCompare(b.id, 'en'))
    .map((section) => {
      const words = tokenize(`${section.title}\n${section.text}`);
      const body = [...counts(words)]
        .sort(([a], [b]) => a.localeCompare(b, 'en'))
        .map(([
          term,
          count,
        ]) => `${term}:${count}`)
        .join(' ');
      const title = [...new Set(tokenize(section.title))]
        .sort((a, b) => a.localeCompare(b, 'en'))
        .join(' ');

      return [
        section.id,
        section.title.replaceAll('\t', ' '),
        String(words.length),
        body,
        title,
      ].join('\t');
    });

  return [
    '# local search index, format 1: id, title, length, body terms with counts, title terms',
    ...lines,
    '',
  ].join('\n');
}

export function parseIndex(text: string): IndexEntry[] {
  return text
    .split('\n')
    .filter((line) => line !== '' && !line.startsWith('#'))
    .map((line) => {
      const [
        id = '',
        title = '',
        length = '0',
        body = '',
        titleTerms = '',
      ] = line.split('\t');

      return {
        id,
        title,
        length: Number(length),
        body: new Map(body
          .split(' ')
          .filter((pair) => pair !== '')
          .map((pair) => {
            const colon = pair.lastIndexOf(':');

            return [
              pair.slice(0, colon),
              Number(pair.slice(colon + 1)),
            ];
          })),
        titleTerms: new Set(titleTerms
          .split(' ')
          .filter((term) => term !== '')),
      };
    });
}

function documentFrequencies(entries: IndexEntry[]): Map<string, number> {
  const frequencies = new Map<string, number>();

  for (const entry of entries) {
    for (const term of entry.body.keys()) {
      frequencies.set(term, (frequencies.get(term) ?? 0) + 1);
    }
  }
  return frequencies;
}

// Names written as in code (an upper case inside, a digit, _ or -) are API names: an exact match
// of the whole name in a title counts more.
function apiNames(query: string): string[] {
  return [...query.matchAll(CHUNK)]
    .map((match) => match[0])
    .filter((chunk) => /\p{Ll}\p{Lu}|\p{L}\p{N}|[_$-]/u.test(chunk) || /^\p{Lu}\p{Ll}+\p{Lu}/u.test(chunk))
    .map((chunk) => chunk.toLowerCase());
}

// The kinds that titles add to a name ("List<T> class", "struct Vec"), and the notes in brackets.
const KINDS = /\b(?:class|struct|interface|enum|delegate|record|method|property|constructor|field|event|operator|fn|trait|type|const|static|union|macro|annotation|exception|function|module|namespace)\b|\([^)]*\)$|`/g;

function bareName(text: string): string {
  return text
    .replaceAll(KINDS, '')
    .replaceAll(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// The API names a query may stand for: "List<T>" is one name; "List<T> Add" is the member
// "List<T>.Add" (or "List<T>::Add" in Rust). None for a query of other words.
function exactNames(query: string): string[] {
  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word !== '');

  if (words.length === 1) {
    return words;
  }
  return words.length === 2 ? [
    `${words[0] ?? ''}.${words[1] ?? ''}`,
    `${words[0] ?? ''}::${words[1] ?? ''}`,
  ] : [];
}

// A title that names the API of the query exactly comes first; one that starts with it comes next.
function nameBonus(title: string, names: string[]): number {
  const parts = title
    .split(' > ')
    .map((part) => bareName(part));
  const exact = (name: string): boolean => parts.some((part) => part === name || part.startsWith(`${name}(`));
  const prefix = (name: string): boolean => parts.some((part) => part.startsWith(`${name} `) || part.startsWith(`${name}.`) || part.startsWith(`${name}::`));

  if (names.some((name) => exact(name))) {
    return EXACT_WEIGHT;
  }
  return names.some((name) => prefix(name)) ? PREFIX_WEIGHT : 0;
}

// BM25 over the sections; a section needs no more than one of the query words to be found.
export function search(entries: IndexEntry[], query: string, limit = MAX_HITS): Hit[] {
  const terms = [...new Set(tokenize(query))];
  const names = apiNames(query);
  const exact = exactNames(query);
  const frequencies = documentFrequencies(entries);
  const average = entries.reduce((sum, entry) => sum + entry.length, 0) / Math.max(entries.length, 1);
  const idf = (term: string): number => {
    const count = frequencies.get(term) ?? 0;

    return Math.log(1 + ((entries.length - count + 0.5) / (count + 0.5)));
  };

  return entries
    .map((entry) => {
      let score = 0;

      for (const term of terms) {
        const frequency = entry.body.get(term) ?? 0;

        if (frequency > 0) {
          score += idf(term) * ((frequency * (K1 + 1)) / (frequency + (K1 * (1 - B + (B * entry.length / average)))));
        }
        score += entry.titleTerms.has(term) ? TITLE_WEIGHT * idf(term) : 0;
      }
      score += names.filter((name) => entry.titleTerms.has(name)).length * NAME_WEIGHT * Math.max(...names.map((name) => idf(name)), 1);
      score += score > 0 ? nameBonus(entry.title, exact) : 0;
      return {
        id: entry.id,
        title: entry.title,
        score,
      };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id, 'en'))
    .slice(0, Math.min(limit, MAX_HITS));
}
