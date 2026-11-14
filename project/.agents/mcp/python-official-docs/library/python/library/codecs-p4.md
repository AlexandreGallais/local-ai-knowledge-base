---
title: "codecs --- Codec registry and base classes (part 4 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 4 of 8)

## Standard Encodings

Python comes with a number of codecs built-in, either implemented as C functions
or with dictionaries as mapping tables. The following table lists the codecs by
name, together with a few common aliases, and the languages for which the
encoding is likely used. Neither the list of aliases nor the list of languages
is meant to be exhaustive. Notice that spelling alternatives that only differ in
case or use a space or a hyphen instead of an underscore are also valid aliases
because they are equivalent when normalized by
`normalize_encoding()`. For example, `'utf-8'` is a valid
alias for the `'utf_8'` codec.

> **Note:** The below table lists the most common aliases, for a complete list
> refer to the source aliases.py file.

On Windows, `cpXXX` codecs are available for all code pages.
But only codecs listed in the following table are guaranteed to exist on
other platforms.

> **CPython implementation detail:** Some common encodings can bypass the codecs lookup machinery to
> improve performance. These optimization opportunities are only
> recognized by CPython for a limited set of (case insensitive)
> aliases: utf-8, utf8, latin-1, latin1, iso-8859-1, iso8859-1, mbcs
> (Windows only), ascii, us-ascii, utf-16, utf16, utf-32, utf32, and
> the same using underscores instead of dashes. Using alternative
> aliases for these encodings may result in slower execution.
>
>
> > *Changed in version 3.6.*
> > Optimization opportunity recognized for us-ascii.
>

Many of the character sets support the same languages. They vary in individual
characters (e.g. whether the EURO SIGN is supported or not), and in the
assignment of characters to code positions. For the European languages in
particular, the following variants typically exist:

- an ISO 8859 codeset

- a Microsoft Windows code page, which is typically derived from an 8859 codeset,
but replaces control characters with additional graphic characters

- an IBM EBCDIC code page

- an IBM PC code page, which is ASCII compatible
