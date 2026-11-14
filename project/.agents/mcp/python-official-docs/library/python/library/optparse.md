---
title: "optparse --- Parser for command line options (part 1 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/optparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `optparse` --- Parser for command line options

Module `optparse`.

**Source code:** Lib/optparse.py

## Choosing an argument parsing library

The standard library includes three argument parsing libraries:

- `getopt`: a module that closely mirrors the procedural C `getopt` API.
- `optparse`: a declarative replacement for `getopt` that
provides equivalent functionality without requiring each application
to implement its own procedural option parsing logic.
- `argparse`: a more opinionated alternative to `optparse` that
provides more functionality by default, at the expense of reduced application
flexibility in controlling exactly how arguments are processed.

In the absence of more specific argument parsing design constraints, `argparse`
is the recommended choice for implementing command line applications, as it offers
the highest level of baseline functionality with the least application level code.

`getopt` is retained almost entirely for backwards compatibility reasons.
However, it also serves a niche use case as a tool for prototyping and testing
command line argument handling in `getopt`-based C applications.

`optparse` should be considered as an alternative to `argparse` in the
following cases:

- an application is already using `optparse` and doesn't want to risk the
subtle behavioural changes that may arise when migrating to `argparse`
- the application requires additional control over the way options and
positional parameters are interleaved on the command line (including
the ability to disable the interleaving feature completely)
- the application requires additional control over the incremental parsing
of command line elements (while `argparse` does support this, the
exact way it works in practice is undesirable for some use cases)
- the application requires additional control over the handling of options
which accept parameter values that may start with `-` (such as delegated
options to be passed to invoked subprocesses)
- the application requires some other command line parameter processing
behavior which `argparse` does not support, but which can be implemented
in terms of the lower level interface offered by `optparse`

These considerations also mean that `optparse` is likely to provide a
better foundation for library authors writing third party command line
argument processing libraries.

As a concrete example, consider the following two command line argument
parsing configurations, the first using `optparse`, and the second
using `argparse`:

```python

import optparse

if __name__ == '__main__':
    parser = optparse.OptionParser()
    parser.add_option('-o', '--output')
    parser.add_option('-v', dest='verbose', action='store_true')
    opts, args = parser.parse_args()
    process(args, output=opts.output, verbose=opts.verbose)
```

```python

import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-o', '--output')
    parser.add_argument('-v', dest='verbose', action='store_true')
    parser.add_argument('rest', nargs='*')
    args = parser.parse_args()
    process(args.rest, output=args.output, verbose=args.verbose)
```

The most obvious difference is that in the `optparse` version, the non-option
arguments are processed separately by the application after the option processing
is complete. In the `argparse` version, positional arguments are declared and
processed in the same way as the named options.

However, the `argparse` version will also handle some parameter combination
differently from the way the `optparse` version would handle them.
For example (amongst other differences):

- supplying `-o -v` gives `output="-v"` and `verbose=False`
when using `optparse`, but a usage error with `argparse`
(complaining that no value has been supplied for `-o/--output`,
since `-v` is interpreted as meaning the verbosity flag)
- similarly, supplying `-o --` gives `output="--"` and `args=()`
when using `optparse`, but a usage error with `argparse`
(also complaining that no value has been supplied for `-o/--output`,
since `--` is interpreted as terminating the option processing
and treating all remaining values as positional arguments)
- supplying `-o=foo` gives `output="=foo"` when using `optparse`,
but gives `output="foo"` with `argparse` (since `=` is special
cased as an alternative separator for option parameter values)

Whether these differing behaviors in the `argparse` version are
considered desirable or a problem will depend on the specific command line
application use case.

> **See also:** click is a third party argument processing library (originally
> based on `optparse`), which allows command line applications to be
> developed as a set of decorated command implementation functions.
>
> Other third party libraries, such as typer or msgspec-click,
> allow command line interfaces to be specified in ways that more effectively
> integrate with static checking of Python type annotations.

## Introduction

`optparse` is a more convenient, flexible, and powerful library for parsing
command-line options than the minimalist `getopt` module.
`optparse` uses a more declarative style of command-line parsing:
you create an instance of `OptionParser`,
populate it with options, and parse the command line.
`optparse` allows users to specify options in the conventional
GNU/POSIX syntax, and additionally generates usage and help messages for you.

Here's an example of using `optparse` in a simple script:

```
from optparse import OptionParser
...
parser = OptionParser()
parser.add_option("-f", "--file", dest="filename",
                  help="write report to FILE", metavar="FILE")
parser.add_option("-q", "--quiet",
                  action="store_false", dest="verbose", default=True,
                  help="don't print status messages to stdout")

(options, args) = parser.parse_args()
```

With these few lines of code, users of your script can now do the "usual thing"
on the command-line, for example:

```
<yourscript> --file=outfile -q
```

As it parses the command line, `optparse` sets attributes of the
`options` object returned by `parse_args()` based on user-supplied
command-line values.  When `parse_args()` returns from parsing this command
line, `options.filename` will be `"outfile"` and `options.verbose` will be
`False`.  `optparse` supports both long and short options, allows short
options to be merged together, and allows options to be associated with their
arguments in a variety of ways.  Thus, the following command lines are all
equivalent to the above example:

```
<yourscript> -f outfile --quiet
<yourscript> --quiet --file outfile
<yourscript> -q -foutfile
<yourscript> -qfoutfile
```

Additionally, users can run one of the following:

```
<yourscript> -h
<yourscript> --help
```

and `optparse` will print out a brief summary of your script's options:

```text
Usage: <yourscript> [options]

Options:
  -h, --help            show this help message and exit
  -f FILE, --file=FILE  write report to FILE
  -q, --quiet           don't print status messages to stdout
```

where the value of *yourscript* is determined at runtime (normally from
`sys.argv[0]`).

## Background

`optparse` was explicitly designed to encourage the creation of programs
with straightforward command-line interfaces that follow the conventions
established by the `getopt` family of functions available to C developers.
To that end, it supports only the most common command-line syntax and semantics
conventionally used under Unix.  If you are unfamiliar with these conventions,
reading this section will allow you to acquaint yourself with them.

### Terminology

argument
a string entered on the command-line, and passed by the shell to `execl()`
or `execv()`.  In Python, arguments are elements of `sys.argv[1:]`
(`sys.argv[0]` is the name of the program being executed).  Unix shells
also use the term "word".

It is occasionally desirable to substitute an argument list other than
`sys.argv[1:]`, so you should read "argument" as "an element of
`sys.argv[1:]`, or of some other list provided as a substitute for
`sys.argv[1:]`".

option
an argument used to supply extra information to guide or customize the
execution of a program.  There are many different syntaxes for options; the
traditional Unix syntax is a hyphen ("-") followed by a single letter,
e.g. `-x` or `-F`.  Also, traditional Unix syntax allows multiple
options to be merged into a single argument, e.g. `-x -F` is equivalent
to `-xF`.  The GNU project introduced `--` followed by a series of
hyphen-separated words, e.g. `--file` or `--dry-run`.  These are the
only two option syntaxes provided by `optparse`.

Some other option syntaxes that the world has seen include:

- a hyphen followed by a few letters, e.g. `-pf` (this is *not* the same
as multiple options merged into a single argument)

- a hyphen followed by a whole word, e.g. `-file` (this is technically
equivalent to the previous syntax, but they aren't usually seen in the same
program)

- a plus sign followed by a single letter, or a few letters, or a word, e.g.
`+f`, `+rgb`

- a slash followed by a letter, or a few letters, or a word, e.g. `/f`,
`/file`

These option syntaxes are not supported by `optparse`, and they never
will be.  This is deliberate: the first three are non-standard on any
environment, and the last only makes sense if you're exclusively targeting
Windows or certain legacy platforms (e.g. VMS, MS-DOS).

option argument
an argument that follows an option, is closely associated with that option,
and is consumed from the argument list when that option is. With
`optparse`, option arguments may either be in a separate argument from
their option:

```text
-f foo
--file foo
```

or included in the same argument:

```text
-ffoo
--file=foo
```

Typically, a given option either takes an argument or it doesn't. Lots of
people want an "optional option arguments" feature, meaning that some options
will take an argument if they see it, and won't if they don't.  This is
somewhat controversial, because it makes parsing ambiguous: if `-a` takes
an optional argument and `-b` is another option entirely, how do we
interpret `-ab`?  Because of this ambiguity, `optparse` does not
support this feature.

positional argument
something leftover in the argument list after options have been parsed, i.e.
after options and their arguments have been parsed and removed from the
argument list.

required option
an option that must be supplied on the command-line; note that the phrase
"required option" is self-contradictory in English.  `optparse` doesn't
prevent you from implementing required options, but doesn't give you much
help at it either.

For example, consider this hypothetical command-line:

```
prog -v --report report.txt foo bar
```

`-v` and `--report` are both options.  Assuming that `--report`
takes one argument, `report.txt` is an option argument.  `foo` and
`bar` are positional arguments.

### What are options for?

Options are used to provide extra information to tune or customize the execution
of a program.  In case it wasn't clear, options are usually *optional*.  A
program should be able to run just fine with no options whatsoever.  (Pick a
random program from the Unix or GNU toolsets.  Can it run without any options at
all and still make sense?  The main exceptions are `find`, `tar`, and
`dd`---all of which are mutant oddballs that have been rightly criticized
for their non-standard syntax and confusing interfaces.)

Lots of people want their programs to have "required options".  Think about it.
If it's required, then it's *not optional*!  If there is a piece of information
that your program absolutely requires in order to run successfully, that's what
positional arguments are for.

As an example of good command-line interface design, consider the humble `cp`
utility, for copying files.  It doesn't make much sense to try to copy files
without supplying a destination and at least one source. Hence, `cp` fails if
you run it with no arguments.  However, it has a flexible, useful syntax that
does not require any options at all:

```
cp SOURCE DEST
cp SOURCE ... DEST-DIR
```

You can get pretty far with just that.  Most `cp` implementations provide a
bunch of options to tweak exactly how the files are copied: you can preserve
mode and modification time, avoid following symlinks, ask before clobbering
existing files, etc.  But none of this distracts from the core mission of
`cp`, which is to copy either one file to another, or several files to another
directory.

### What are positional arguments for?

Positional arguments are for those pieces of information that your program
absolutely, positively requires to run.

A good user interface should have as few absolute requirements as possible.  If
your program requires 17 distinct pieces of information in order to run
successfully, it doesn't much matter *how* you get that information from the
user---most people will give up and walk away before they successfully run the
program.  This applies whether the user interface is a command-line, a
configuration file, or a GUI: if you make that many demands on your users, most
of them will simply give up.

In short, try to minimize the amount of information that users are absolutely
required to supply---use sensible defaults whenever possible.  Of course, you
also want to make your programs reasonably flexible.  That's what options are
for.  Again, it doesn't matter if they are entries in a config file, widgets in
the "Preferences" dialog of a GUI, or command-line options---the more options
you implement, the more flexible your program is, and the more complicated its
implementation becomes.  Too much flexibility has drawbacks as well, of course;
too many options can overwhelm users and make your code much harder to maintain.
