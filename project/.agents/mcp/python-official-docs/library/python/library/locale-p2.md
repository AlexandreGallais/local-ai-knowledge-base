---
title: "locale --- Internationalization services (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/locale.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# locale --- Internationalization services (part 2 of 2)

### `getdefaultlocale([envvars])`

Tries to determine the default locale settings and returns them as a tuple of
the form `(language code, encoding)`.

According to POSIX, a program which has not called `setlocale(LC_ALL, '')`
runs using the portable `'C'` locale.  Calling `setlocale(LC_ALL, '')` lets
it use the default locale as defined by the `LANG` variable.  Since we
do not want to interfere with the current locale setting we thus emulate the
behavior in the way described above.

To maintain compatibility with other platforms, not only the `LANG`
variable is tested, but a list of variables given as envvars parameter.  The
first found to be defined will be used.  *envvars* defaults to the search
path used in GNU gettext; it must always contain the variable name
`'LANG'`.  The GNU gettext search path contains `'LC_ALL'`,
`'LC_CTYPE'`, `'LANG'` and `'LANGUAGE'`, in that order.

The language code has the same format as a locale name,
but without encoding and `@`-modifier.
The language code and encoding may be `None` if their values cannot be
determined.
The "C" locale is represented as `(None, None)`.

### `getlocale(category=LC_CTYPE)`

Returns the current setting for the given locale category as a tuple containing
the language code and encoding. *category* may be one of the `LC_*`
values except `LC_ALL`.  It defaults to `LC_CTYPE`.

The language code has the same format as a locale name,
but without encoding.
The language code and encoding may be `None` if their values cannot be
determined.
The "C" locale is represented as `(None, None)`.

> *Changed in version 3.15.*
> `@`-modifier are no longer silently removed, but included in
> the language code.

### `getpreferredencoding(do_setlocale=True)`

Return the locale encoding used for text data, according to user
preferences.  User preferences are expressed differently on different
systems, and might not be available programmatically on some systems, so
this function only returns a guess.

On some systems, it is necessary to invoke `setlocale()` to obtain the
user preferences, so this function is not thread-safe. If invoking setlocale
is not necessary or desired, *do_setlocale* should be set to `False`.

On Android or if the Python UTF-8 Mode is enabled, always
return `'utf-8'`, the locale encoding and the *do_setlocale*
argument are ignored.

The Python preinitialization configures the LC_CTYPE
locale. See also the filesystem encoding and error handler.

> *Changed in version 3.7.*
> The function now always returns `"utf-8"` on Android or if the
> Python UTF-8 Mode is enabled.

### `getencoding()`

Get the current locale encoding:

- On Android and VxWorks, return `"utf-8"`.
- On Unix, return the encoding of the current `LC_CTYPE` locale.
Return `"utf-8"` if `nl_langinfo(CODESET)` returns an empty string:
for example, if the current LC_CTYPE locale is not supported.
- On Windows, return the ANSI code page.

The Python preinitialization configures the LC_CTYPE
locale. See also the filesystem encoding and error handler.

This function is similar to
`getpreferredencoding(False)` except this
function ignores the Python UTF-8 Mode.

> *Added in version 3.11.*

### `normalize(localename)`

Returns a normalized locale code for the given locale name.  The returned locale
code is formatted for use with `setlocale()`.  If normalization fails, the
original name is returned unchanged.

If the given encoding is not known, the function defaults to the default
encoding for the locale code just like `setlocale()`.

### `strcoll(string1, string2)`

Compares two strings according to the current `LC_COLLATE` setting. As
any other compare function, returns a negative, or a positive value, or `0`,
depending on whether *string1* collates before or after *string2* or is equal to
it.

### `strxfrm(string)`

Transforms a string to one that can be used in locale-aware
comparisons.  For example, `strxfrm(s1) < strxfrm(s2)` is
equivalent to `strcoll(s1, s2) < 0`.  This function can be used
when the same string is compared repeatedly, e.g. when collating a
sequence of strings.

### `format_string(format, val, grouping=False, monetary=False)`

Formats a number *val* according to the current `LC_NUMERIC` setting.
The format follows the conventions of the `%` operator.  For floating-point
values, the decimal point is modified if appropriate.  If *grouping* is `True`,
also takes the grouping into account.

If *monetary* is true, the conversion uses monetary thousands separator and
grouping strings.

Processes formatting specifiers as in `format % val`, but takes the current
locale settings into account.

> *Changed in version 3.7.*
> The *monetary* keyword parameter was added.

### `currency(val, symbol=True, grouping=False, international=False)`

Formats a number *val* according to the current `LC_MONETARY` settings.

The returned string includes the currency symbol if *symbol* is true, which is
the default. If *grouping* is `True` (which is not the default), grouping is done
with the value. If *international* is `True` (which is not the default), the
international currency symbol is used.

> **Note:** This function will not work with the 'C' locale, so you have to set a
> locale via `setlocale()` first.

### `str(float)`

Formats a floating-point number using the same format as the built-in function
`str(float)`, but takes the decimal point into account.

### `delocalize(string)`

Converts a string into a normalized number string, following the
`LC_NUMERIC` settings.

> *Added in version 3.5.*

### `localize(string, grouping=False, monetary=False)`

Converts a normalized number string into a formatted string following the
`LC_NUMERIC` settings.

> *Added in version 3.10.*

### `atof(string, func=float)`

Converts a string to a number, following the `LC_NUMERIC` settings,
by calling *func* on the result of calling `delocalize()` on *string*.

### `atoi(string)`

Converts a string to an integer, following the `LC_NUMERIC` conventions.

### `LC_CTYPE`

Locale category for the character type functions.  Most importantly, this
category defines the text encoding, i.e. how bytes are interpreted as
Unicode codepoints.  See PEP 538 and PEP 540 for how this variable
might be automatically coerced to `C.UTF-8` to avoid issues created by
invalid settings in containers or incompatible settings passed over remote
SSH connections.

Python doesn't internally use locale-dependent character transformation functions
from `ctype.h`. Instead, `pyctype.h` provides locale-independent
equivalents like `Py_TOLOWER`.

### `LC_COLLATE`

Locale category for sorting strings.  The functions `strcoll()` and
`strxfrm()` of the `locale` module are affected.

### `LC_TIME`

Locale category for the formatting of time.  The function `time.strftime()`
follows these conventions.

### `LC_MONETARY`

Locale category for formatting of monetary values.  The available options are
available from the `localeconv()` function.

### `LC_MESSAGES`

Locale category for message display. Python currently does not support
application specific locale-aware messages.  Messages displayed by the operating
system, like those returned by `os.strerror()` might be affected by this
category.

This value may not be available on operating systems not conforming to the
POSIX standard, most notably Windows.

### `LC_NUMERIC`

Locale category for formatting numbers.  The functions `format_string()`,
`atoi()`, `atof()` and `.str()` of the `locale` module are
affected by that category.  All other numeric formatting operations are not
affected.

### `LC_ALL`

Combination of all locale settings.  If this flag is used when the locale is
changed, setting the locale for all categories is attempted. If that fails for
any category, no category is changed at all.  When the locale is retrieved using
this flag, a string indicating the setting for all categories is returned. This
string can be later used to restore the settings.

### `CHAR_MAX`

This is a symbolic constant used for different values returned by
`localeconv()`.

## Background, details, hints, tips and caveats

The C standard defines the locale as a program-wide property that may be
relatively expensive to change.  On top of that, some implementations are broken
in such a way that frequent locale changes may cause core dumps.  This makes the
locale somewhat painful to use correctly.

Initially, when a program is started, the locale is the `C` locale, no matter
what the user's preferred locale is.  There is one exception: the
`LC_CTYPE` category is changed at startup to set the current locale
encoding to the user's preferred locale encoding. The program must explicitly
say that it wants the user's preferred locale settings for other categories by
calling `setlocale(LC_ALL, '')`.

It is generally a bad idea to call `setlocale()` in some library routine,
since as a side effect it affects the entire program.  Saving and restoring it
is almost as bad: it is expensive and affects other threads that happen to run
before the settings have been restored.

If, when coding a module for general use, you need a locale independent version
of an operation that is affected by the locale (such as
certain formats used with `time.strftime()`), you will have to find a way to
do it without using the standard library routine.  Even better is convincing
yourself that using locale settings is okay.  Only as a last resort should you
document that your module is not compatible with non-`C` locale settings.

The only way to perform numeric operations according to the locale is to use the
special functions defined by this module: `atof()`, `atoi()`,
`format_string()`, `.str()`.

There is no way to perform case conversions and character classifications
according to the locale.  For (Unicode) text strings these are done according
to the character value only, while for byte strings, the conversions and
classifications are done according to the ASCII value of the byte, and bytes
whose high bit is set (i.e., non-ASCII bytes) are never converted or considered
part of a character class such as letter or whitespace.

## Locale names

The format of the locale name is platform dependent, and the set of supported
locales can depend on the system configuration.

On Posix platforms, it usually has the format:

```text
locale_name
: language ["_" territory] ["." charset] ["@" modifier]
```

where *language* is a two- or three-letter language code from ISO 639,
*territory* is a two-letter country or region code from ISO 3166,
*charset* is a locale encoding, and *modifier* is a script name,
a language subtag, a sort order identifier, or other locale modifier
(for example, "latin", "valencia", "stroke" and "euro").

On Windows, several formats are supported.
A subset of IETF BCP 47 tags:

```text
locale_name
: language ["-" script] ["-" territory] ["." charset]
: language ["-" script] "-" territory "-" modifier
```

where *language* and *territory* have the same meaning as in Posix,
*script* is a four-letter script code from ISO 15924,
and *modifier* is a language subtag, a sort order identifier
or custom modifier (for example, "valencia", "stroke" or "x-python").
Both hyphen (`'-'`) and underscore (`'_'`) separators are supported.
Only UTF-8 encoding is allowed for BCP 47 tags.

Windows also supports locale names in the format:

```text
locale_name
: language ["_" territory] ["." charset]
```

where *language* and *territory* are full names, such as "English" and
"United States", and *charset* is either a code page number (for example, "1252")
or UTF-8.
Only the underscore separator is supported in this format.

The "C" locale is supported on all platforms.

## For extension writers and programs that embed Python

Extension modules should never call `setlocale()`, except to find out what
the current locale is.  But since the return value can only be used portably to
restore it, that is not very useful (except perhaps to find out whether or not
the locale is `C`).

When Python code uses the `locale` module to change the locale, this also
affects the embedding application.  If the embedding application doesn't want
this to happen, it should remove the `_locale` extension module (which does
all the work) from the table of built-in modules in the `config.c` file,
and make sure that the `_locale` module is not accessible as a shared
library.

## Access to message catalogs

### `bind_textdomain_codeset(domain, codeset)`

The locale module exposes the C library's gettext interface on systems that
provide this interface.  It consists of the functions `gettext()`,
`dgettext()`, `dcgettext()`, `textdomain()`, `bindtextdomain()`,
and `bind_textdomain_codeset()`.  These are similar to the same functions in
the `gettext` module, but use the C library's binary format for message
catalogs, and the C library's search algorithms for locating message catalogs.

Python applications should normally find no need to invoke these functions, and
should use `gettext` instead.  A known exception to this rule are
applications that link with additional C libraries which internally invoke
C functions `gettext` or `dcgettext`.  For these applications, it may be
necessary to bind the text domain, so that the libraries can properly locate
their message catalogs.
