---
title: "optparse --- Parser for command line options (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/optparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# optparse --- Parser for command line options (part 4 of 7)

## Reference Guide

### Creating the parser

The first step in using `optparse` is to create an OptionParser instance.

### class `OptionParser(...)`

The OptionParser constructor has no required arguments, but a number of
optional keyword arguments.  You should always pass them as keyword
arguments, i.e. do not rely on the order in which the arguments are declared.

`usage` (default: `"%prog [options]"`)
The usage summary to print when your program is run incorrectly or with a
help option.  When `optparse` prints the usage string, it expands
`%prog` to `os.path.basename(sys.argv[0])` (or to `prog` if you
passed that keyword argument).  To suppress a usage message, pass the
special value `optparse.SUPPRESS_USAGE`.

`option_list` (default: `[]`)
A list of Option objects to populate the parser with.  The options in
`option_list` are added after any options in `standard_option_list` (a
class attribute that may be set by OptionParser subclasses), but before
any version or help options. Deprecated; use `add_option()` after
creating the parser instead.

`option_class` (default: optparse.Option)
Class to use when adding options to the parser in `add_option()`.

`version` (default: `None`)
A version string to print when the user supplies a version option. If you
supply a true value for `version`, `optparse` automatically adds a
version option with the single option string `--version`.  The
substring `%prog` is expanded the same as for `usage`.

`conflict_handler` (default: `"error"`)
Specifies what to do when options with conflicting option strings are
added to the parser; see section
optparse-conflicts-between-options.

`description` (default: `None`)
A paragraph of text giving a brief overview of your program.
`optparse` reformats this paragraph to fit the current terminal width
and prints it when the user requests help (after `usage`, but before the
list of options).

`formatter` (default: a new `IndentedHelpFormatter`)
An instance of optparse.HelpFormatter that will be used for printing help
text.  `optparse` provides two concrete classes for this purpose:
IndentedHelpFormatter and TitledHelpFormatter.

`add_help_option` (default: `True`)
If true, `optparse` will add a help option (with option strings `-h`
and `--help`) to the parser.

`prog`
The string to use when expanding `%prog` in `usage` and `version`
instead of `os.path.basename(sys.argv[0])`.

`epilog` (default: `None`)
A paragraph of help text to print after the option help.

### Populating the parser

There are several ways to populate the parser with options.  The preferred way
is by using `OptionParser.add_option()`, as shown in section
optparse-tutorial.  `add_option()` can be called in one of two ways:

- pass it an Option instance (as returned by `make_option()`)

- pass it any combination of positional and keyword arguments that are
acceptable to `make_option()` (i.e., to the Option constructor), and it
will create the Option instance for you

The other alternative is to pass a list of pre-constructed Option instances to
the OptionParser constructor, as in:

```
option_list = [
    make_option("-f", "--filename",
                action="store", type="string", dest="filename"),
    make_option("-q", "--quiet",
                action="store_false", dest="verbose"),
    ]
parser = OptionParser(option_list=option_list)
```

(`make_option()` is a factory function for creating Option instances;
currently it is an alias for the Option constructor.  A future version of
`optparse` may split Option into several classes, and `make_option()`
will pick the right class to instantiate.  Do not instantiate Option directly.)

### Defining options

Each Option instance represents a set of synonymous command-line option strings,
e.g. `-f` and `--file`.  You can specify any number of short or
long option strings, but you must specify at least one overall option string.

The canonical way to create an `Option` instance is with the
`add_option()` method of `OptionParser`.

### `OptionParser.add_option(option)`

```python
OptionParser.add_option(*opt_str, attr=value, ...)
```

To define an option with only a short option string:

```
parser.add_option("-f", attr=value, ...)
```

And to define an option with only a long option string:

```
parser.add_option("--foo", attr=value, ...)
```

The keyword arguments define attributes of the new Option object.  The most
important option attribute is `action`, and it largely
determines which other attributes are relevant or required.  If you pass
irrelevant option attributes, or fail to pass <example-value> ones, `optparse`
raises an `OptionError` exception explaining your mistake.

An option's *action* determines what `optparse` does when it encounters
this option on the command-line.  The standard option actions hard-coded into
`optparse` are:

`"store"`
store this option's argument (default)

`"store_const"`
store a constant value, pre-set via `Option.const`

`"store_true"`
store `True`

`"store_false"`
store `False`

`"append"`
append this option's argument to a list

`"append_const"`
append a constant value to a list, pre-set via `Option.const`

`"count"`
increment a counter by one

`"callback"`
call a specified function

`"help"`
print a usage message including all options and the documentation for them

(If you don't supply an action, the default is `"store"`.  For this action,
you may also supply `type` and `dest` option
attributes; see optparse-standard-option-actions.)

As you can see, most actions involve storing or updating a value somewhere.
`optparse` always creates a special object for this, conventionally called
`options`, which is an instance of `optparse.Values`.

### class `Values`

An object holding parsed argument names and values as attributes.
Normally created by calling when calling `OptionParser.parse_args()`,
and can be overridden by a custom subclass passed to the *values* argument of
`OptionParser.parse_args()` (as described in optparse-parsing-arguments).

Option
arguments (and various other values) are stored as attributes of this object,
according to the `dest` (destination) option attribute.

For example, when you call:

```
parser.parse_args()
```

one of the first things `optparse` does is create the `options` object:

```
options = Values()
```

If one of the options in this parser is defined with:

```
parser.add_option("-f", "--file", action="store", type="string", dest="filename")
```

and the command-line being parsed includes any of the following:

```
-ffoo
-f foo
--file=foo
--file foo
```

then `optparse`, on seeing this option, will do the equivalent of:

```
options.filename = "foo"
```

The `type` and `dest` option attributes are almost
as important as `action`, but `action` is the only
one that makes sense for *all* options.

### class `Option`

A single command line argument,
with various attributes passed by keyword to the constructor.
Normally created with `OptionParser.add_option()` rather than directly,
and can be overridden by a custom class via the *option_class* argument
to `OptionParser`.

The following option attributes may be passed as keyword arguments to
`OptionParser.add_option()`.  If you pass an option attribute that is not
relevant to a particular option, or fail to pass a required option attribute,
`optparse` raises `OptionError`.

### `Option.action`

(default: `"store"`)

Determines `optparse`'s behaviour when this option is seen on the
command line; the available options are documented :ref:`here
<optparse-standard-option-actions>`.

### `Option.type`

(default: `"string"`)

The argument type expected by this option (e.g., `"string"` or `"int"`);
the available option types are documented :ref:`here
<optparse-standard-option-types>`.

### `Option.dest`

(default: derived from option strings)

If the option's action implies writing or modifying a value somewhere, this
tells `optparse` where to write it: `dest` names an
attribute of the `options` object that `optparse` builds as it parses
the command line.

### `Option.default`

The value to use for this option's destination if the option is not seen on
the command line.  See also `OptionParser.set_defaults()`.

### `Option.nargs`

(default: 1)

How many arguments of type `type` should be consumed when this
option is seen.  If > 1, `optparse` will store a tuple of values to
`dest`.

### `Option.const`

For actions that store a constant value, the constant value to store.

### `Option.choices`

For options of type `"choice"`, the list of strings the user may choose
from.

### `Option.callback`

For options with action `"callback"`, the callable to call when this option
is seen.  See section optparse-option-callbacks for detail on the
arguments passed to the callable.

### `Option.callback_args`

```python
Option.callback_kwargs
```

Additional positional and keyword arguments to pass to `callback` after the
four standard callback arguments.

### `Option.help`

Help text to print for this option when listing all available options after
the user supplies a `help` option (such as `--help`).  If
no help text is supplied, the option will be listed without help text.  To
hide this option, use the special value `optparse.SUPPRESS_HELP`.

### `Option.metavar`

(default: derived from option strings)

Stand-in for the option argument(s) to use when printing help text.  See
section optparse-tutorial for an example.
