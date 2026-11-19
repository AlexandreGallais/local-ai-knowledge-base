# Local search over the official documentation, the Python twin of search.ts: the same sections, the
# same words, the same plain-text index, byte for byte, and the same BM25 ranking. Python 3.9 or
# later, standard library only.
#   tokenize:    words of a query or a text, names of variables split as a person reads them
#   sections:    the sections of a file, by its format: Markdown, reStructuredText, AsciiDoc, LaTeX,
#                Texinfo, PreTeXt, XML documentation of .NET, HTML
#   index_text:  the plain-text index of sections, the same text for the same input
#   search:      the best sections for a query, 10 at most
#
# The regular expressions of search.ts follow JavaScript; this file writes them so that Python reads
# them the same way: "\s" and trim() are the white space of JavaScript, "." stops at the four line
# terminators of JavaScript, "\b" and "\d" are ASCII, and lengths count UTF-16 code units.
from __future__ import annotations

import math
import re
import sys
import unicodedata
from functools import lru_cache
from typing import NamedTuple

# The white space of JavaScript: what "\s" matches and what trim() removes.
JS_SPACE = '\t\n\x0b\x0c\r \u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff'
SPACE_CHARS = r'\t\n\x0b\x0c\r \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff'
S = f'[{SPACE_CHARS}]'
NOT_S = f'[^{SPACE_CHARS}]'
# "." of JavaScript: any character but a line terminator.
DOT = r'[^\n\r\u2028\u2029]'
# "^" and "$" of a JavaScript expression with the flag m.
LINE_START = r'(?:\A|(?<=[\n\r\u2028\u2029]))'
LINE_END = r'(?=[\n\r\u2028\u2029]|\Z)'


def js_trim(text: str) -> str:
    return text.strip(JS_SPACE)


def utf16_length(text: str) -> int:
    return len(text) + sum(1 for char in text if ord(char) > 0xFFFF)


def utf16_key(text: str) -> bytes:
    # The order of "<" in JavaScript: by UTF-16 code units.
    return text.encode('utf-16-be', 'surrogatepass')


def _ranges_text(found: list[tuple[int, int]]) -> str:
    return ''.join(f'\\U{first:08x}' if first == last else f'\\U{first:08x}-\\U{last:08x}' for first, last in found)


def _unicode_classes() -> tuple[str, str, str, str]:
    # The contents of four character classes, as "\p{L}", "\p{N}", "\p{Lu}" and "\p{Ll}" of
    # JavaScript: every code point of the general categories, in one pass over Unicode.
    tests = (lambda kind: kind[0] == 'L', lambda kind: kind[0] == 'N', lambda kind: kind == 'Lu', lambda kind: kind == 'Ll',)
    ranges: list[list[tuple[int, int]]] = [
        [],
        [],
        [],
        [],
    ]
    starts: list[int | None] = [
        None,
        None,
        None,
        None,
    ]
    # No letter and no number lies beyond plane 3: planes 4 to 13 are empty, plane 14 holds format
    # characters, planes 15 and 16 private use. Stopping there spares three quarters of the work.
    last = min(sys.maxunicode, 0x3FFFF)
    for code in range(last + 2):
        category = unicodedata.category(chr(code)) if code <= last else ''
        for which, test in enumerate(tests):
            inside = category != '' and test(category)
            start = starts[which]
            if inside and start is None:
                starts[which] = code
            elif not inside and start is not None:
                ranges[which].append((start, code - 1))
                starts[which] = None
    letter, number, upper, lower = (_ranges_text(found) for found in ranges)
    return letter, number, upper, lower


_LETTER, _NUMBER, _UPPER, _LOWER = _unicode_classes()
L = f'[{_LETTER}]'
N = f'[{_NUMBER}]'
LU = f'[{_UPPER}]'
LL = f'[{_LOWER}]'


class Section(NamedTuple):
    # "path/to/file.md#anchor", relative to the indexed folder.
    id: str
    title: str
    text: str


class IndexEntry(NamedTuple):
    id: str
    title: str
    length: int
    body: dict[str, int]
    title_terms: set[str]


class Hit(NamedTuple):
    id: str
    title: str
    score: float


STOP_WORDS = {
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
}
CHUNK = re.compile(rf'[{_LETTER}{_NUMBER}_$\-]+')
K1 = 1.2
B = 0.75
TITLE_WEIGHT = 2
NAME_WEIGHT = 3
# Points given to a title that names the API of a one-name query, exactly or as its start.
EXACT_WEIGHT = 40
PREFIX_WEIGHT = 15
CASE_WEIGHT = 10
MAX_HITS = 10
_ASCII_WORD = re.compile(r'[a-z]+')
_NOT_S_END = re.compile(r'[^s]s\Z')
_EDGE = re.compile(r'\A[\-_$]+|[\-_$]+\Z')
_JOINERS = re.compile(r'[\-_$]+')
_COARSE = re.compile(f'(?<={LL})(?={LU})|(?<={L})(?={N})|(?<={N})(?={L})')
_FINE = re.compile(f'(?<={LU})(?={LU}{LL})')


def stem(word: str) -> str:
    # A light English stemmer: plural and verb endings, enough to match "signals" with "signal".
    if len(word) <= 4 or not _ASCII_WORD.fullmatch(word):
        return word
    if word.endswith('ies'):
        return word[:-3] + 'y'
    if word.endswith('sses'):
        return word[:-2]
    if _NOT_S_END.search(word):
        return word[:-1]
    if word.endswith('ing') and len(word) > 6:
        return word[:-3]
    if word.endswith('ed') and len(word) > 5:
        return word[:-2]
    return word


def split_name(chunk: str) -> list[str]:
    # "getBBox" gives get, bbox, box and getbbox; "DOMMatrix2D" gives dom, matrix, dommatrix and
    # dommatrix2d; "signal_store" gives signal, store and signal_store.
    whole = _EDGE.sub('', chunk)
    parts = _JOINERS.split(whole)
    coarse = [piece for part in parts for piece in _COARSE.split(part)]
    fine = [piece for part in coarse for piece in _FINE.split(part)]
    words = dict.fromkeys(word.lower() for word in [
        whole,
        *parts,
        *coarse,
        *fine,
    ])
    return [word for word in words if utf16_length(word) >= 2]


@lru_cache(maxsize=1 << 20)
def _chunk_terms(chunk: str) -> tuple[str, ...]:
    return tuple(stem(word) for word in split_name(chunk) if word not in STOP_WORDS)


def tokenize(text: str) -> list[str]:
    return [term for found in CHUNK.finditer(text) for term in _chunk_terms(found.group(0))]


_SLUG_DROP = re.compile(rf'[^{_LETTER}{_NUMBER}{SPACE_CHARS}_\-]')
_ONE_SPACE = re.compile(S)


def slug(heading: str) -> str:
    # GitHub's heading anchor: lower case, spaces to hyphens, punctuation removed.
    return _ONE_SPACE.sub('-', _SLUG_DROP.sub('', js_trim(heading).lower()))


class Cut(NamedTuple):
    # A place where a section starts in a file: the line it starts at, and its heading.
    line: int
    heading: str


class Outline(NamedTuple):
    # What a format gives of a file: its title, when it names one, and where its sections start.
    title: str | None
    cuts: list[Cut]


# The extensions of the files the search reads, the documentation kept as its authors wrote it: the
# last ones are manual pages (roff), Qt documentation (qdoc) and MediaWiki pages (wikitext).
DOCUMENT_FILE = re.compile(r'\.(?:md|mdx|markdown|rst|txt|adoc|tex|texi|txi|ptx|xml|html?|json|qdoc|wiki|dox|scd|man|[1-9][a-z]{0,6})(?:\.in)?\Z')
MARKDOWN_FILE = re.compile(r'\.(?:md|mdx|markdown)(?:\.in)?\Z')
MANUAL_PAGE = re.compile(r'\.(?:man|[1-9][a-z]{0,6})(?:\.in)?\Z')
_FRONT_TITLE = re.compile(f'{LINE_START}title:{S}*["\']?({DOT}*?)["\']?{S}*{LINE_END}')


def front_matter(text: str) -> tuple[str, str | None]:
    # The YAML header of a Markdown file (MDN, Vite...), and the title it may give.
    if not text.startswith('---\n'):
        return text, None
    end = text.find('\n---', 4)
    block = '' if end < 0 else text[4:end]
    found = _FRONT_TITLE.search(block)
    body = text if end < 0 else text[end + 4 :]
    return body, None if found is None else found.group(1)


def decode_xml(text: str) -> str:
    return text.replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&apos;', "'").replace('&amp;', '&')


_FENCE = re.compile(f'{S}*(?:```|~~~)')
_MARKDOWN_HEADING = re.compile(r'#{2,4} ')
_HASHES = re.compile(r'\A#+ ')


def markdown_cuts(lines: list[str]) -> Outline:
    # Markdown: "# " gives the title, each "##", "###" or "####" outside a code block a section.
    cuts: list[Cut] = []
    title: str | None = None
    fence = False
    for index, line in enumerate(lines):
        fence = (not fence) if _FENCE.match(line) else fence
        if fence:
            continue
        # "# Title", or "% title" on the first line of a manual page written for pandoc (Podman).
        if title is None and (line.startswith('# ') or (index == 0 and line.startswith('% '))):
            title = js_trim(line[2:])
        elif _MARKDOWN_HEADING.match(line):
            # Levels 2 to 4: a long reference page (the options of a command) gives one section per entry.
            cuts.append(Cut(index, js_trim(_HASHES.sub('', line, count=1))))
    return Outline(title, cuts)


class StyledHeading(NamedTuple):
    line: int
    text: str
    style: str


_ATX = re.compile(rf'(={{1,6}}){S}+({NOT_S}{DOT}*)\Z')
_ASCIIDOC_ANCHOR = re.compile(rf'{S}*\[\[[^\]]*\]\]{S}*\Z')
_MARK = re.compile(rf'([!-/:-@\[-`{{-~])\1{{2,}}{S}*\Z')
_ONLY_MARKS = re.compile(r'[!-/:-@\[-`{-~]+')


def heading_at(lines: list[str], index: int) -> StyledHeading | None:
    # The heading a line starts, in reStructuredText or AsciiDoc: "== Title", or a line underlined (and
    # maybe overlined) with one repeated punctuation, the style naming its level.
    line = lines[index] if index < len(lines) else ''
    following = lines[index + 1] if index + 1 < len(lines) else ''
    atx = _ATX.match(line)
    if atx is not None:
        # An AsciiDoc anchor after the title ("== Step Mode [[StepMode]]") is not part of it.
        return StyledHeading(index, _ASCIIDOC_ANCHOR.sub('', atx.group(2), count=1), atx.group(1))
    mark = _MARK.match(following)
    text = js_trim(line)
    if mark is None or text == '' or _ONLY_MARKS.fullmatch(text) or utf16_length(js_trim(following)) < utf16_length(text):
        return None
    previous = lines[index - 1] if index >= 1 else ''
    over = js_trim(previous) == js_trim(following)
    return StyledHeading(index - 1 if over else index, text, ('over' if over else '') + mark.group(1))


def underlined_cuts(lines: list[str]) -> Outline:
    # reStructuredText and AsciiDoc: the first style of heading met is the title, the second the
    # sections.
    headings = [heading for heading in (heading_at(lines, index) for index in range(len(lines))) if heading is not None]
    styles = list(dict.fromkeys(heading.style for heading in headings))
    first = styles[0] if styles else None
    second = styles[1] if len(styles) > 1 else None
    section_style = first if second is None else second
    title = next((heading.text for heading in headings if heading.style == first), None)
    cuts = [Cut(heading.line, heading.text) for position, heading in enumerate(headings) if heading.style == section_style and (second is not None or position > 0)]
    return Outline(title, cuts)


_LATEX = re.compile(rf'{S}*\\(chapter|section|subsection)\*?(?:\[[^\]]*\])?\{{({DOT}+?)\}}{S}*(?:%{DOT}*)?\Z')


def latex_cuts(lines: list[str]) -> Outline:
    # LaTeX: \chapter or the first \section gives the title; each \section, or each \subsection in a
    # file of one section, starts a section.
    commands = [(index, found.group(1), found.group(2)) for index, found in enumerate(_LATEX.match(line) for line in lines) if found is not None]
    chapter = next((command for command in commands if command[1] == 'chapter'), None)
    level = 'section' if len([command for command in commands if command[1] == 'section']) > 1 or chapter is not None else 'subsection'
    cuts = [Cut(command[0], command[2]) for command in commands if command[1] == level]
    first_section = next((command[2] for command in commands if command[1] == 'section'), None)
    title = first_section if chapter is None else chapter[2]
    return Outline(title, cuts[1:] if chapter is None and level == 'section' else cuts)


KINDS_OF_MEMBERS = {
    'T': 'type',
    'M': 'method',
    'P': 'property',
    'F': 'field',
    'E': 'event',
    'N': 'namespace',
}
_PARAMETERS = re.compile(rf'\({DOT}*\Z')
_GENERIC = re.compile(r'`[0-9]+')


def intellisense_heading(kind: str, name: str) -> str:
    without_parameters = _PARAMETERS.sub('', name, count=1)
    parts = without_parameters.split('.')
    short = parts[-1] if kind in {
        'T',
        'N',
    } else '.'.join(parts[-2:])
    shown = _GENERIC.sub('<T>', short).replace('.#ctor', ' constructor', 1)
    return f'{shown} ({KINDS_OF_MEMBERS.get(kind, kind)}: {without_parameters})'


_MEMBER = re.compile(f'<Member{S}[^>]*MemberName="([^"]+)"|<member{S}+name="([^"]+)"')
_MEMBER_KIND = re.compile(rf'([TMPFEN]):({DOT}+)\Z')


def member_heading(line: str) -> str | None:
    # The member a line of the documentation of a .NET API starts: "M:System.String.Trim(System.Char[])"
    # is "String.Trim (method: ...)", the name a person looks for.
    member = _MEMBER.search(line)
    if member is None:
        return None
    name = decode_xml(member.group(2) if member.group(1) is None else member.group(1))
    kind = _MEMBER_KIND.match(name)
    return name if kind is None else intellisense_heading(kind.group(1), kind.group(2))


_DIVISION = re.compile(r'<(?:chapter|section|subsection|appendix|refsect[1-3]|sect[1-3])\b', re.ASCII)
_TITLE_TAG = re.compile(f'<title>({DOT}*?)</title>')
_TAG = re.compile(r'<[^>]+>')
_SPACES = re.compile(f'{S}+')


def division_heading(lines: list[str], index: int) -> str | None:
    # The <title> of a division of PreTeXt or DocBook that starts at a line, as text.
    if not _DIVISION.search(lines[index] if index < len(lines) else ''):
        return None
    found = _TITLE_TAG.search(' '.join(lines[index : index + 4]))
    if found is None:
        return None
    return js_trim(_SPACES.sub(' ', _TAG.sub('', found.group(1))))


_TYPE_NAME = re.compile(f'<Type{S}[^>]*FullName="([^"]+)"')
_MEMBER_TAG = re.compile(r'<member', re.IGNORECASE)
_PROTOCOL = re.compile(rf'<protocol{S}+name="([^"]+)"')
_INTERFACE = re.compile(rf'<interface{S}+name="([^"]+)"')
_REFENTRY = re.compile(rf'<refentrytitle>([^<]+)</refentrytitle>(?:{S}*<manvolnum>([^<]+)</manvolnum>)?')


def refentry_title(head: str) -> str | None:
    # The title of a DocBook manual page (systemd...): "<refentrytitle>name</refentrytitle>" and its
    # "<manvolnum>", as "name(5)".
    found = _REFENTRY.search(head)
    if found is None:
        return None
    name = decode_xml(found.group(1))
    return name if found.group(2) is None else f'{name}({found.group(2)})'


def _xml_title(lines: list[str], protocol: str | None) -> str | None:
    # The type of a .NET documentation, else the Wayland protocol, else the DocBook manual page.
    type_name = _TYPE_NAME.search('\n'.join(lines[:20]))
    if type_name is not None:
        return decode_xml(type_name.group(1))
    return protocol if protocol is not None else refentry_title('\n'.join(lines[:40]))


def _xml_heading(lines: list[str], index: int, protocol: str | None) -> str | None:
    # The heading a line of XML starts: a .NET member, a division, or an interface of a protocol.
    heading = member_heading(lines[index])
    if heading is None:
        heading = division_heading(lines, index)
    if heading is None and protocol is not None:
        interface = _INTERFACE.search(lines[index])
        heading = None if interface is None else interface.group(1)
    return heading


def xml_cuts(lines: list[str]) -> Outline:
    # XML: the documentation of a .NET API (one <Member> per member of a type, or one
    # <member name="..."> per member of an assembly), PreTeXt or DocBook (a <title> per division). The
    # type, the title of a DocBook manual page, or the first division of the file (a chapter, or a
    # section kept in its own file), names it.
    # A Wayland protocol: <protocol name="..."> names it, each <interface name="..."> is a section.
    protocol_match = _PROTOCOL.search('\n'.join(lines[:40]))
    protocol = None if protocol_match is None else protocol_match.group(1)
    cuts: list[Cut] = []
    title = _xml_title(lines, protocol)
    for index, line in enumerate(lines):
        heading = _xml_heading(lines, index, protocol)
        if heading is None:
            continue
        if title is None and not cuts and not _MEMBER_TAG.search(line):
            title = heading
            continue
        cuts.append(Cut(index, heading))
    return Outline(title, cuts)


_TEXINFO = re.compile(rf'@(settitle|chapter|unnumbered|appendix|section|unnumberedsec|appendixsec){S}+({DOT}+)\Z')


def _is_section(name: str) -> bool:
    return name.endswith(('sec', 'section'))


def _is_chapter(name: str) -> bool:
    return name in {
        'chapter',
        'unnumbered',
        'appendix',
    }


def texinfo_cuts(lines: list[str]) -> Outline:
    # Texinfo (GNU manuals): @settitle or the first @chapter gives the title; each @section, or each
    # @chapter in a manual without sections, starts a section.
    commands = [(index, found.group(1), js_trim(found.group(2))) for index, found in enumerate(_TEXINFO.match(line) for line in lines) if found is not None]
    cuts_at = _is_section if len([command for command in commands if _is_section(command[1])]) > 1 else _is_chapter
    settitle = next((command[2] for command in commands if command[1] == 'settitle'), None)
    title = next((command[2] for command in commands if _is_chapter(command[1])), None) if settitle is None else settitle
    return Outline(title, [Cut(command[0], command[2]) for command in commands if cuts_at(command[1])])


def text_of(html: str) -> str:
    return js_trim(_SPACES.sub(' ', decode_xml(_TAG.sub('', html))))


_HTML_TITLE = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)
_HTML_H1 = re.compile(r'<h1\b[^>]*>(.*?)</h1>', re.IGNORECASE | re.DOTALL | re.ASCII)
_HTML_HEADINGS = {tag: re.compile(rf'<{tag}\b[^>]*>({DOT}*?)(?:</{tag}>|\Z)', re.IGNORECASE | re.ASCII) for tag in ('h2', 'h3')}


def _html_headings(lines: list[str], tag: str) -> list[Cut]:
    return [Cut(index, text_of(found.group(1))) for index, found in enumerate(_HTML_HEADINGS[tag].search(line) for line in lines) if found is not None]


def html_cuts(lines: list[str]) -> Outline:
    # HTML: <title> or the first <h1> gives the title; each <h2>, or each <h3> in a page without <h2>,
    # starts a section.
    page = '\n'.join(lines[:200])
    found = _HTML_TITLE.search(page) or _HTML_H1.search(page)
    second = _html_headings(lines, 'h2')
    cuts = [cut for cut in (second or _html_headings(lines, 'h3')) if cut.heading != '']
    return Outline(None if found is None else text_of(found.group(1)), cuts)


_UNDERLINED_FILE = re.compile(r'\.(?:rst|txt|adoc)\Z')
_TEXINFO_FILE = re.compile(r'\.(?:texi|txi)\Z')
_HTML_FILE = re.compile(r'\.html?\Z')
_XML_FILE = re.compile(r'\.(?:ptx|xml)\Z')
_JSON_TITLE = re.compile(f'"title"{S}*:{S}*"([^"]+)"')
_ROFF_FONT = re.compile(rf'\\f(?:\[[^\]]*\]|\({DOT}{DOT}|{DOT})')
_ROFF_HEADER = re.compile(rf'\.(?:TH|Dt){S}+({NOT_S}+){S}+({NOT_S}+)')
_ROFF_HEADING = re.compile(rf'\.(?:SH|Sh|SS|Ss){S}+({DOT}+)\Z')


def roff_text(text: str) -> str:
    # The text of the argument of a roff request: quotes, font changes and escapes removed.
    return js_trim(_ROFF_FONT.sub('', text).replace('\\-', '-').replace('\\&', '').replace('"', ''))


def roff_cuts(lines: list[str]) -> Outline:
    # Manual pages (roff, with the man or the mdoc macros): .TH or .Dt gives the title, "name(section)";
    # each .SH or .SS (.Sh or .Ss in mdoc) starts a section.
    title: str | None = None
    cuts: list[Cut] = []
    for index, line in enumerate(lines):
        header = _ROFF_HEADER.match(line)
        heading = _ROFF_HEADING.match(line)
        if header is not None and title is None:
            title = f'{roff_text(header.group(1))}({roff_text(header.group(2))})'
        elif heading is not None and roff_text(heading.group(1)) != '':
            cuts.append(Cut(index, roff_text(heading.group(1))))
    return Outline(title, cuts)


_WIKI_HEADING = re.compile(rf'(={{2,4}}){S}*({DOT}+?){S}*\1{S}*\Z')
_WIKI_FILE = re.compile(r'\.wiki(?:\.in)?\Z')


def wiki_cuts(lines: list[str], path: str) -> Outline:
    # MediaWiki pages (wikitext, as Wikipedia and Wikibooks give them): each "== Heading ==" to
    # "==== Heading ====" starts a section; the page has no title line, so its file name gives it.
    cuts = [Cut(index, js_trim(found.group(2))) for index, found in enumerate(_WIKI_HEADING.match(line) for line in lines) if found is not None]
    title = _WIKI_FILE.sub('', _FOLDERS.sub('', path, count=1), count=1).replace('_', ' ')
    return Outline(title, cuts)


_QDOC_TITLE = re.compile(rf'{S}*\\title{S}+({DOT}+)\Z')
_QDOC_TYPE = re.compile(rf'{S}*\\(?:class|qmltype|namespace|headerfile){S}+({DOT}+)\Z')
_QDOC_HEADING = re.compile(rf'{S}*\\(?:section[1-4]|fn|property|enum|typedef|variable|macro|qmlproperty|qmlattachedproperty|qmlmethod|qmlsignal){S}+({DOT}+)\Z')
_QDOC_FILE = re.compile(r'\.qdoc(?:\.in)?\Z')


def qdoc_cuts(lines: list[str]) -> Outline:
    # Qt documentation (qdoc): \title, or else the first \class or \qmltype, gives the title; each
    # \section1 to \section4, each other type and each member (\fn, \property, \enum...) starts a section.
    titled = next((found.group(1) for found in (_QDOC_TITLE.match(line) for line in lines) if found is not None), None)
    title = None if titled is None else js_trim(titled)
    cuts: list[Cut] = []
    for index, line in enumerate(lines):
        kind = _QDOC_TYPE.match(line)
        member = None if kind is not None else _QDOC_HEADING.match(line)
        found = kind or member
        if found is None:
            continue
        if title is None and kind is not None:
            title = js_trim(kind.group(1))
            continue
        cuts.append(Cut(index, js_trim(found.group(1))))
    return Outline(title, cuts)


_DOX_CODE = re.compile(rf'{S}*(?:```|~~~|[\\@](?:code|endcode)\b)', re.ASCII)
_DOX_PAGE = re.compile(rf'{S}*(?:/\*\*{S}*)?[\\@]page{S}+{NOT_S}+{S}+({DOT}+)\Z')
_DOX_SECTION = re.compile(rf'{S}*[\\@](?:section|subsection|subsubsection){S}+{NOT_S}+{S}+({DOT}+)\Z')
_DOX_HEADING = re.compile(rf'#{{1,4}}{S}+({DOT}+)\Z')
_DOX_FILE = re.compile(r'\.dox(?:\.in)?\Z')


def doxygen_cuts(lines: list[str]) -> Outline:
    # Doxygen pages (PipeWire): "\page <id> <title>" gives the title; each "\section <id> <title>",
    # "\subsection" or Markdown heading outside a code block starts a section.
    title: str | None = None
    code = False
    cuts: list[Cut] = []
    for index, line in enumerate(lines):
        code = (not code) if _DOX_CODE.match(line) else code
        if code:
            continue
        page = _DOX_PAGE.match(line)
        heading = _DOX_SECTION.match(line) or _DOX_HEADING.match(line)
        if page is not None and title is None:
            title = js_trim(page.group(1))
        elif heading is not None:
            cuts.append(Cut(index, js_trim(heading.group(1))))
    return Outline(title, cuts)


_SCD_FENCE = re.compile(rf'{S}*```')
_SCD_HEADING = re.compile(rf'#{{1,3}}{S}+({DOT}+)\Z')
_SCD_TITLE = re.compile(rf'({NOT_S}+\([0-9][a-z]*\)){S}*\Z')
_SCD_FILE = re.compile(r'\.scd(?:\.in)?\Z')


def scdoc_cuts(lines: list[str]) -> Outline:
    # scdoc manual pages (RPM): the first line "NAME(section)" gives the title; each "#" to "###"
    # heading outside a code block starts a section.
    code = False
    cuts: list[Cut] = []
    for index, line in enumerate(lines):
        code = (not code) if _SCD_FENCE.match(line) else code
        heading = None if code else _SCD_HEADING.match(line)
        if heading is not None:
            cuts.append(Cut(index, js_trim(heading.group(1))))
    title = _SCD_TITLE.match(lines[0] if lines else '')
    return Outline(None if title is None else title.group(1), cuts)


def _text_cuts(path: str, lines: list[str]) -> Outline:
    underlined = underlined_cuts(lines)
    # A text file written in Markdown (a specification, a manual for pandoc) has no underlined heading.
    if path.endswith('.txt') and underlined.title is None and not underlined.cuts:
        return markdown_cuts(lines)
    return underlined


def _json_cuts(lines: list[str]) -> Outline:
    # A JSON schema (the options of an Angular schematic): one section, titled by its "title".
    found = _JSON_TITLE.search('\n'.join(lines[:40]))
    return Outline(None if found is None else found.group(1), [])


# Each format by the extension of its file, in the order search.ts tries them; Markdown otherwise.
# Texinfo: .texi, and .txi for the chapters of a manual (Octave).
_FORMATS = ((_UNDERLINED_FILE, _text_cuts), (MANUAL_PAGE, lambda path, lines: roff_cuts(lines)), (_WIKI_FILE, lambda path, lines: wiki_cuts(lines, path)), (_QDOC_FILE, lambda path, lines: qdoc_cuts(lines)), (_DOX_FILE, lambda path, lines: doxygen_cuts(lines)), (_SCD_FILE, lambda path, lines: scdoc_cuts(lines)), (re.compile(r'\.tex\Z'), lambda path, lines: latex_cuts(lines)), (_TEXINFO_FILE, lambda path, lines: texinfo_cuts(lines)), (_HTML_FILE, lambda path, lines: html_cuts(lines)), (re.compile(r'\.json\Z'), lambda path, lines: _json_cuts(lines)), (_XML_FILE, lambda path, lines: xml_cuts(lines)),)


def cuts_of(path: str, lines: list[str]) -> Outline:
    cut = next((cut for pattern, cut in _FORMATS if pattern.search(path)), None)
    return markdown_cuts(lines) if cut is None else cut(path, lines)


def unique_anchor(seen: dict[str, int], heading: str) -> str:
    # The anchor of a heading in its file; one met twice gets "-2", "-3"...
    anchor = slug(heading) or 'section'
    count = seen.get(anchor, 0) + 1
    seen[anchor] = count
    return anchor if count == 1 else f'{anchor}-{count}'


_FOLDERS = re.compile(rf'\A{DOT}*/')


def _file_title(path: str, header_title: str | None, found: Outline) -> str:
    if header_title is not None:
        return header_title
    if found.title is not None:
        return found.title
    return _FOLDERS.sub('', path, count=1)


def sections(path: str, text: str) -> list[Section]:
    # The sections of a documentation file, by its format; the text before the first section belongs
    # to the title of the file.
    body, header_title = front_matter(text) if MARKDOWN_FILE.search(path) else (text, None)
    lines = body.split('\n')
    found = cuts_of(path, lines)
    file_title = _file_title(path, header_title, found)
    seen: dict[str, int] = {}
    starts = [
        Cut(0, ''),
        *found.cuts,
    ]
    ends = [
        *(cut.line for cut in found.cuts),
        len(lines),
    ]
    result = []
    for position, cut in enumerate(starts):
        part = '\n'.join(lines[cut.line : max(ends[position], cut.line)])
        if cut.heading == '':
            section = Section(path, file_title, part)
        else:
            section = Section(f'{path}#{unique_anchor(seen, cut.heading)}', f'{file_title} > {cut.heading}', part)
        if js_trim(section.text) != '' or '#' in section.id:
            result.append(section)
    return result


def _index_line(section: Section) -> str:
    words = tokenize(section.title + '\n' + section.text)
    counts: dict[str, int] = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    body = ' '.join(f'{term}:{count}' for term, count in sorted(counts.items(), key=lambda pair: utf16_key(pair[0])))
    title = ' '.join(sorted(set(tokenize(section.title)), key=utf16_key))
    return '\t'.join([
        section.id,
        section.title.replace('\t', ' '),
        str(len(words)),
        body,
        title,
    ])


def index_text(entries: list[Section]) -> str:
    # One line per section: id, title, length, body terms with their counts, title terms.
    # Sections and terms are sorted, so the same documents always give the same text.
    return '\n'.join([
        '# local search index, format 1: id, title, length, body terms with counts, title terms',
        *(_index_line(section) for section in sorted(entries, key=lambda item: utf16_key(item.id))),
        '',
    ])


def _body_terms(field: str) -> dict[str, int]:
    body: dict[str, int] = {}
    for pair in field.split(' '):
        if pair != '':
            colon = pair.rfind(':')
            body[pair[:colon]] = int(pair[colon + 1 :])
    return body


def parse_index(text: str) -> list[IndexEntry]:
    entries = []
    for line in text.split('\n'):
        if line == '' or line.startswith('#'):
            continue
        fields = line.split('\t')
        fields += [''] * (5 - len(fields))
        entries.append(IndexEntry(fields[0], fields[1], int(fields[2] or '0'), _body_terms(fields[3]), {term for term in fields[4].split(' ') if term != ''}))
    return entries


class Statistics(NamedTuple):
    # What BM25 needs of all the sections searched: how many hold each term, their average length.
    frequencies: dict[str, int]
    average: float
    count: int


def statistics(entries: list[IndexEntry]) -> Statistics:
    frequencies: dict[str, int] = {}
    for entry in entries:
        for key in entry.body:
            frequencies[key] = frequencies.get(key, 0) + 1
    return Statistics(frequencies, sum(entry.length for entry in entries) / max(len(entries), 1), len(entries))


_API_NAME = re.compile(rf'{LL}{LU}|{L}{N}|[_$\-]')
_PASCAL_NAME = re.compile(f'{LU}{LL}+{LU}')


def api_names(query: str) -> list[str]:
    # Names written as in code (an upper case inside, a digit, _ or -) are API names: an exact match
    # of the whole name in a title counts more.
    return [chunk.lower() for chunk in (found.group(0) for found in CHUNK.finditer(query)) if _API_NAME.search(chunk) or _PASCAL_NAME.match(chunk)]


# The kinds that titles add to a name ("List<T> class", "struct Vec"), and the notes in brackets.
KINDS = re.compile(r'\b(?:class|struct|interface|enum|delegate|record|method|property|constructor|field|event|operator|fn|trait|type|const|static|union|macro|annotation|exception|function|module|namespace)\b|\([^)]*\)\Z|`', re.ASCII)


def bare_name(text: str) -> str:
    return js_trim(_SPACES.sub(' ', KINDS.sub('', text))).lower()


def exact_names(query: str) -> list[str]:
    # The API names a query may stand for: "List<T>" is one name; "List<T> Add" is the member
    # "List<T>.Add" (or "List<T>::Add" in Rust). None for a query of other words.
    words = [word for word in _SPACES.split(js_trim(query).lower()) if word != '']
    if len(words) == 1:
        return words
    return [
        f'{words[0]}.{words[1]}',
        f'{words[0]}::{words[1]}',
    ] if len(words) == 2 else []


def name_bonus(title: str, names: list[str], query: str) -> float:
    # A title that names the API of the query exactly comes first; one that starts with it comes next.
    # The same name written with the same case ("inject" the function, not "Inject" the decorator)
    # comes first among the exact ones.
    parts = [bare_name(part) for part in title.split(' > ')]
    trimmed_query = js_trim(query)
    same_case = any(js_trim(KINDS.sub('', part)) == trimmed_query for part in title.split(' > '))
    if any(part == name or part.startswith(f'{name}(') for name in names for part in parts):
        return EXACT_WEIGHT + (CASE_WEIGHT if same_case else 0)
    prefixed = any(part.startswith((f'{name} ', f'{name}.', f'{name}::')) for name in names for part in parts)
    return PREFIX_WEIGHT if prefixed else 0


def search(entries: list[IndexEntry], query: str, limit: int = MAX_HITS, stats: Statistics | None = None) -> list[Hit]:
    # BM25 over the sections; a section needs no more than one of the query words to be found.
    # "stats" spares counting the sections again when the same list is searched often.
    terms = list(dict.fromkeys(tokenize(query)))
    names = api_names(query)
    exact = exact_names(query)
    known = statistics(entries) if stats is None else stats

    def idf(word: str) -> float:
        count = known.frequencies.get(word, 0)
        return math.log(1 + ((known.count - count + 0.5) / (count + 0.5)))

    name_weight = max([
        *(idf(name) for name in names),
        1,
    ])
    hits = []
    for entry in entries:
        score = 0.0
        for term in terms:
            frequency = entry.body.get(term, 0)
            if frequency > 0:
                score += idf(term) * ((frequency * (K1 + 1)) / (frequency + (K1 * (1 - B + (B * entry.length / known.average)))))
            if term in entry.title_terms:
                score += TITLE_WEIGHT * idf(term)
        score += len([name for name in names if name in entry.title_terms]) * NAME_WEIGHT * name_weight
        if score > 0:
            score += name_bonus(entry.title, exact, query)
            hits.append(Hit(entry.id, entry.title, score))
    hits.sort(key=lambda hit: utf16_key(hit.id))
    hits.sort(key=lambda hit: hit.score, reverse=True)
    return hits[: min(limit, MAX_HITS)]
