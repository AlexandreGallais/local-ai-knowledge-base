---
title: "argparse --- Parser for command-line options, arguments and subcommands (part 2 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# argparse --- Parser for command-line options, arguments and subcommands (part 2 of 8)

## ArgumentParser objects

### class `ArgumentParser(prog=None, usage=None, description=None, \`

```python
epilog=None, parents=[], \
formatter_class=argparse.HelpFormatter, \
prefix_chars='-', fromfile_prefix_chars=None, \
argument_default=None, conflict_handler='error', \
add_help=True, allow_abbrev=True, exit_on_error=True, \
*, suggest_on_error=True, color=True)
```

Create a new `ArgumentParser` object. All parameters should be passed
as keyword arguments. Each parameter has its own more detailed description
below, but in short they are:

- prog_ - The name of the program (default: generated from the `__main__`
module attributes and `sys.argv[0]`)

- usage_ - The string describing the program usage (default: generated from
arguments added to parser)

- description_ - Text to display before the argument help
(by default, no text)

- epilog_ - Text to display after the argument help (by default, no text)

- parents_ - A list of `ArgumentParser` objects whose arguments should
also be included

- formatter_class_ - A class for customizing the help output

- prefix_chars_ - The set of characters that prefix optional arguments
(default: '-')

- fromfile_prefix_chars_ - The set of characters that prefix files from
which additional arguments should be read (default: `None`)

- argument_default_ - The global default value for arguments
(default: `None`)

- conflict_handler_ - The strategy for resolving conflicting optionals
(usually unnecessary)

- add_help_ - Add a `-h/--help` option to the parser (default: `True`)

- allow_abbrev_ - Allows long options to be abbreviated if the
abbreviation is unambiguous (default: `True`)

- exit_on_error_ - Determines whether or not `ArgumentParser` exits with
error info when an error occurs. (default: `True`)

- suggest_on_error_ - Enables suggestions for mistyped argument choices
and subparser names (default: `True`)

- color_ - Allow color output (default: `True`)

> *Changed in version 3.5.*
> *allow_abbrev* parameter was added.

> *Changed in version 3.8.*
> In previous versions, *allow_abbrev* also disabled grouping of short
> flags such as `-vv` to mean `-v -v`.

> *Changed in version 3.9.*
> *exit_on_error* parameter was added.

> *Changed in version 3.14.*
> *suggest_on_error* and *color* parameters were added.

> *Changed in version 3.15.*
> *suggest_on_error* default changed to `True`.

The following sections describe how each of these are used.

### prog

By default, `ArgumentParser` calculates the name of the program
to display in help messages depending on the way the Python interpreter was run:

- The `base name()` of `sys.argv[0]` if a file was
passed as argument.
- The Python interpreter name followed by `sys.argv[0]` if a directory or
a zipfile was passed as argument.
- The Python interpreter name followed by `-m` followed by the
module or package name if the `-m` option was used.

This default is almost always desirable because it will make the help messages
match the string that was used to invoke the program on the command line.
However, to change this default behavior, another value can be supplied using
the `prog=` argument to `ArgumentParser`:

```
>>> parser = argparse.ArgumentParser(prog='myprogram')
>>> parser.print_help()
usage: myprogram [-h]

options:
 -h, --help  show this help message and exit
```

Note that the program name, whether determined from `sys.argv[0]`,
from the `__main__` module attributes or from the
`prog=` argument, is available to help messages using the `%(prog)s` format
specifier.

```
>>> parser = argparse.ArgumentParser(prog='myprogram')
>>> parser.add_argument('--foo', help='foo of the %(prog)s program')
>>> parser.print_help()
usage: myprogram [-h] [--foo FOO]

options:
 -h, --help  show this help message and exit
 --foo FOO   foo of the myprogram program
```

> *Changed in version 3.14.*
> The default `prog` value now reflects how `__main__` was actually executed,
> rather than always being `os.path.basename(sys.argv[0])`.

### usage

By default, `ArgumentParser` calculates the usage message from the
arguments it contains. The default message can be overridden with the
`usage=` keyword argument:

```
>>> parser = argparse.ArgumentParser(prog='PROG', usage='%(prog)s [options]')
>>> parser.add_argument('--foo', nargs='?', help='foo help')
>>> parser.add_argument('bar', nargs='+', help='bar help')
>>> parser.print_help()
usage: PROG [options]

positional arguments:
 bar          bar help

options:
 -h, --help   show this help message and exit
 --foo [FOO]  foo help
```

The `%(prog)s` format specifier is available to fill in the program name in
your usage messages.

When a custom usage message is specified for the main parser, you may also want to
consider passing  the `prog` argument to `add_subparsers()`
or the `prog` and the `usage` arguments to
`add_parser()`, to ensure consistent command prefixes and
usage information across subparsers.

### description

Most calls to the `ArgumentParser` constructor will use the
`description=` keyword argument.  This argument gives a brief description of
what the program does and how it works.  In help messages, the description is
displayed between the command-line usage string and the help messages for the
various arguments.

By default, the description will be line-wrapped so that it fits within the
given space.  To change this behavior, see the formatter_class_ argument.

### epilog

Some programs like to display additional description of the program after the
description of the arguments.  Such text can be specified using the `epilog=`
argument to `ArgumentParser`:

```
>>> parser = argparse.ArgumentParser(
...     description='A foo that bars',
...     epilog="And that's how you'd foo a bar")
>>> parser.print_help()
usage: argparse.py [-h]

A foo that bars

options:
 -h, --help  show this help message and exit

And that's how you'd foo a bar
```

As with the description_ argument, the `epilog=` text is by default
line-wrapped, but this behavior can be adjusted with the formatter_class_
argument to `ArgumentParser`.

### parents

Sometimes, several parsers share a common set of arguments. Rather than
repeating the definitions of these arguments, a single parser with all the
shared arguments and passed to `parents=` argument to `ArgumentParser`
can be used.  The `parents=` argument takes a list of `ArgumentParser`
objects, collects all the positional and optional actions from them, and adds
these actions to the `ArgumentParser` object being constructed:

```
>>> parent_parser = argparse.ArgumentParser(add_help=False)
>>> parent_parser.add_argument('--parent', type=int)

>>> foo_parser = argparse.ArgumentParser(parents=[parent_parser])
>>> foo_parser.add_argument('foo')
>>> foo_parser.parse_args(['--parent', '2', 'XXX'])
Namespace(foo='XXX', parent=2)

>>> bar_parser = argparse.ArgumentParser(parents=[parent_parser])
>>> bar_parser.add_argument('--bar')
>>> bar_parser.parse_args(['--bar', 'YYY'])
Namespace(bar='YYY', parent=None)
```

Note that most parent parsers will specify `add_help=False`.  Otherwise, the
`ArgumentParser` will see two `-h/--help` options (one in the parent
and one in the child) and raise an error.

> **Note:** You must fully initialize the parsers before passing them via `parents=`.
> If you change the parent parsers after the child parser, those changes will
> not be reflected in the child.

### formatter_class

`ArgumentParser` objects allow the help formatting to be customized by
specifying an alternate formatting class.  Currently, there are four such
classes:

### class `RawDescriptionHelpFormatter`

```python
RawTextHelpFormatter
ArgumentDefaultsHelpFormatter
MetavarTypeHelpFormatter
```

`RawDescriptionHelpFormatter` and `RawTextHelpFormatter` give
more control over how textual descriptions are displayed.
By default, `ArgumentParser` objects line-wrap the description_ and
epilog_ texts in command-line help messages:

```
>>> parser = argparse.ArgumentParser(
...     prog='PROG',
...     description='''this description
...         was indented weird
...             but that is okay''',
...     epilog='''
...             likewise for this epilog whose whitespace will
...         be cleaned up and whose words will be wrapped
...         across a couple lines''')
>>> parser.print_help()
usage: PROG [-h]

this description was indented weird but that is okay

options:
 -h, --help  show this help message and exit

likewise for this epilog whose whitespace will be cleaned up and whose words
will be wrapped across a couple lines
```

Passing `RawDescriptionHelpFormatter` as `formatter_class=`
indicates that description_ and epilog_ are already correctly formatted and
should not be line-wrapped:

```
>>> parser = argparse.ArgumentParser(
...     prog='PROG',
...     formatter_class=argparse.RawDescriptionHelpFormatter,
...     description=textwrap.dedent('''\
...         Please do not mess up this text!
...         --------------------------------
...             I have indented it
...             exactly the way
...             I want it
...         '''))
>>> parser.print_help()
usage: PROG [-h]

Please do not mess up this text!
--------------------------------
   I have indented it
   exactly the way
   I want it

options:
 -h, --help  show this help message and exit
```

`RawTextHelpFormatter` maintains whitespace for all sorts of help text,
including argument descriptions. However, multiple newlines are replaced with
one. If you wish to preserve multiple blank lines, add spaces between the
newlines.

`ArgumentDefaultsHelpFormatter` automatically adds information about
default values to each of the argument help messages:

```
>>> parser = argparse.ArgumentParser(
...     prog='PROG',
...     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
>>> parser.add_argument('--foo', type=int, default=42, help='FOO!')
>>> parser.add_argument('bar', nargs='*', default=[1, 2, 3], help='BAR!')
>>> parser.print_help()
usage: PROG [-h] [--foo FOO] [bar ...]

positional arguments:
 bar         BAR! (default: [1, 2, 3])

options:
 -h, --help  show this help message and exit
 --foo FOO   FOO! (default: 42)
```

`MetavarTypeHelpFormatter` uses the name of the type_ argument for each
argument as the display name for its values (rather than using the dest_
as the regular formatter does):

```
>>> parser = argparse.ArgumentParser(
...     prog='PROG',
...     formatter_class=argparse.MetavarTypeHelpFormatter)
>>> parser.add_argument('--foo', type=int)
>>> parser.add_argument('bar', type=float)
>>> parser.print_help()
usage: PROG [-h] [--foo int] float

positional arguments:
  float

options:
  -h, --help  show this help message and exit
  --foo int
```

### prefix_chars

Most command-line options will use `-` as the prefix, e.g. `-f/--foo`.
Parsers that need to support different or additional prefix
characters, e.g. for options
like `+f` or `/foo`, may specify them using the `prefix_chars=` argument
to the `ArgumentParser` constructor:

```
>>> parser = argparse.ArgumentParser(prog='PROG', prefix_chars='-+')
>>> parser.add_argument('+f')
>>> parser.add_argument('++bar')
>>> parser.parse_args('+f X ++bar Y'.split())
Namespace(bar='Y', f='X')
```

The `prefix_chars=` argument defaults to `'-'`. Supplying a set of
characters that does not include `-` will cause `-f/--foo` options to be
disallowed.

### fromfile_prefix_chars

Sometimes, when dealing with a particularly long argument list, it
may make sense to keep the list of arguments in a file rather than typing it out
at the command line.  If the `fromfile_prefix_chars=` argument is given to the
`ArgumentParser` constructor, then arguments that start with any of the
specified characters will be treated as files, and will be replaced by the
arguments they contain.  For example:

```
>>> with open('args.txt', 'w', encoding=sys.getfilesystemencoding()) as fp:
...     fp.write('-f\nbar')
...
>>> parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
>>> parser.add_argument('-f')
>>> parser.parse_args(['-f', 'foo', '@args.txt'])
Namespace(f='bar')
```

Arguments read from a file must be one per line by default (but see also
`convert_arg_line_to_args()`) and are treated as if they
were in the same place as the original file referencing argument on the command
line.  So in the example above, the expression `['-f', 'foo', '@args.txt']`
is considered equivalent to the expression `['-f', 'foo', '-f', 'bar']`.

> **Note:** Each line is treated as a single argument, so an empty line is read as an
> empty string (`''`).

`ArgumentParser` uses filesystem encoding and error handler
to read the file containing arguments.

The `fromfile_prefix_chars=` argument defaults to `None`, meaning that
arguments will never be treated as file references.

> *Changed in version 3.12.*
> `ArgumentParser` changed encoding and errors to read arguments files
> from default (e.g. `locale.getpreferredencoding(False)`
> and `"strict"`) to the filesystem encoding and error handler.
> Arguments file should be encoded in UTF-8 instead of ANSI Codepage on Windows.

### argument_default

Generally, argument defaults are specified either by passing a default to
`add_argument()` or by calling the
`set_defaults()` methods with a specific set of name-value
pairs.  Sometimes however, it may be useful to specify a single parser-wide
default for arguments.  This can be accomplished by passing the
`argument_default=` keyword argument to `ArgumentParser`.  For example,
to globally suppress attribute creation on `parse_args()`
calls, we supply `argument_default=SUPPRESS`:

```
>>> parser = argparse.ArgumentParser(argument_default=argparse.SUPPRESS)
>>> parser.add_argument('--foo')
>>> parser.add_argument('bar', nargs='?')
>>> parser.parse_args(['--foo', '1', 'BAR'])
Namespace(bar='BAR', foo='1')
>>> parser.parse_args([])
Namespace()
```

### allow_abbrev

Normally, when you pass an argument list to the
`parse_args()` method of an `ArgumentParser`,
it recognizes abbreviations of long options.

This feature can be disabled by setting `allow_abbrev` to `False`:

```
>>> parser = argparse.ArgumentParser(prog='PROG', allow_abbrev=False)
>>> parser.add_argument('--foobar', action='store_true')
>>> parser.add_argument('--foonley', action='store_false')
>>> parser.parse_args(['--foon'])
usage: PROG [-h] [--foobar] [--foonley]
PROG: error: unrecognized arguments: --foon
```

> *Added in version 3.5.*
