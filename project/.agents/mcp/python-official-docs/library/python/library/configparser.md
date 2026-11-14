---
title: "configparser --- Configuration file parser (part 1 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/configparser.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `configparser` --- Configuration file parser

Module `configparser`.

**Source code:** Lib/configparser.py

This module provides the `ConfigParser` class which implements a basic
configuration language which provides a structure similar to what's found in
Microsoft Windows INI files.  You can use this to write Python programs which
can be customized by end users easily.

> **Note:** This library does *not* interpret or write the value-type prefixes used in
> the Windows Registry extended version of INI syntax.

> **Warning:** Be cautious when parsing data from untrusted sources. A malicious
> INI file may cause the decoder to consume considerable CPU and memory
> resources. Limiting the size of data to be parsed is recommended.

> **See also:** Module `tomllib`
> TOML is a well-specified format for application configuration files.
> It is specifically designed to be an improved version of INI.
>
> Module `shlex`
> Support for creating Unix shell-like mini-languages which can also
> be used for application configuration files.
>
> Module `json`
> The `json` module implements a subset of JavaScript syntax which is
> sometimes used for configuration, but does not support comments.

## Quick Start

Let's take a very basic <example-value> file that looks like this:

```ini
[DEFAULT]
ServerAliveInterval = 45
Compression = yes
CompressionLevel = 9
ForwardX11 = yes

[forge.example]
User = hg

[topsecret.server.example]
Port = 50022
ForwardX11 = no
```

The structure of INI files is described `in the following section
<#supported-ini-file-structure>`_.  Essentially, the file
consists of sections, each of which contains keys with values.
`configparser` classes can read and write such files.  Let's start by
creating the above configuration file programmatically.

```python

>>> import configparser
>>> config = configparser.ConfigParser()
>>> config['DEFAULT'] = {'ServerAliveInterval': '45',
...                      'Compression': 'yes',
...                      'CompressionLevel': '9'}
>>> config['forge.example'] = {}
>>> config['forge.example']['User'] = 'hg'
>>> config['<example-value>'] = {}
>>> topsecret = <example-value>['<example-value>']
>>> topsecret['<example-value>'] = '<example-value>'     # mutates the parser
>>> topsecret['<example-value>'] = '<example-value>'  # same here
>>> config['DEFAULT']['ForwardX11'] = 'yes'
>>> with open('example.ini', 'w') as configfile:
...   config.write(configfile)
...
```

As you can see, we can treat a config parser much like a dictionary.
There are differences, outlined later, but
the behavior is very close to what you would expect from a dictionary.

Now that we have created and saved a configuration file, let's read it
back and explore the data it holds.

```python

>>> config = configparser.ConfigParser()
>>> config.sections()
[]
>>> config.read('example.ini')
['example.ini']
>>> config.sections()
['<example-value>', '<example-value>']
>>> 'forge.example' in config
True
>>> 'python.org' in config
False
>>> config['forge.example']['User']
'hg'
>>> config['DEFAULT']['Compression']
'yes'
>>> topsecret = <example-value>['<example-value>']
>>> topsecret['<example-value>']
'no'
>>> topsecret['<example-value>']
'50022'
>>> for key in config['forge.example']:  # doctest: +SKIP
...     print(key)
user
compressionlevel
serveraliveinterval
compression
forwardx11
>>> config['forge.example']['ForwardX11']
'yes'
```

As we can see above, the API is pretty straightforward.  The only bit of magic
involves the `DEFAULT` section which provides default values for all other
sections.  Note also that keys in sections are
case-insensitive and stored in lowercase.

It is possible to read several configurations into a single
`ConfigParser`, where the most recently added configuration has the
highest priority. Any conflicting keys are taken from the more recent
configuration while the previously existing keys are retained. The example
below reads in an `override.ini` file, which will override any conflicting
keys from the `example.ini` file.

```ini
[DEFAULT]
ServerAliveInterval = -1
```

```python

>>> config_override = configparser.ConfigParser()
>>> config_override['DEFAULT'] = {'ServerAliveInterval': '-1'}
>>> with open('override.ini', 'w') as configfile:
...     config_override.write(configfile)
...
>>> config_override = configparser.ConfigParser()
>>> config_override.read(['example.ini', 'override.ini'])
['example.ini', 'override.ini']
>>> print(config_override.get('DEFAULT', 'ServerAliveInterval'))
-1
```

This behaviour is equivalent to a `ConfigParser.read()` call with several
files passed to the *filenames* parameter.

## Supported Datatypes

Config parsers do not guess datatypes of values in configuration files, always
storing them internally as strings.  This means that if you need other
datatypes, you should convert on your own:

```python

>>> int(topsecret['<example-value>'])
50022
>>> float(topsecret['<example-value>'])
9.0
```

Since this task is so common, config parsers provide a range of handy getter
methods to handle integers, floats and booleans.  The last one is the most
interesting because simply passing the value to `bool()` would do no good
since `bool('False')` is still `True`.  This is why config parsers also
provide `getboolean()`.  This method is case-insensitive and
recognizes Boolean values from `'yes'`/`'no'`, `'on'`/`'off'`,
`'true'`/`'false'` and `'1'`/`'0'`.  For example:

```python

>>> topsecret.getboolean('<example-value>')
False
>>> config['forge.example'].getboolean('ForwardX11')
True
>>> config.getboolean('forge.example', 'Compression')
True
```

Apart from `getboolean()`, config parsers also
provide equivalent `getint()` and
`getfloat()` methods.  You can register your own
converters and customize the provided ones.

## Fallback Values

As with a dictionary, you can use a section's `get()` method to
provide fallback values:

```python

>>> topsecret.get('<example-value>')
'50022'
>>> topsecret.get('<example-value>')
'9'
>>> topsecret.get('<example-value>')
>>> topsecret.get('<example-value>', '<example-value>')
'3des-cbc'
```

Please note that default values have precedence over fallback values.
For instance, in our example the `'CompressionLevel'` key was
specified only in the `'DEFAULT'` section.  If we try to get it from
the section `'<example-value>'`, we will always get the default,
even if we specify a fallback:

```python

>>> topsecret.get('<example-value>', '<example-value>')
'9'
```

One more thing to be aware of is that the parser-level `get()` method
provides a custom, more complex interface, maintained for backwards
compatibility.  When using this method, a fallback value can be provided via
the `fallback` keyword-only argument:

```python

>>> config.get('forge.example', 'monster',
...            fallback='No such things as monsters')
'No such things as monsters'
```

The same `fallback` argument can be used with the
`getint()`, `getfloat()` and
`getboolean()` methods, for example:

```python

>>> '<example-value>' in topsecret
False
>>> topsecret.getboolean('<example-value>', fallback=True)
True
>>> config['DEFAULT']['BatchMode'] = 'no'
>>> topsecret.getboolean('<example-value>', fallback=True)
False
```

## Supported INI File Structure

A configuration file consists of sections, each led by a `[section]` header,
followed by key/value entries separated by a specific string (`=` or `:` by
default).  By default, section names are case sensitive but keys are not
.  Leading and trailing whitespace is removed from keys and values.
Values can be omitted if the parser is configured to allow it,
in which case the key/value delimiter may also be left
out.  Values can also span multiple lines, as long as they are indented deeper
than the first line of the value.  Depending on the parser's mode, blank lines
may be treated as parts of multiline values or ignored.

By default, a valid section name can be any string that does not contain '\n'.
To change this, see `ConfigParser.SECTCRE`.

The first section name may be omitted if the parser is configured to allow an
unnamed top level section with `allow_unnamed_section=True`. In this case,
the keys/values may be retrieved by `UNNAMED_SECTION` as in
`config[UNNAMED_SECTION]`.

Configuration files may include comments, prefixed by specific
characters (`#` and `;` by default).  Comments may appear on
their own on an otherwise empty line, possibly indented.

For example:

```ini
[Simple Values]
key=value
spaces in keys=allowed
spaces in values=allowed as well
spaces around the delimiter = obviously
you can also use : to delimit keys from values

[All Values Are Strings]
values like this: 1000000
or this: 3.14159265359
are they treated as numbers? : no
integers, floats and booleans are held as: strings
can use the API to get converted values directly: true

[Multiline Values]
chorus: I'm a lumberjack, and I'm okay
    I sleep all night and I work all day

[No Values]
key_without_value
empty string value here =

[You can use comments]
# like this
; or this

# By default only in an empty line.
# Inline comments can be harmful because they prevent users
# from using the delimiting characters as parts of values.
# That being said, this can be customized.

    [Sections Can Be Indented]
        can_values_be_as_well = True
        does_that_mean_anything_special = False
        purpose = formatting for readability
        multiline_values = are
            handled just fine as
            long as they are indented
            deeper than the first line
            of a value
        # Did I mention we can indent comments, too?
```

## Unnamed Sections

The name of the first section (or unique) may be omitted and values
retrieved by the `UNNAMED_SECTION` attribute.

```python

>>> config = """
... option = value
...
... [  Section 2  ]
... another = val
... """
>>> unnamed = configparser.ConfigParser(allow_unnamed_section=True)
>>> unnamed.read_string(config)
>>> unnamed.get(configparser.UNNAMED_SECTION, 'option')
'value'
```

## Interpolation of values

On top of the core functionality, `ConfigParser` supports
interpolation.  This means values can be preprocessed before returning them
from `get()` calls.

### class `BasicInterpolation()`

The default implementation used by `ConfigParser`.  It enables
values to contain format strings which refer to other values in the same
section, or values in the special default section.  Additional default
values can be provided on initialization.

For example:

```ini
[Paths]
home_dir: /Users
my_dir: %(home_dir)s/lumberjack
my_pictures: %(my_dir)s/Pictures

[Escape]
# use a %% to escape the % sign (% is the only character that needs to be escaped):
gain: 80%%
```

In the example above, `ConfigParser` with *interpolation* set to
`BasicInterpolation()` would resolve `%(home_dir)s` to the value of
`home_dir` (`/Users` in this case).  `%(my_dir)s` in effect would
resolve to `/Users/lumberjack`.  All interpolations are done on demand so
keys used in the chain of references do not have to be specified in any
specific order in the configuration file.

With `interpolation` set to `None`, the parser would simply return
`%(my_dir)s/Pictures` as the value of `my_pictures` and
`%(home_dir)s/lumberjack` as the value of `my_dir`.

### class `ExtendedInterpolation()`

An alternative handler for interpolation which implements a more advanced
syntax, used for instance in `zc.buildout`.  Extended interpolation is
using `${section:option}` to denote a value from a foreign section.
Interpolation can span multiple levels.  For convenience, if the
`section:` part is omitted, interpolation defaults to the current section
(and possibly the default values from the special section).

For example, the configuration specified above with basic <example-value>,
would look like this with extended interpolation:

```ini
[Paths]
home_dir: /Users
my_dir: ${home_dir}/lumberjack
my_pictures: ${my_dir}/Pictures

[Escape]
# use a $$ to escape the $ sign ($ is the only character that needs to be escaped):
cost: $$80
```

Values from other sections can be fetched as well:

```ini
[Common]
home_dir: /Users
library_dir: /Library
system_dir: /System
macports_dir: /opt/local

[Frameworks]
Python: 3.2
path: ${Common:system_dir}/Library/Frameworks/

[Arthur]
nickname: Two Sheds
last_name: Jackson
my_dir: ${Common:home_dir}/twosheds
my_pictures: ${my_dir}/Pictures
python_dir: ${Frameworks:path}/Python/Versions/${Frameworks:Python}
```
