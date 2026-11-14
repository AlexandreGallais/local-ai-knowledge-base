---
title: "argparse --- Parser for command-line options, arguments and subcommands (part 1 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `argparse` --- Parser for command-line options, arguments and subcommands

Module `argparse`.

> *Added in version 3.2.*

**Source code:** Lib/argparse.py

> **Note:** While `argparse` is the default recommended standard library module
> for implementing basic <example-value> line applications, authors with more
> exacting requirements for exactly how their command line applications
> behave may find it doesn't provide the necessary level of control.
> Refer to choosing-an-argument-parser for alternatives to
> consider when `argparse` doesn't support behaviors that the application
> requires (such as entirely disabling support for interspersed options and
> positional arguments, or accepting option parameter values that start
> with `-` even when they correspond to another defined option).

Tutorial

This page contains the API reference information. For a more gentle
introduction to Python command-line parsing, have a look at the
argparse tutorial.

The `argparse` module makes it easy to write user-friendly command-line
interfaces. The program defines what arguments it requires, and `argparse`
will figure out how to parse those out of `sys.argv`.  The `argparse`
module also automatically generates help and usage messages.  The module
will also issue errors when users give the program invalid arguments.

The `argparse` module's support for command-line interfaces is built
around an instance of `argparse.ArgumentParser`.  It is a container for
argument specifications and has options that apply to the parser as whole:

```
parser = argparse.ArgumentParser(
                    prog='ProgramName',
                    description='What the program does',
                    epilog='Text at the bottom of help')
```

The `ArgumentParser.add_argument()` method attaches individual argument
specifications to the parser.  It supports positional arguments, options that
accept values, and on/off flags:

```
parser.add_argument('filename')           # positional argument
parser.add_argument('-c', '--count')      # option that takes a value
parser.add_argument('-v', '--verbose',
                    action='store_true')  # on/off flag
```

The `ArgumentParser.parse_args()` method runs the parser and places
the extracted data in a `argparse.Namespace` object:

```
args = parser.parse_args()
print(args.filename, args.count, args.verbose)
```

> **Note:** If you're looking for a guide about how to upgrade `optparse` code
> to `argparse`, see Upgrading Optparse Code.
