// Local search over the official documentation, kept in its own format, without a black box:
// sections are indexed in plain text files that a person can read, and ranked with BM25. No package;
// Node 22.18 or later.
//   tokenize:   words of a query or a text, names of variables split as a person reads them
//   sections:   the sections of a file, by its format: Markdown, reStructuredText, AsciiDoc, LaTeX,
//               Texinfo, PreTeXt, XML documentation of .NET, HTML
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
const CASE_WEIGHT = 10;

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

// A place where a section starts in a file: the line it starts at, and its heading.
interface Cut {
  line: number;
  heading: string;
}

// The extensions of the files the search reads, the documentation kept as its authors wrote it.
export const DOCUMENT_FILE = /\.(?:md|mdx|markdown|rst|txt|adoc|tex|texi|ptx|xml|html?|json)(?:\.in)?$/;
const MARKDOWN_FILE = /\.(?:md|mdx|markdown)(?:\.in)?$/;

// What a format gives of a file: its title, when it names one, and where its sections start.
interface Outline {
  title?: string;
  cuts: Cut[];
}

// The YAML header of a Markdown file (MDN, Vite...), and the title it may give.
function frontMatter(text: string): {
  body: string;
  title?: string;
} {
  if (!text.startsWith('---\n')) {
    return { body: text };
  }
  const end = text.indexOf('\n---', 4);
  const block = end < 0 ? '' : text.slice(4, end);
  const title = /^title:\s*["']?(.*?)["']?\s*$/m.exec(block)?.[1];
  const body = end < 0 ? text : text.slice(end + 4);

  return title === undefined ? { body } : {
    body,
    title,
  };
}

// An outline from a title that may be missing.
function outline(title: string | undefined, cuts: Cut[]): Outline {
  return title === undefined ? { cuts } : {
    title,
    cuts,
  };
}

const decodeXml = (text: string): string => text
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'")
  .replaceAll('&amp;', '&');

// Markdown: "# " gives the title, each "##", "###" or "####" outside a code block a section.
function markdownCuts(lines: string[]): Outline {
  const cuts: Cut[] = [];
  let title: string | undefined;
  let fence = false;

  lines.forEach((line, index) => {
    fence = /^\s*(?:```|~~~)/.test(line) ? !fence : fence;
    if (fence) {
      return;
    }
    // "# Title", or "% title" on the first line of a manual page written for pandoc (Podman).
    if (title === undefined && (line.startsWith('# ') || (index === 0 && line.startsWith('% ')))) {
      title = line
        .slice(2)
        .trim();
    } else if (/^#{2,4} /.test(line)) {
      // Levels 2 to 4: a long reference page (the options of a command) gives one section per entry.
      cuts.push({
        line: index,
        heading: line
          .replace(/^#+ /, '')
          .trim(),
      });
    }
  });
  return outline(title, cuts);
}

interface StyledHeading {
  line: number;
  text: string;
  style: string;
}

// The heading a line starts, in reStructuredText or AsciiDoc: "== Title", or a line underlined (and
// maybe overlined) with one repeated punctuation, the style naming its level.
function headingAt(lines: string[], index: number): StyledHeading | undefined {
  const line = lines[index] ?? '';
  const next = lines[index + 1] ?? '';
  const atx = /^(={1,6})\s+(\S.*)$/.exec(line);

  if (atx !== null) {
    return {
      line: index,
      text: atx[2] ?? '',
      style: atx[1] ?? '',
    };
  }
  const mark = /^([!-/:-@[-`{-~])\1{2,}\s*$/.exec(next);
  const text = line.trim();

  if (mark === null || text === '' || /^[!-/:-@[-`{-~]+$/.test(text) || next.trim().length < text.length) {
    return undefined;
  }
  const over = (lines[index - 1] ?? '').trim() === next.trim();

  return {
    line: over ? index - 1 : index,
    text,
    style: `${over ? 'over' : ''}${mark[1] ?? ''}`,
  };
}

// reStructuredText and AsciiDoc: the first style of heading met is the title, the second the
// sections.
function underlinedCuts(lines: string[]): Outline {
  const headings = lines.flatMap((_, index) => headingAt(lines, index) ?? []);
  const styles = [...new Set(headings.map((heading) => heading.style))];
  const [
    first,
    second,
  ] = styles;
  const sectionStyle = second ?? first;

  return outline(
    headings.find((heading) => heading.style === first)?.text,
    headings
      .filter((heading, position) => heading.style === sectionStyle && (second !== undefined || position > 0))
      .map((heading) => ({
        line: heading.line,
        heading: heading.text,
      })),
  );
}

// LaTeX: \chapter or the first \section gives the title; each \section, or each \subsection in a
// file of one section, starts a section.
function latexCuts(lines: string[]): Outline {
  const commands = lines.flatMap((line, index) => {
    const match = /^\s*\\(chapter|section|subsection)\*?(?:\[[^\]]*\])?\{(.+?)\}\s*(?:%.*)?$/.exec(line);

    return match === null ? [] : [
      {
        line: index,
        level: match[1] ?? '',
        heading: match[2] ?? '',
      },
    ];
  });
  const chapter = commands.find((command) => command.level === 'chapter');
  const level = commands.filter((command) => command.level === 'section').length > 1 || chapter !== undefined ? 'section' : 'subsection';
  const cuts = commands.filter((command) => command.level === level);

  return outline(chapter?.heading ?? commands.find((command) => command.level === 'section')?.heading, chapter === undefined && level === 'section' ? cuts.slice(1) : cuts);
}

// The member a line of the documentation of a .NET API starts: "M:System.String.Trim(System.Char[])"
// is "String.Trim (method: ...)", the name a person looks for.
function memberHeading(line: string): string | undefined {
  const member = /<Member\s[^>]*MemberName="([^"]+)"|<member\s+name="([^"]+)"/.exec(line);

  if (member === null) {
    return undefined;
  }
  const name = decodeXml(member[1] ?? member[2] ?? '');
  const kind = /^([TMPFEN]):(.+)$/.exec(name);

  return kind === null ? name : intellisenseHeading(kind[1] ?? '', kind[2] ?? '');
}

// The <title> of a PreTeXt division that starts at a line, as text.
function divisionHeading(lines: string[], index: number): string | undefined {
  if (!/<(?:chapter|section|subsection|appendix)\b/.test(lines[index] ?? '')) {
    return undefined;
  }
  return /<title>(.*?)<\/title>/
    .exec(lines
      .slice(index, index + 4)
      .join(' '))?.[1]
    ?.replaceAll(/<[^>]+>/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

// XML: the documentation of a .NET API (one <Member> per member of a type, or one
// <member name="..."> per member of an assembly), or PreTeXt (a <title> per division). The type, or
// the first division of the file (a chapter, or a section kept in its own file), names it.
function xmlCuts(lines: string[]): Outline {
  const typeName = /<Type\s[^>]*FullName="([^"]+)"/.exec(lines
    .slice(0, 20)
    .join('\n'))?.[1];
  const cuts: Cut[] = [];
  let title = typeName === undefined ? undefined : decodeXml(typeName);

  lines.forEach((line, index) => {
    const heading = memberHeading(line) ?? divisionHeading(lines, index);

    if (heading === undefined) {
      return;
    }
    if (title === undefined && cuts.length === 0 && !/<member/i.test(line)) {
      title = heading;
      return;
    }
    cuts.push({
      line: index,
      heading,
    });
  });
  return outline(title, cuts);
}

const KINDS_OF_MEMBERS: Record<string, string> = {
  T: 'type',
  M: 'method',
  P: 'property',
  F: 'field',
  E: 'event',
  N: 'namespace',
};

function intellisenseHeading(kind: string, name: string): string {
  const withoutParameters = name.replace(/\(.*$/, '');
  const parts = withoutParameters.split('.');
  const short = kind === 'T' || kind === 'N' ? parts.at(-1) ?? name : parts
    .slice(-2)
    .join('.');

  return `${short.replaceAll(/`\d+/g, '<T>').replace('.#ctor', ' constructor')} (${KINDS_OF_MEMBERS[kind] ?? kind}: ${withoutParameters})`;
}

// Texinfo (GNU manuals): @settitle or the first @chapter gives the title; each @section, or each
// @chapter in a manual without sections, starts a section.
function texinfoCuts(lines: string[]): Outline {
  const commands = lines.flatMap((line, index) => {
    const match = /^@(settitle|chapter|unnumbered|appendix|section|unnumberedsec|appendixsec)\s+(.+)$/.exec(line);

    return match === null ? [] : [
      {
        line: index,
        level: match[1] ?? '',
        heading: (match[2] ?? '').trim(),
      },
    ];
  });
  const isSection = (name: string): boolean => /sec(?:tion)?$/.test(name);
  const isChapter = (name: string): boolean => /^(?:chapter|unnumbered|appendix)$/.test(name);
  const cutsAt = commands.filter((command) => isSection(command.level)).length > 1 ? isSection : isChapter;

  return outline(
    commands.find((command) => command.level === 'settitle')?.heading ?? commands.find((command) => isChapter(command.level))?.heading,
    commands
      .filter((command) => cutsAt(command.level))
      .map((command) => ({
        line: command.line,
        heading: command.heading,
      })),
  );
}

const textOf = (html: string): string => decodeXml(html.replaceAll(/<[^>]+>/g, ''))
  .replaceAll(/\s+/g, ' ')
  .trim();

// HTML: <title> or the first <h1> gives the title; each <h2>, or each <h3> in a page without <h2>,
// starts a section.
function htmlCuts(lines: string[]): Outline {
  const headings = (tag: string): Cut[] => lines.flatMap((line, index) => {
    const match = new RegExp(`<${tag}\\b[^>]*>(.*?)(?:</${tag}>|$)`, 'i').exec(line);

    return match === null ? [] : [
      {
        line: index,
        heading: textOf(match[1] ?? ''),
      },
    ];
  });
  const page = lines
    .slice(0, 200)
    .join('\n');
  const title = /<title>([\s\S]*?)<\/title>/i.exec(page)?.[1] ?? /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(page)?.[1];
  const second = headings('h2');

  return outline(title === undefined ? undefined : textOf(title), (second.length > 0 ? second : headings('h3')).filter((cut) => cut.heading !== ''));
}

function cutsOf(path: string, lines: string[]): Outline {
  if (/\.(?:rst|txt|adoc)$/.test(path)) {
    return underlinedCuts(lines);
  }
  if (path.endsWith('.tex')) {
    return latexCuts(lines);
  }
  if (path.endsWith('.texi')) {
    return texinfoCuts(lines);
  }
  if (/\.html?$/.test(path)) {
    return htmlCuts(lines);
  }
  if (path.endsWith('.json')) {
    // A JSON schema (the options of an Angular schematic): one section, titled by its "title".
    return outline(
      /"title"\s*:\s*"([^"]+)"/.exec(lines
        .slice(0, 40)
        .join('\n'))?.[1],
      [],
    );
  }
  return /\.(?:ptx|xml)$/.test(path) ? xmlCuts(lines) : markdownCuts(lines);
}

// The anchor of a heading in its file; one met twice gets "-2", "-3"...
function uniqueAnchor(seen: Map<string, number>, heading: string): string {
  const anchor = slug(heading) || 'section';
  const count = (seen.get(anchor) ?? 0) + 1;

  seen.set(anchor, count);
  return count === 1 ? anchor : `${anchor}-${String(count)}`;
}

// The sections of a documentation file, by its format; the text before the first section belongs
// to the title of the file.
export function sections(path: string, text: string): Section[] {
  const header = MARKDOWN_FILE.test(path) ? frontMatter(text) : { body: text };
  const lines = header.body.split('\n');
  const found = cutsOf(path, lines);
  const fileTitle = header.title ?? found.title ?? path.replace(/^.*\//, '');
  const seen = new Map<string, number>();
  const starts = [
    {
      line: 0,
      heading: '',
    },
    ...found.cuts,
  ];

  return starts
    .map((cut, position) => {
      const body = lines
        .slice(cut.line, starts[position + 1]?.line ?? lines.length)
        .join('\n');

      return cut.heading === '' ? {
        id: path,
        title: fileTitle,
        text: body,
      } : {
        id: `${path}#${uniqueAnchor(seen, cut.heading)}`,
        title: `${fileTitle} > ${cut.heading}`,
        text: body,
      };
    })
    .filter((section) => section.text.trim() !== '' || section.id.includes('#'));
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
// The same name written with the same case ("inject" the function, not "Inject" the decorator)
// comes first among the exact ones.
function nameBonus(title: string, names: string[], query: string): number {
  const parts = title
    .split(' > ')
    .map((part) => bareName(part));
  const exact = (name: string): boolean => parts.some((part) => part === name || part.startsWith(`${name}(`));
  const prefix = (name: string): boolean => parts.some((part) => part.startsWith(`${name} `) || part.startsWith(`${name}.`) || part.startsWith(`${name}::`));
  const sameCase = title
    .split(' > ')
    .some((part) => part.replaceAll(KINDS, '').trim() === query.trim());

  if (names.some((name) => exact(name))) {
    return EXACT_WEIGHT + (sameCase ? CASE_WEIGHT : 0);
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
      score += score > 0 ? nameBonus(entry.title, exact, query) : 0;
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
