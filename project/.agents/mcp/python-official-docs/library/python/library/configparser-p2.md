---
title: "configparser --- Configuration file parser (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/configparser.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# configparser --- Configuration file parser (part 2 of 5)

## Mapping Protocol Access

> *Added in version 3.2.*

Mapping protocol access is a generic name for functionality that enables using
custom objects as if they were dictionaries.  In case of `configparser`,
the mapping interface implementation is using the
`parser'section'` notation.

`parser['section']` in particular returns a proxy for the section's data in
the parser.  This means that the values are not copied but they are taken from
the original parser on demand.  What's even more important is that when values
are changed on a section proxy, they are actually mutated in the original
parser.

`configparser` objects behave as close to actual dictionaries as possible.
The mapping interface is complete and adheres to the
`MutableMapping` ABC.
However, there are a few differences that should be taken into account:

- By default, all keys in sections are accessible in a case-insensitive manner
.  E.g. `for option in parser["section"]` yields only `optionxform`'ed
option key names.  This means lowercased keys by default.  At the same time,
for a section that holds the key `'a'`, both expressions return `True`:

```
"a" in parser["section"]
"A" in parser["section"]
```

- All sections include `DEFAULTSECT` values as well which means that
`.clear()` on a section may not leave the section visibly empty.  This is
because default values cannot be deleted from the section (because technically
they are not there).  If they are overridden in the section, deleting causes
the default value to be visible again.  Trying to delete a default value
causes a `KeyError`.

- `DEFAULTSECT` cannot be removed from the parser:

- trying to delete it raises `ValueError`,

- `parser.clear()` leaves it intact,

- `parser.popitem()` never returns it.

- `parser.get(section, option, **kwargs)` - the second argument is **not**
a fallback value.  Note however that the section-level `get()` methods are
compatible both with the mapping protocol and the classic configparser API.

- `parser.items()` is compatible with the mapping protocol (returns a list of
*section_name*, *section_proxy* pairs including the DEFAULTSECT).  However,
this method can also be invoked with arguments: ``parser.items(section, raw,
vars)``.  The latter call returns a list of *option*, *value* pairs for
a specified `section`, with all interpolations expanded (unless
`raw=True` is provided).

The mapping protocol is implemented on top of the existing legacy API so that
subclasses overriding the original interface still should have mappings working
as expected.

## Customizing Parser Behaviour

There are nearly as many INI format variants as there are applications using it.
`configparser` goes a long way to provide support for the largest sensible
set of INI styles available.  The default functionality is mainly dictated by
historical background and it's very likely that you will want to customize some
of the features.

The most common way to change the way a specific config parser works is to use
the `__init__()` options:

- *defaults*, default value: `None`

This option accepts a dictionary of key-value pairs which will be initially
put in the `DEFAULT` section.  This makes for an elegant way to support
concise configuration files that don't specify values which are the same as
the documented default.

Hint: if you want to specify default values for a specific section, use
`read_dict()` before you read the actual file.

- *dict_type*, default value: `dict`

This option has a major impact on how the mapping protocol will behave and how
the written configuration files look.  With the standard dictionary, every
section is stored in the order they were added to the parser.  Same goes for
options within sections.

An alternative dictionary type can be used for example to sort sections and
options on write-back.

Please note: there are ways to add a set of key-value pairs in a single
operation.  When you use a regular dictionary in those operations, the order
of the keys will be ordered.  For example:

```python

>>> parser = configparser.ConfigParser()
>>> parser.read_dict({'section1': {'key1': 'value1',
...                                'key2': 'value2',
...                                'key3': 'value3'},
...                   'section2': {'keyA': 'valueA',
...                                'keyB': 'valueB',
...                                'keyC': 'valueC'},
...                   'section3': {'foo': 'x',
...                                'bar': 'y',
...                                'baz': 'z'}
... })
>>> parser.sections()
['section1', 'section2', 'section3']
>>> [option for option in parser['section3']]
['foo', 'bar', 'baz']
```

- *allow_no_value*, default value: `False`

Some configuration files are known to include settings without values, but
which otherwise conform to the syntax supported by `configparser`.  The
*allow_no_value* parameter to the constructor can be used to
indicate that such values should be accepted:

```python

>>> import configparser

>>> sample_config = """
... [mysqld]
...   user = mysql
...   pid-file = /var/run/mysqld/mysqld.pid
...   skip-external-locking
...   old_passwords = 1
...   skip-bdb
...   # we don't need ACID today
...   skip-innodb
... """
>>> config = configparser.ConfigParser(allow_no_value=True)
>>> config.read_string(sample_config)

>>> # Settings with values are treated as before:
>>> config["mysqld"]["user"]
'mysql'

>>> # Settings without values provide None:
>>> config["mysqld"]["skip-bdb"]

>>> # Settings which aren't specified still raise an error:
>>> config["mysqld"]["does-not-exist"]
Traceback (most recent call last):
  ...
KeyError: 'does-not-exist'
```

- *delimiters*, default value: `('=', ':')`

Delimiters are substrings that delimit keys from values within a section.
The first occurrence of a delimiting substring on a line is considered
a delimiter.  This means values (but not keys) can contain the delimiters.

See also the *space_around_delimiters* argument to
`ConfigParser.write()`.

- *comment_prefixes*, default value: `('#', ';')`

- *inline_comment_prefixes*, default value: `None`

Comment prefixes are strings that indicate the start of a valid comment within
a config file. *comment_prefixes* are used only on otherwise empty lines
(optionally indented) whereas *inline_comment_prefixes* can be used after
every valid value (e.g. section names, options and empty lines as well).  By
default inline comments are disabled and `'#'` and `';'` are used as
prefixes for whole line comments.

> *Changed in version 3.2.*
> In previous versions of `configparser` behaviour matched
> `comment_prefixes=('#',';')` and `inline_comment_prefixes=(';',)`.

Please note that config parsers don't support escaping of comment prefixes so
using *inline_comment_prefixes* may prevent users from specifying option
values with characters used as comment prefixes.  When in doubt, avoid
setting *inline_comment_prefixes*.  In any circumstances, the only way of
storing comment prefix characters at the beginning of a line in multiline
values is to interpolate the prefix, for example:

```
>>> from configparser import ConfigParser, ExtendedInterpolation
>>> parser = ConfigParser(interpolation=ExtendedInterpolation())
>>> # the default BasicInterpolation could be used as well
>>> parser.read_string("""
... [DEFAULT]
... hash = #
...
... [hashes]
... shebang =
...   ${hash}!/usr/bin/env python
...   ${hash} -*- coding: utf-8 -*-
...
... extensions =
...   enabled_extension
...   another_extension
...   #disabled_by_comment
...   yet_another_extension
...
... interpolation not necessary = if # is not at line start
... even in multiline values = line #1
...   line #2
...   line #3
... """)
>>> print(parser['hashes']['shebang'])
<BLANKLINE>
#!/usr/bin/env python
# -*- coding: utf-8 -*-
>>> print(parser['hashes']['extensions'])
<BLANKLINE>
enabled_extension
another_extension
yet_another_extension
>>> print(parser['hashes']['interpolation not necessary'])
if # is not at line start
>>> print(parser['hashes']['even in multiline values'])
line #1
line #2
line #3
```

- *strict*, default value: `True`

When set to `True`, the parser will not allow for any section or option
duplicates while reading from a single source (using `read_file()`,
`read_string()` or `read_dict()`).  It is recommended to use strict
parsers in new applications.

> *Changed in version 3.2.*
> In previous versions of `configparser` behaviour matched
> `strict=False`.

- *empty_lines_in_values*, default value: `True`

In config parsers, values can span multiple lines as long as they are
indented more than the key that holds them.  By default parsers also let
empty lines to be parts of values.  At the same time, keys can be arbitrarily
indented themselves to improve readability.  In consequence, when
configuration files get big and complex, it is easy for the user to lose
track of the file structure.  Take for instance:

```ini
[Section]
key = <example-value>
  value with a gotcha

 this = is still a part of the multiline value of 'key'
```

This can be especially problematic for the user to see if she's using a
proportional font to edit the file.  That is why when your application does
not need values with empty lines, you should consider disallowing them.  This
will make empty lines split keys every time.  In the example above, it would
produce two keys, `key` and `this`.

- *default_section*, default value: `configparser.DEFAULTSECT` (that is:
`"DEFAULT"`)

The convention of allowing a special section of default values for other
sections or interpolation purposes is a powerful concept of this library,
letting users create complex declarative configurations.  This section is
normally called `"DEFAULT"` but this can be customized to point to any
other valid section name.  Some typical values include: `"general"` or
`"common"`.  The name provided is used for recognizing default sections
when reading from any source and is used when writing configuration back to
a file.  Its current value can be retrieved using the
`parser_instance.default_section` attribute and may be modified at runtime
(i.e. to convert files from one format to another).

- *interpolation*, default value: `configparser.BasicInterpolation`

Interpolation behaviour may be customized by providing a custom handler
through the *interpolation* argument. `None` can be used to turn off
interpolation completely, `ExtendedInterpolation()` provides a more
advanced variant inspired by `zc.buildout`.  More on the subject in the
dedicated documentation section.
`RawConfigParser` has a default value of `None`.

- *converters*, default value: not set

Config parsers provide option value getters that perform type conversion.  By
default `getint()`, `getfloat()`, and
`getboolean()` are implemented.  Should other getters be
desirable, users may define them in a subclass or pass a dictionary where each
key is a name of the converter and each value is a callable implementing said
conversion.  For instance, passing `{'decimal': decimal.Decimal}` would add
`getdecimal()` on both the parser object and all section proxies.  In
other words, it will be possible to write both
`parser_instance.getdecimal('section', 'key', fallback=0)` and
`parser_instance['section'].getdecimal('key', 0)`.

If the converter needs to access the state of the parser, it can be
implemented as a method on a config parser subclass.  If the name of this
method starts with `get`, it will be available on all section proxies, in
the dict-compatible form (see the `getdecimal()` example above).

More advanced customization may be achieved by overriding default values of
these parser attributes.  The defaults are defined on the classes, so they may
be overridden by subclasses or by attribute assignment.

### `ConfigParser.BOOLEAN_STATES`

By default when using `getboolean()`, config parsers
consider the following values `True`: `'1'`, `'yes'`, `'true'`,
`'on'` and the following values `False`: `'0'`, `'no'`, `'false'`,
`'off'`.  You can override this by specifying a custom dictionary of strings
and their Boolean outcomes. For example:

```python

>>> custom = configparser.ConfigParser()
>>> custom['section1'] = {'funky': 'nope'}
>>> custom['section1'].getboolean('funky')
Traceback (most recent call last):
...
ValueError: Not a boolean: nope
>>> custom.BOOLEAN_STATES = {'sure': True, 'nope': False}
>>> custom['section1'].getboolean('funky')
False
```

Other typical Boolean pairs include `accept`/`reject` or
`enabled`/`disabled`.

### `ConfigParser.optionxform(option)`

This method transforms option names on every read, get, or set
operation.  The default converts the name to lowercase.  This also
means that when a configuration file gets written, all keys will be
lowercase.  Override this method if that's unsuitable.
For example:

```python

>>> config = """
... [Section1]
... Key = Value
...
... [Section2]
... AnotherKey = Value
... """
>>> typical = configparser.ConfigParser()
>>> typical.read_string(config)
>>> list(typical['Section1'].keys())
['key']
>>> list(typical['Section2'].keys())
['anotherkey']
>>> custom = configparser.RawConfigParser()
>>> custom.optionxform = lambda option: option
>>> custom.read_string(config)
>>> list(custom['Section1'].keys())
['Key']
>>> list(custom['Section2'].keys())
['AnotherKey']
```

> **Note:** The optionxform function transforms option names to a canonical form.
> This should be an idempotent function: if the name is already in
> canonical form, it should be returned unchanged.

### `ConfigParser.SECTCRE`

A compiled regular expression used to parse section headers.  The default
matches `[section]` to the name `"section"`.  Whitespace is considered
part of the section name, thus `[  larch  ]` will be read as a section of
name `"  larch  "`.  Override this attribute if that's unsuitable.  For
example:

```python

>>> import re
>>> config = """
... [Section 1]
... option = value
...
... [  Section 2  ]
... another = val
... """
>>> typical = configparser.ConfigParser()
>>> typical.read_string(config)
>>> typical.sections()
['Section 1', '  Section 2  ']
>>> custom = configparser.ConfigParser()
>>> custom.SECTCRE = re.compile(r"\[ *(?P<header>[^]]+?) *\]")
>>> custom.read_string(config)
>>> custom.sections()
['Section 1', 'Section 2']
```

> **Note:** While ConfigParser objects also use an `OPTCRE` attribute for recognizing
> option lines, it's not recommended to override it because that would
> interfere with constructor options *allow_no_value* and *delimiters*.
