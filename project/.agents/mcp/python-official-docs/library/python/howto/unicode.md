---
title: "Unicode HOWTO (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/unicode.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Unicode HOWTO

This HOWTO discusses Python's support for the Unicode specification
for representing textual data, and explains various problems that
people commonly encounter when trying to work with Unicode.

## Introduction to Unicode

### Definitions

Today's programs need to be able to handle a wide variety of
characters.  Applications are often internationalized to display
messages and output in a variety of user-selectable languages; the
same program might need to output an error message in English, French,
Japanese, Hebrew, or Russian.  Web content can be written in any of
these languages and can also include a variety of emoji symbols.
Python's string type uses the Unicode Standard for representing
characters, which lets Python programs work with all these different
possible characters.

Unicode (https://www.unicode.org/) is a specification that aims to
list every character used by human languages and give each character
its own unique code.  The Unicode specifications are continually
revised and updated to add new languages and symbols.

A **character** is the smallest possible component of a text.  'A', 'B', 'C',
etc., are all different characters.  So are 'È' and 'Í'.  Characters vary
depending on the language or context you're talking
about.  For example, there's a character for "Roman Numeral One", 'Ⅰ', that's
separate from the uppercase letter 'I'.  They'll usually look the same,
but these are two different characters that have different meanings.

The Unicode standard describes how characters are represented by
**code points**.  A code point value is an integer in the range 0 to
0x10FFFF (about 1.1 million values, the
actual number assigned
is less than that). In the standard and in this document, a code point is written
using the notation `U+265E` to mean the character with value
`0x265e` (9,822 in decimal).

The Unicode standard contains a lot of tables listing characters and
their corresponding code points:

```none
0061    'a'; LATIN SMALL LETTER A
0062    'b'; LATIN SMALL LETTER B
0063    'c'; LATIN SMALL LETTER C
...
007B    '{'; LEFT CURLY BRACKET
...
2167    'Ⅷ'; ROMAN NUMERAL EIGHT
2168    'Ⅸ'; ROMAN NUMERAL NINE
...
265E    '♞'; BLACK CHESS KNIGHT
265F    '♟'; BLACK CHESS PAWN
...
1F600   '😀'; GRINNING FACE
1F609   '😉'; WINKING FACE
...
```

Strictly, these definitions imply that it's meaningless to say 'this is
character `U+265E`'.  `U+265E` is a code point, which represents some particular
character; in this case, it represents the character 'BLACK CHESS KNIGHT',
'♞'.  In
informal contexts, this distinction between code points and characters will
sometimes be forgotten.

A character is represented on a screen or on paper by a set of graphical
elements that's called a **glyph**.  The glyph for an uppercase A, for example,
is two diagonal strokes and a horizontal stroke, though the exact details will
depend on the font being used.  Most Python code doesn't need to worry about
glyphs; figuring out the correct glyph to display is generally the job of a GUI
toolkit or a terminal's font renderer.

### Encodings

To summarize the previous section: a Unicode string is a sequence of
code points, which are numbers from 0 through `0x10FFFF` (1,114,111
decimal).  This sequence of code points needs to be represented in
memory as a set of **code units**, and **code units** are then mapped
to 8-bit bytes.  The rules for translating a Unicode string into a
sequence of bytes are called a **character encoding**, or just
an **encoding**.

The first encoding you might think of is using 32-bit integers as the
code unit, and then using the CPU's representation of 32-bit integers.
In this representation, the string "Python" might look like this:

```none
   P           y           t           h           o           n
0x50 00 00 00 79 00 00 00 74 00 00 00 68 00 00 00 6f 00 00 00 6e 00 00 00
   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
```

This representation is straightforward but using it presents a number of
problems.

1. It's not portable; different processors order the bytes differently.

1. It's very wasteful of space.  In most texts, the majority of the code points
are less than 127, or less than 255, so a lot of space is occupied by `0x00`
bytes.  The above string takes 24 bytes compared to the 6 bytes needed for an
ASCII representation.  Increased RAM usage doesn't matter too much (desktop
computers have gigabytes of RAM, and strings aren't usually that large), but
expanding our usage of disk and network bandwidth by a factor of 4 is
intolerable.

1. It's not compatible with existing C functions such as `strlen()`, so a new
family of wide string functions would need to be used.

Therefore this encoding isn't used very much, and people instead choose other
encodings that are more efficient and convenient, such as UTF-8.

UTF-8 is one of the most commonly used encodings, and Python often
defaults to using it.  UTF stands for "Unicode Transformation Format",
and the '8' means that 8-bit values are used in the encoding.  (There
are also UTF-16 and UTF-32 encodings, but they are less frequently
used than UTF-8.)  UTF-8 uses the following rules:

1. If the code point is < 128, it's represented by the corresponding byte value.
1. If the code point is >= 128, it's turned into a sequence of two, three, or
four bytes, where each byte of the sequence is between 128 and 255.

UTF-8 has several convenient properties:

1. It can handle any Unicode code point.
1. A Unicode string is turned into a sequence of bytes that contains embedded
zero bytes only where they represent the null character (U+0000). This means
that UTF-8 strings can be processed by C functions such as `strcpy()` and sent
through protocols that can't handle zero bytes for anything other than
end-of-string markers.
1. A string of ASCII text is also valid UTF-8 text.
1. UTF-8 is fairly compact; the majority of commonly used characters can be
represented with one or two bytes.
1. If bytes are corrupted or lost, it's possible to determine the start of the
next UTF-8-encoded code point and resynchronize.  It's also unlikely that
random 8-bit data will look like valid UTF-8.
1. UTF-8 is a byte oriented encoding. The encoding specifies that each
character is represented by a specific sequence of one or more bytes. This
avoids the byte-ordering issues that can occur with integer and word oriented
encodings, like UTF-16 and UTF-32, where the sequence of bytes varies depending
on the hardware on which the string was encoded.

### References

The Unicode Consortium site has character charts, a
glossary, and PDF versions of the Unicode specification.  Be prepared for some
difficult reading.  A chronology of the
origin and development of Unicode is also available on the site.

On the Computerphile Youtube channel, Tom Scott briefly
discusses the history of Unicode and UTF-8
(9 minutes 36 seconds).

To help understand the standard, Jukka Korpela has written `an introductory
guide <https://jkorpela.fi/unicode/guide.html>`_ to reading the
Unicode character tables.

Another good introductory article
was written by Joel Spolsky.
If this introduction didn't make things clear to you, you should try
reading this alternate article before continuing.

Wikipedia entries are often helpful; see the entries for "`character encoding
<https://en.wikipedia.org/wiki/Character_encoding>`_" and `UTF-8
<https://en.wikipedia.org/wiki/UTF-8>`_, for example.
