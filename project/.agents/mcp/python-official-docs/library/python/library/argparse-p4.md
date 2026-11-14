---
title: "argparse --- Parser for command-line options, arguments and subcommands (part 4 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# argparse --- Parser for command-line options, arguments and subcommands (part 4 of 8)

## The add_argument() method

### `ArgumentParser.add_argument(name or flags..., *, [action], [nargs], \`

```python
[const], [default], [type], [choices], [required], \
[help], [metavar], [dest], [deprecated])
```

Define how a single command-line argument should be parsed.  Each parameter
has its own more detailed description below, but in short they are:

- name or flags - Either a name or a list of option strings, e.g. `'foo'`
or `'-f', '--foo'`.

- action_ - The basic type of action to be taken when this argument is
encountered at the command line.

- nargs_ - The number of command-line arguments that should be consumed.

- const_ - A constant value required by some action_ and nargs_ selections.

- default_ - The value produced if the argument is absent from the
command line and if it is absent from the namespace object.

- type_ - The type to which the command-line argument should be converted.

- choices_ - A sequence of the allowable values for the argument.

- required_ - Whether or not the command-line option may be omitted
(optionals only).

- help_ - A brief description of what the argument does.

- metavar_ - A name for the argument in usage messages.

- dest_ - The name of the attribute to be added to the object returned by
`parse_args()`.

- deprecated_ - Whether or not use of the argument is deprecated.

The method returns an `Action` object representing the argument.

The following sections describe how each of these are used.

### name or flags

The `add_argument()` method must know whether an optional
argument, like `-f` or `--foo`, or a positional argument, like a list of
filenames, is expected.  The first arguments passed to
`add_argument()` must therefore be either a series of
flags, or a simple argument name.

For example, an optional argument could be created like:

```
>>> parser.add_argument('-f', '--foo')
```

while a positional argument could be created like:

```
>>> parser.add_argument('bar')
```

When `parse_args()` is called, optional arguments will be
identified by the `-` prefix, and the remaining arguments will be assumed to
be positional:

```
>>> parser = argparse.ArgumentParser(prog='PROG')
>>> parser.add_argument('-f', '--foo')
>>> parser.add_argument('bar')
>>> parser.parse_args(['BAR'])
Namespace(bar='BAR', foo=None)
>>> parser.parse_args(['BAR', '--foo', 'FOO'])
Namespace(bar='BAR', foo='FOO')
>>> parser.parse_args(['--foo', 'FOO'])
usage: PROG [-h] [-f FOO] bar
PROG: error: the following arguments are required: bar
```

By default, `argparse` automatically handles the internal naming and
display names of arguments, simplifying the process without requiring
additional configuration.
As such, you do not need to specify the dest_ and metavar_ parameters.
For optional arguments, the dest_ parameter defaults to the argument name, with
underscores `_` replacing hyphens `-`. The metavar_ parameter defaults to
the upper-cased name. For example:

```
>>> parser = argparse.ArgumentParser(prog='PROG')
>>> parser.add_argument('--foo-bar')
>>> parser.parse_args(['--foo-bar', 'FOO-BAR'])
Namespace(foo_bar='FOO-BAR')
>>> parser.print_help()
usage:  [-h] [--foo-bar FOO-BAR]

optional arguments:
 -h, --help  show this help message and exit
 --foo-bar FOO-BAR
```

### action

`ArgumentParser` objects associate command-line arguments with actions.  These
actions can do just about anything with the command-line arguments associated with
them, though most actions simply add an attribute to the object returned by
`parse_args()`.  The `action` keyword argument specifies
how the command-line arguments should be handled. The supplied actions are:

- `'store'` - This just stores the argument's value.  This is the default
action.

- `'store_const'` - This stores the value specified by the const_ keyword
argument; note that the const_ keyword argument defaults to `None`.  The
`'store_const'` action is most commonly used with optional arguments that
specify some sort of flag.  For example:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', action='store_const', const=42)
>>> parser.parse_args(['--foo'])
Namespace(foo=42)
```

- `'store_true'` and `'store_false'` - These are special cases of
`'store_const'` that respectively store the values `True` and `False`
with default values of `False` and
`True`:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', action='store_true')
>>> parser.add_argument('--bar', action='store_false')
>>> parser.add_argument('--baz', action='store_false')
>>> parser.parse_args('--foo --bar'.split())
Namespace(foo=True, bar=False, baz=True)
```

These defaults apply when the options are absent. They can be overridden
by default_ or argument_default_.

- `'append'` - This appends each argument value to a list.
It is useful for allowing an option to be specified multiple times.
If the default value is a non-empty list, the parsed value will start
with the default list's elements and any values from the command line
will be appended after those default values. Example usage:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', action='append', default=['0'])
>>> parser.parse_args('--foo 1 --foo 2'.split())
Namespace(foo=['0', '1', '2'])
```

- `'append_const'` - This appends the value specified by
the const_ keyword argument to a list; note that the const_ keyword
argument defaults to `None`. The `'append_const'` action is typically
useful when multiple arguments need to store constants to the same list. For
example:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--str', dest='types', action='append_const', const=str)
>>> parser.add_argument('--int', dest='types', action='append_const', const=int)
>>> parser.parse_args('--str --int'.split())
Namespace(types=[<class 'str'>, <class 'int'>])
```

- `'extend'` - This appends each item from a multi-value
argument to a list.
The `'extend'` action is typically used with the nargs_ keyword argument
value `'+'` or `'*'`.
Note that when nargs_ is `None` (the default) or `'?'`, each
character of the argument string will be appended to the list.
Example usage:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument("--foo", action="extend", nargs="+", type=str)
>>> parser.parse_args(["--foo", "f1", "--foo", "f2", "f3", "f4"])
Namespace(foo=['f1', 'f2', 'f3', 'f4'])
```

> *Added in version 3.8.*

- `'count'` - This counts the number of times an argument occurs. For
example, this is useful for increasing verbosity levels:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--verbose', '-v', action='count', default=0)
>>> parser.parse_args(['-vvv'])
Namespace(verbose=3)
```

Unless explicitly set, the *default* will be `None`. If the default
value is a non-zero number, the count starts from that number rather
than from zero.

- `'help'` - This prints a complete help message for all the options in the
current parser and then exits. By default a help action is automatically
added to the parser. See `ArgumentParser` for details of how the
output is created.

- `'version'` - This expects a `version=` keyword argument in the
`add_argument()` call, and prints version information
and exits when invoked:

```
>>> import argparse
>>> parser = argparse.ArgumentParser(prog='PROG')
>>> parser.add_argument('--version', action='version', version='%(prog)s 2.0')
>>> parser.parse_args(['--version'])
PROG 2.0
```

You may also specify an arbitrary action by passing an `Action` subclass
(e.g. `BooleanOptionalAction`) or other object that implements the same
interface. Only actions that consume command-line arguments (e.g. `'store'`,
`'append'`, `'extend'`, or custom actions with non-zero `nargs`) can be used
with positional arguments.

The recommended way to create a custom action is to extend `Action`,
overriding the `__call__() method and optionally the init__()` and
`format_usage()` methods. You can also register custom actions using the
`register()` method and reference them by their registered name.

An example of a custom action:

```
>>> class FooAction(argparse.Action):
...     def __init__(self, option_strings, dest, nargs=None, **kwargs):
...         if nargs is not None:
...             raise ValueError("nargs not allowed")
...         super().__init__(option_strings, dest, **kwargs)
...     def __call__(self, parser, namespace, values, option_string=None):
...         print('%r %r %r' % (namespace, values, option_string))
...         setattr(namespace, self.dest, values)
...
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', action=FooAction)
>>> parser.add_argument('bar', action=FooAction)
>>> args = parser.parse_args('1 --foo 2'.split())
Namespace(bar=None, foo=None) '1' None
Namespace(bar='1', foo=None) '2' '--foo'
>>> args
Namespace(bar='1', foo='2')
```

For more details, see `Action`.

### nargs

`ArgumentParser` objects usually associate a single command-line argument with a
single action to be taken.  The `nargs` keyword argument associates a
different number of command-line arguments with a single action.
See also specifying-ambiguous-arguments. The supported values are:

- `N` (an integer).  `N` arguments from the command line will be gathered
together into a list.  For example:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', nargs=2)
>>> parser.add_argument('bar', nargs=1)
>>> parser.parse_args('c --foo a b'.split())
Namespace(bar=['c'], foo=['a', 'b'])
```

Note that `nargs=1` produces a list of one item.  This is different from
the default, in which the item is produced by itself.

- `'?'`. One argument will be consumed from the command line if possible, and
produced as a single item.  If no command-line argument is present, the value from
default_ will be produced.  Note that for optional arguments, there is an
additional case - the option string is present but not followed by a
command-line argument.  In this case the value from const_ will be produced.  Some
examples to illustrate this:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', nargs='?', const='c', default='d')
>>> parser.add_argument('bar', nargs='?', default='d')
>>> parser.parse_args(['XX', '--foo', 'YY'])
Namespace(bar='XX', foo='YY')
>>> parser.parse_args(['XX', '--foo'])
Namespace(bar='XX', foo='c')
>>> parser.parse_args([])
Namespace(bar='d', foo='d')
```

One of the more common uses of `nargs='?'` is to allow optional input and
output files:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('infile', nargs='?')
>>> parser.add_argument('outfile', nargs='?')
>>> parser.parse_args(['input.txt', 'output.txt'])
Namespace(infile='input.txt', outfile='output.txt')
>>> parser.parse_args(['input.txt'])
Namespace(infile='input.txt', outfile=None)
>>> parser.parse_args([])
Namespace(infile=None, outfile=None)
```

- `'*'`.  All command-line arguments present are gathered into a list.  Note that
it generally doesn't make much sense to have more than one positional argument
with `nargs='*'`, but multiple optional arguments with `nargs='*'` is
possible.  For example:

```
>>> parser = argparse.ArgumentParser()
>>> parser.add_argument('--foo', nargs='*')
>>> parser.add_argument('--bar', nargs='*')
>>> parser.add_argument('baz', nargs='*')
>>> parser.parse_args('a b --foo x y --bar 1 2'.split())
Namespace(bar=['1', '2'], baz=['a', 'b'], foo=['x', 'y'])
```

- `'+'`. Just like `'*'`, all command-line arguments present are gathered into a
list.  Additionally, an error message will be generated if there wasn't at
least one command-line argument present.  For example:

```
>>> parser = argparse.ArgumentParser(prog='PROG')
>>> parser.add_argument('foo', nargs='+')
>>> parser.parse_args(['a', 'b'])
Namespace(foo=['a', 'b'])
>>> parser.parse_args([])
usage: PROG [-h] foo [foo ...]
PROG: error: the following arguments are required: foo
```

If the `nargs` keyword argument is not provided, the number of arguments consumed
is determined by the action_.  Generally this means a single command-line argument
will be consumed and a single item (not a list) will be produced.
Actions that do not consume command-line arguments (e.g.
`'store_const'`) set `nargs=0`.

### const

The `const` argument of `add_argument()` is used to hold
constant values that are not read from the command line but are required for
the various `ArgumentParser` actions.  The two most common uses of it are:

- When `add_argument()` is called with
`action='store_const'` or `action='append_const'`.  These actions add the
`const` value to one of the attributes of the object returned by
`parse_args()`. See the action_ description for examples.
If `const` is not provided to `add_argument()`, it will
receive a default value of `None`.

- When `add_argument()` is called with option strings
(like `-f` or `--foo`) and `nargs='?'`.  This creates an optional
argument that can be followed by zero or one command-line arguments.
When parsing the command line, if the option string is encountered with no
command-line argument following it, the value from `const` will be used.
See the nargs_ description for examples.

> *Changed in version 3.11.*
> `const=None` by default, including when `action='append_const'` or
> `action='store_const'`.
