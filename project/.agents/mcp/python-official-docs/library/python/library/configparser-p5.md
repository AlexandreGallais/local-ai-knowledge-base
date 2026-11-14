---
title: "configparser --- Configuration file parser (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/configparser.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# configparser --- Configuration file parser (part 5 of 5)

## RawConfigParser Objects

### class `RawConfigParser(defaults=None, dict_type=dict, \`

```python
allow_no_value=False, *, delimiters=('=', ':'), \
comment_prefixes=('#', ';'), \
inline_comment_prefixes=None, strict=True, \
empty_lines_in_values=True, \
default_section=configparser.DEFAULTSECT, \
interpolation=BasicInterpolation(), converters={}, \
allow_unnamed_section=False)
```

Legacy variant of the `ConfigParser`.  It has interpolation
disabled by default and allows for non-string section names, option
names, and values via its unsafe `add_section` and `set` methods,
as well as the legacy `defaults=` keyword argument handling.

> *Changed in version 3.2.*
> *allow_no_value*, *delimiters*, *comment_prefixes*, *strict*,
> *empty_lines_in_values*, *default_section* and *interpolation* were
> added.

> *Changed in version 3.5.*
> The *converters* argument was added.

> *Changed in version 3.8.*
> The default *dict_type* is `dict`, since it now preserves
> insertion order.

> *Changed in version 3.13.*
> The *allow_unnamed_section* argument was added.

> **Note:** Consider using `ConfigParser` instead which checks types of
> the values to be stored internally.  If you don't want interpolation, you
> can use `ConfigParser(interpolation=None)`.

### `add_section(section)`

Add a section named *section* or `UNNAMED_SECTION` to the instance.

If the given section already exists, `DuplicateSectionError` is
raised. If the *default section* name is passed, `ValueError` is
raised. If `UNNAMED_SECTION` is passed and support is disabled,
`UnnamedSectionDisabledError` is raised.

Type of *section* is not checked which lets users create non-string named
sections.  This behaviour is unsupported and may cause internal errors.

> *Changed in version 3.14.*
> Added support for `UNNAMED_SECTION`.

### `set(section, option, value)`

If the given section exists, set the given option to the specified value;
otherwise raise `NoSectionError`.  While it is possible to use
`RawConfigParser` (or `ConfigParser` with *raw* parameters
set to true) for *internal* storage of non-string values, full
functionality (including interpolation and output to files) can only be
achieved using string values.

This method lets users assign non-string values to keys internally.  This
behaviour is unsupported and will cause errors when attempting to write
to a file or get it in non-raw mode.  **Use the mapping protocol API**
which does not allow such assignments to take place.

## Exceptions

### exception `Error`

Base class for all other `configparser` exceptions.

### exception `NoSectionError`

Exception raised when a specified section is not found.

### exception `DuplicateSectionError`

Exception raised if `add_section()` is called with the name of a section
that is already present or in strict parsers when a section if found more
than once in a single input file, string or dictionary.

> *Changed in version 3.2.*
> Added the optional *source* and *lineno* attributes and parameters to
> `__init__()`.

### exception `DuplicateOptionError`

Exception raised by strict parsers if a single option appears twice during
reading from a single file, string or dictionary. This catches misspellings
and case sensitivity-related errors, e.g. a dictionary may have two keys
representing the same case-insensitive configuration key.

### exception `NoOptionError`

Exception raised when a specified option is not found in the specified
section.

### exception `InterpolationError`

Base class for exceptions raised when problems occur performing string
interpolation.

### exception `InterpolationDepthError`

Exception raised when string interpolation cannot be completed because the
number of iterations exceeds `MAX_INTERPOLATION_DEPTH`.  Subclass of
`InterpolationError`.

### exception `InterpolationMissingOptionError`

Exception raised when an option referenced from a value does not exist.
Subclass of `InterpolationError`.

### exception `InterpolationSyntaxError`

Exception raised when the source text into which substitutions are made does
not conform to the required syntax.  Subclass of `InterpolationError`.

### exception `MissingSectionHeaderError`

Exception raised when attempting to parse a file which has no section
headers.

### exception `ParsingError`

Exception raised when errors occur attempting to parse a file.

> *Changed in version 3.12.*
> The `filename` attribute and `__init__()` constructor argument were
> removed.  They have been available using the name `source` since 3.2.

### exception `MultilineContinuationError`

Exception raised when a key <example-value> a corresponding value is continued with
an indented line.

> *Added in version 3.13.*

### exception `UnnamedSectionDisabledError`

Exception raised when attempting to use the
`UNNAMED_SECTION` without enabling it.

> *Added in version 3.14.*

### exception `InvalidWriteError`

Exception raised when an attempted `ConfigParser.write()` would not be parsed
accurately with a future `ConfigParser.read()` call.

Ex: Writing a key <example-value> with the `ConfigParser.SECTCRE` pattern
would parse as a section header when read. Attempting to write this will raise
this exception.

> *Added in version 3.14.*

**Footnotes**
