---
title: "optparse --- Parser for command line options (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/optparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# optparse --- Parser for command line options (part 3 of 7)

### Printing a version string

Similar to the brief usage string, `optparse` can also print a version
string for your program.  You have to supply the string as the `version`
argument to OptionParser:

```
parser = OptionParser(usage="%prog [-f] [-q]", version="%prog 1.0")
```

`%prog` is expanded just like it is in `usage`.  Apart from that,
`version` can contain anything you like.  When you supply it, `optparse`
automatically adds a `--version` option to your parser. If it encounters
this option on the command line, it expands your `version` string (by
replacing `%prog`), prints it to stdout, and exits.

For example, if your script is called `/usr/bin/foo`:

```shell-session
$ /usr/bin/foo --version
foo 1.0
```

The following two methods can be used to print and get the `version` string:

### `OptionParser.print_version(file=None)`

Print the version message for the current program (`self.version`) to
*file* (default stdout).  As with `print_usage()`, any occurrence
of `%prog` in `self.version` is replaced with the name of the current
program.  Does nothing if `self.version` is empty or undefined.

### `OptionParser.get_version()`

Same as `print_version()` but returns the version string instead of
printing it.

### How `optparse` handles errors

There are two broad classes of errors that `optparse` has to worry about:
programmer errors and user errors.  Programmer errors are usually erroneous
calls to `OptionParser.add_option()`, e.g. invalid option strings, unknown
option attributes, missing option attributes, etc.  These are dealt with in the
usual way: raise an exception (either `optparse.OptionError` or
`TypeError`) and let the program crash.

Handling user errors is much more important, since they are guaranteed to happen
no matter how stable your code is.  `optparse` can automatically detect
some user errors, such as bad option arguments (passing `-n 4x` where
`-n` takes an integer argument), missing arguments (`-n` at the end
of the command line, where `-n` takes an argument of any type).  Also,
you can call `OptionParser.error()` to signal an application-defined error
condition:

```
(options, args) = parser.parse_args()
...
if options.a and options.b:
    parser.error("options -a and -b are mutually exclusive")
```

In either case, `optparse` handles the error the same way: it prints the
program's usage message and an error message to standard error and exits with
error status 2.

Consider the first example above, where the user passes `4x` to an option
that takes an integer:

```shell-session
$ /usr/bin/foo -n 4x
Usage: foo [options]

foo: error: option -n: invalid integer value: '4x'
```

Or, where the user fails to pass a value at all:

```shell-session
$ /usr/bin/foo -n
Usage: foo [options]

foo: error: -n option requires an argument
```

`optparse`-generated error messages take care always to mention the
option involved in the error; be sure to do the same when calling
`OptionParser.error()` from your application code.

If `optparse`'s default error-handling behaviour does not suit your needs,
you'll need to subclass OptionParser and override its `exit()`
and/or `error()` methods.

### Putting it all together

Here's what `optparse`-based scripts usually look like:

```
from optparse import OptionParser
...
def main():
    usage = "usage: %prog [options] arg"
    parser = OptionParser(usage)
    parser.add_option("-f", "--file", dest="filename",
                      help="read data from FILENAME")
    parser.add_option("-v", "--verbose",
                      action="store_true", dest="verbose")
    parser.add_option("-q", "--quiet",
                      action="store_false", dest="verbose")
    ...
    (options, args) = parser.parse_args()
    if len(args) != 1:
        parser.error("incorrect number of arguments")
    if options.verbose:
        print("reading %s..." % options.filename)
    ...

if __name__ == "__main__":
    main()
```
