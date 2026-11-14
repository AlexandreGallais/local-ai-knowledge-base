---
title: "argparse --- Parser for command-line options, arguments and subcommands (part 3 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# argparse --- Parser for command-line options, arguments and subcommands (part 3 of 8)

### conflict_handler

`ArgumentParser` objects do not allow two actions with the same option
string.  By default, `ArgumentParser` objects raise an exception if an
attempt is made to create an argument with an option string that is already in
use:

```
>>> parser = argparse.ArgumentParser(prog='PROG')
>>> parser.add_argument('-f', '--foo', help='old foo help')
>>> parser.add_argument('--foo', help='new foo help')
Traceback (most recent call last):
 ..
ArgumentError: argument --foo: conflicting option string(s): --foo
```

Sometimes (e.g. when using parents_) it may be useful to simply override any
older arguments with the same option string.  To get this behavior, the value
`'resolve'` can be supplied to the `conflict_handler=` argument of
`ArgumentParser`:

```
>>> parser = argparse.ArgumentParser(prog='PROG', conflict_handler='resolve')
>>> parser.add_argument('-f', '--foo', help='old foo help')
>>> parser.add_argument('--foo', help='new foo help')
>>> parser.print_help()
usage: PROG [-h] [-f FOO] [--foo FOO]

options:
 -h, --help  show this help message and exit
 -f FOO      old foo help
 --foo FOO   new foo help
```

Note that `ArgumentParser` objects only remove an action if all of its
option strings are overridden.  So, in the example above, the old `-f/--foo`
action is retained as the `-f` action, because only the `--foo` option
string was overridden.

### add_help

By default, `ArgumentParser` objects add an option which simply displays
the parser's help message. If `-h` or `--help` is supplied at the command
line, the `ArgumentParser` help will be printed.

Occasionally, it may be useful to disable the addition of this help option.
This can be achieved by passing `False` as the `add_help=` argument to
`ArgumentParser`:

```
>>> parser = argparse.ArgumentParser(prog='PROG', add_help=False)
>>> parser.add_argument('--foo', help='foo help')
>>> parser.print_help()
usage: PROG [--foo FOO]

options:
 --foo FOO  foo help
```

The help option is typically `-h/--help`. The exception to this is
if the `prefix_chars=` is specified and does not include `-`, in
which case `-h` and `--help` are not valid options.  In
this case, the first character in `prefix_chars` is used to prefix
the help options:

```
>>> parser = argparse.ArgumentParser(prog='PROG', prefix_chars='+/')
>>> parser.print_help()
usage: PROG [+h]

options:
  +h, ++help  show this help message and exit
```

### exit_on_error

Normally, when you pass an invalid argument list to the `parse_args()`
method of an `ArgumentParser`, it will print a *message* to `sys.stderr` and exit with a status
code of 2.

If the user would like to catch errors manually, the feature can be enabled by setting
`exit_on_error` to `False`:

```
>>> parser = argparse.ArgumentParser(exit_on_error=False)
>>> parser.add_argument('--integers', type=int)
_StoreAction(option_strings=['--integers'], dest='integers', nargs=None, const=None, default=None, type=<class 'int'>, choices=None, help=None, metavar=None)
>>> try:
...     parser.parse_args('--integers a'.split())
... except argparse.ArgumentError:
...     print('Catching an argumentError')
...
Catching an argumentError
```

> *Added in version 3.9.*

### suggest_on_error

By default, when a user passes an invalid argument choice or subparser name,
`ArgumentParser` will exit with error info and provide suggestions for
mistyped arguments. The error message will list the permissible argument
choices (if specified) or subparser names, along with a "maybe you meant"
suggestion if a close match is found. Note that this only applies for arguments
when the choices specified are strings:

```
>>> parser = argparse.ArgumentParser(suggest_on_error=True)
>>> parser.add_argument('--action', choices=['debug', 'dryrun'])
>>> parser.parse_args(['--action', 'debugg'])
usage: tester.py [-h] [--action {debug,dryrun}]
tester.py: error: argument --action: invalid choice: 'debugg', maybe you meant 'debug'? (choose from debug, dryrun)
```

You can disable suggestions by setting `suggest_on_error` to `False`.

> *Added in version 3.14.*

> *Changed in version 3.15.*
> Changed default value of `suggest_on_error` from `False` to `True`.

### color

By default, the help message is printed in color using `ANSI escape sequences
<https://en.wikipedia.org/wiki/ANSI_escape_code>`__.
If you want plain text help messages, you can disable this :ref:`in your local
environment <using-on-controlling-color>`, or in the argument parser itself
by setting `color` to `False`:

```
>>> parser = argparse.ArgumentParser(description='Process some integers.',
...                                  color=False)
>>> parser.add_argument('--action', choices=['sum', 'max'])
>>> parser.add_argument('integers', metavar='N', type=int, nargs='+',
...                     help='an integer for the accumulator')
>>> parser.parse_args(['--help'])
```

Note that when `color=True`, colored output depends on both environment
variables and terminal capabilities.  However, if `color=False`, colored
output is always disabled, even if environment variables like `FORCE_COLOR`
are set.

> *Added in version 3.14.*

To highlight inline code in your description, epilog, or argument `help`
text, you can use single or double backticks:

```
>>> parser = argparse.ArgumentParser(
...     formatter_class=argparse.RawDescriptionHelpFormatter,
...     description='Run ``python -m myapp`` to start.',
...     epilog='''Examples:
...   `python -m myapp --verbose`
...   ``python -m myapp --config settings.json``
... ''')
>>> parser.add_argument('--foo', help='set the `foo` value')
```

When colors are enabled, the text inside backticks will be displayed in a
distinct color to help examples stand out. When colors are disabled, backticks
are preserved as-is, which is readable in plain text.

> *Added in version 3.15.*
