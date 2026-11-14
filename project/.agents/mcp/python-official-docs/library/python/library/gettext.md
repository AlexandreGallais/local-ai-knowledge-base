---
title: "gettext --- Multilingual internationalization services (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/gettext.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `gettext` --- Multilingual internationalization services

Module `gettext`.

**Source code:** Lib/gettext.py

The `gettext` module provides internationalization (I18N) and localization
(L10N) services for your Python modules and applications. It supports both the
GNU `gettext` message catalog API and a higher level, class-based API that may
be more appropriate for Python files.  The interface described below allows you
to write your module and application messages in one natural language, and
provide a catalog of translated messages for running under different natural
languages.

Some hints on localizing your Python modules and applications are also given.

## GNU `gettext` API

The `gettext` module defines the following API, which is very similar to
the GNU `gettext` API.  If you use this API you will affect the
translation of your entire application globally.  Often this is what you want if
your application is monolingual, with the choice of language dependent on the
locale of your user.  If you are localizing a Python module, or if your
application needs to switch languages on the fly, you probably want to use the
class-based API instead.

### `bindtextdomain(domain, localedir=None)`

Bind the *domain* to the locale directory *localedir*.  More concretely,
`gettext` will look for binary `.mo` files for the given domain using
the path (on Unix): `{localedir}/{language}/LC_MESSAGES/{domain}.mo`, where
*language* is searched for in the environment variables `LANGUAGE`,
`LC_ALL`, `LC_MESSAGES`, and `LANG` respectively.

If *localedir* is omitted or `None`, then the current binding for *domain* is
returned.

### `textdomain(domain=None)`

Change or query the current global domain.  If *domain* is `None`, then the
current global domain is returned, otherwise the global domain is set to
*domain*, which is returned.

### `gettext(message, /)`

Return the localized translation of *message*, based on the current global
domain, language, and locale directory.  This function is usually aliased as
`_()` in the local namespace (see examples below).

### `dgettext(domain, message, /)`

Like `.gettext()`, but look the message up in the specified *domain*.

### `ngettext(singular, plural, n, /)`

Like `.gettext()`, but consider plural forms. If a translation is found,
apply the plural formula to *n*, and return the resulting message (some
languages have more than two plural forms). If no translation is found, return
*singular* if *n* is 1; return *plural* otherwise.

The Plural formula is taken from the catalog header. It is a C or Python
expression that has a free variable *n*; the expression evaluates to the index
of the plural in the catalog. See
the GNU gettext documentation
for the precise syntax to be used in `.po` files and the
formulas for a variety of languages.

### `dngettext(domain, singular, plural, n, /)`

Like `ngettext()`, but look the message up in the specified *domain*.

### `dnpgettext(domain, context, singular, plural, n, /)`

Similar to the corresponding functions without the `p` in the prefix (that
is, `gettext()`, `dgettext()`, `ngettext()`, `dngettext()`),
but the translation is restricted to the given message *context*.

> *Added in version 3.8.*

Note that GNU `gettext` also defines a `dcgettext()` method, but
this was deemed not useful and so it is currently unimplemented.

Here's an example of typical usage for this API:

```
import gettext
gettext.bindtextdomain('myapplication', '/path/to/my/language/directory')
gettext.textdomain('myapplication')
_ = gettext.gettext
# ...
print(_('This is a translatable string.'))
```

## Class-based API

The class-based API of the `gettext` module gives you more flexibility and
greater convenience than the GNU `gettext` API.  It is the recommended
way of localizing your Python applications and modules.  `gettext` defines
a `GNUTranslations` class which implements the parsing of GNU `.mo` format
files, and has methods for returning strings. Instances of this class can also
install themselves in the built-in namespace as the function `_()`.

### `find(domain, localedir=None, languages=None, all=False)`

This function implements the standard `.mo` file search algorithm.  It
takes a *domain*, identical to what `textdomain()` takes.  Optional
*localedir* is as in `bindtextdomain()`. Optional *languages* is a list of
strings, where each string is a language code.

If *localedir* is not given, then the default system locale directory is used.
  If *languages* is not given, then the following environment variables are
searched: `LANGUAGE`, `LC_ALL`, `LC_MESSAGES`, and
`LANG`.  The first one returning a non-empty value is used for the
*languages* variable. The environment variables should contain a colon separated
list of languages, which will be split on the colon to produce the expected list
of language code strings.

`find()` then expands and normalizes the languages, and then iterates
through them, searching for an existing file built of these components:

`{localedir}/{language}/LC_MESSAGES/{domain}.mo`

The first such file name that exists is returned by `find()`. If no such
file is found, then `None` is returned. If *all* is given, it returns a list
of all file names, in the order in which they appear in the languages list or
the environment variables.

### `translation(domain, localedir=None, languages=None, class_=None, fallback=False)`

Return a `*Translations` instance based on the *domain*, *localedir*,
and *languages*, which are first passed to `find()` to get a list of the
associated `.mo` file paths.  Instances with identical `.mo` file
names are cached.  The actual class instantiated is *class_* if
provided, otherwise `GNUTranslations`.  The class's constructor must
take a single file object argument.

If multiple files are found, later files are used as fallbacks for earlier ones.
To allow setting the fallback, `copy.copy()` is used to clone each
translation object from the cache; the actual instance data is still shared with
the cache.

If no `.mo` file is found, this function raises `OSError` if
*fallback* is false (which is the default), and returns a
`NullTranslations` instance if *fallback* is true.

> *Changed in version 3.3.*
> `IOError` used to be raised, it is now an alias of `OSError`.

> *Changed in version 3.11.*
> *codeset* parameter is removed.

### `install(domain, localedir=None, *, names=None)`

This installs the function `_()` in Python's builtins namespace, based on
*domain* and *localedir* which are passed to the function `translation()`.

For the *names* parameter, please see the description of the translation
object's `install()` method.

As seen below, you usually mark the strings in your application that are
candidates for translation, by wrapping them in a call to the `_()`
function, like this:

```
print(_('This string will be translated.'))
```

For convenience, you want the `_()` function to be installed in Python's
builtins namespace, so it is easily accessible in all modules of your
application.

> *Changed in version 3.11.*
> *names* is now a keyword-only parameter.

### The `NullTranslations` class

Translation classes are what actually implement the translation of original
source file message strings to translated message strings. The base class used
by all translation classes is `NullTranslations`; this provides the basic
interface you can use to write your own specialized translation classes.  Here
are the methods of `NullTranslations`:

### class `NullTranslations(fp=None)`

Takes an optional file object *fp*, which is ignored by the base class.
Initializes "protected" instance variables *_info* and *_charset* which are set
by derived classes, as well as *_fallback*, which is set through
`add_fallback()`.  It then calls `self._parse(fp)` if *fp* is not
`None`.

### `_parse(fp)`

No-op in the base class, this method takes file object *fp*, and reads
the data from the file, initializing its message catalog.  If you have an
unsupported message catalog file format, you should override this method
to parse your format.

### `add_fallback(fallback)`

Add *fallback* as the fallback object for the current translation object.
A translation object should consult the fallback if it cannot provide a
translation for a given message.

### `gettext(message, /)`

If a fallback has been set, forward `gettext()` to the fallback.
Otherwise, return *message*.  Overridden in derived classes.

### `ngettext(singular, plural, n, /)`

If a fallback has been set, forward `ngettext()` to the fallback.
Otherwise, return *singular* if *n* is 1; return *plural* otherwise.
Overridden in derived classes.

### `pgettext(context, message, /)`

If a fallback has been set, forward `pgettext()` to the fallback.
Otherwise, return the translated message.  Overridden in derived classes.

> *Added in version 3.8.*

### `npgettext(context, singular, plural, n, /)`

If a fallback has been set, forward `npgettext()` to the fallback.
Otherwise, return the translated message.  Overridden in derived classes.

> *Added in version 3.8.*

### `info()`

Return a dictionary containing
the metadata found in the message catalog file.

### `charset()`

Return the encoding of the message catalog file.

### `install(names=None)`

This method installs `.gettext()` into the built-in namespace,
binding it to `_`.

If the *names* parameter is given, it must be a sequence containing the
names of functions you want to install in the builtins namespace in
addition to `_()`.  Supported names are `'gettext'`, `'ngettext'`,
`'pgettext'`, and `'npgettext'`.

Note that this is only one way, albeit the most convenient way, to make
the `_()` function available to your application.  Because it affects
the entire application globally, and specifically the built-in namespace,
localized modules should never install `_()`. Instead, they should use
this code to make `_()` available to their module:

```
import gettext
t = gettext.translation('mymodule', ...)
_ = t.gettext
```

This puts `_()` only in the module's global namespace and so only
affects calls within this module.

> *Changed in version 3.8.*
> Added `'pgettext'` and `'npgettext'`.

### The `GNUTranslations` class

The `gettext` module provides one additional class derived from
`NullTranslations`: `GNUTranslations`.  This class overrides
`_parse()` to enable reading GNU `gettext` format `.mo` files
in both big-endian and little-endian format.

`GNUTranslations` parses optional metadata out of the translation
catalog. It is convention with GNU `gettext` to include metadata as
the translation for the empty string. This metadata is in RFC 822-style
`key: value` pairs, and should contain the `Project-Id-Version` key.  If the
key `Content-Type` is found, then the `charset` property is used to
initialize the "protected" `_charset` instance variable, defaulting to
`None` if not found.  If the charset encoding is specified, then all message
ids and message strings read from the catalog are converted to Unicode using
this encoding, else ASCII is assumed.

Since message ids are read as Unicode strings too, all `*gettext()` methods
will assume message ids as Unicode strings, not byte strings.

The entire set of key/value pairs are placed into a dictionary and set as the
"protected" `_info` instance variable.

If the `.mo` file's magic number is invalid, the major version number is
unexpected, or if other problems occur while reading the file, instantiating a
`GNUTranslations` class can raise `OSError`.

### class `GNUTranslations`

The following methods are overridden from the base class implementation:

### `gettext(message, /)`

Look up the *message* id in the catalog and return the corresponding message
string, as a Unicode string.  If there is no entry in the catalog for the
*message* id, and a fallback has been set, the look up is forwarded to the
fallback's `gettext()` method.  Otherwise, the
*message* id is returned.

### `ngettext(singular, plural, n, /)`

Do a plural-forms lookup of a message id.  *singular* is used as the message id
for purposes of lookup in the catalog, while *n* is used to determine which
plural form to use.  The returned message string is a Unicode string.

If the message id is not found in the catalog, and a fallback is specified,
the request is forwarded to the fallback's `ngettext()`
method.  Otherwise, when *n* is 1 *singular* is returned, and *plural* is
returned in all other cases.

Here is an example:

```
n = len(os.listdir('.'))
cat = GNUTranslations(somefile)
message = cat.ngettext(
    'There is %(num)d file in this directory',
    'There are %(num)d files in this directory',
    n) % {'num': n}
```

### `pgettext(context, message, /)`

Look up the *context* and *message* id in the catalog and return the
corresponding message string, as a Unicode string.  If there is no
entry in the catalog for the *message* id and *context*, and a fallback
has been set, the look up is forwarded to the fallback's
`pgettext()` method.  Otherwise, the *message* id is returned.

> *Added in version 3.8.*

### `npgettext(context, singular, plural, n, /)`

Do a plural-forms lookup of a message id.  *singular* is used as the
message id for purposes of lookup in the catalog, while *n* is used to
determine which plural form to use.

If the message id for *context* is not found in the catalog, and a
fallback is specified, the request is forwarded to the fallback's
`npgettext()` method.  Otherwise, when *n* is 1 *singular* is
returned, and *plural* is returned in all other cases.

> *Added in version 3.8.*

### Solaris message catalog support

The Solaris operating system defines its own binary `.mo` file format, but
since no documentation can be found on this format, it is not supported at this
time.

### The Catalog constructor

GNOME uses a version of the `gettext` module by James Henstridge, but this
version has a slightly different API.  Its documented usage was:

```
import gettext
cat = gettext.Catalog(domain, localedir)
_ = cat.gettext
print(_('hello world'))
```

For compatibility with this older module, the function `Catalog()` is an
alias for the `translation()` function described above.

One difference between this module and Henstridge's: his catalog objects
supported access through a mapping API, but this appears to be unused and so is
not currently supported.
