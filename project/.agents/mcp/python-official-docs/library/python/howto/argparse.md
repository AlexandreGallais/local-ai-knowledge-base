---
title: "Argparse Tutorial (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Argparse Tutorial

This tutorial is intended to be a gentle introduction to `argparse`, the
recommended command-line parsing module in the Python standard library.

> **Note:** The standard library includes two other libraries directly related
> to command-line parameter processing: the lower level `optparse`
> module (which may require more code to configure for a given application,
> but also allows an application to request behaviors that `argparse`
> doesn't support), and the very low level `getopt` (which specifically
> serves as an equivalent to the `getopt` family of functions
> available to C programmers).
> While neither of those modules is covered directly in this guide, many of
> the core concepts in `argparse` first originated in `optparse`, so
> some aspects of this tutorial will also be relevant to `optparse` users.

## Concepts

Let's show the sort of functionality that we are going to explore in this
introductory tutorial by making use of the ls command:

```shell-session
$ ls
cpython  devguide  prog.py  pypy  rm-unused-function.patch
$ ls pypy
ctypes_configure  demo  dotviewer  include  lib_pypy  lib-python ...
$ ls -l
total 20
drwxr-xr-x 19 wena wena 4096 Feb 18 18:51 cpython
drwxr-xr-x  4 wena wena 4096 Feb  8 12:04 devguide
-rwxr-xr-x  1 wena wena  535 Feb 19 00:05 prog.py
drwxr-xr-x 14 wena wena 4096 Feb  7 00:59 pypy
-rw-r--r--  1 wena wena  741 Feb 18 01:01 rm-unused-function.patch
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.
...
```

A few concepts we can learn from the four commands:

- The ls command is useful when run without any options at all. It defaults
to displaying the contents of the current directory.

- If we want beyond what it provides by default, we tell it a bit more. In
this case, we want it to display a different directory, `pypy`.
What we did is specify what is known as a positional argument. It's named so
because the program should know what to do with the value, solely based on
where it appears on the command line. This concept is more relevant
to a command like cp, whose most basic usage is `cp SRC DEST`.
The first position is *what you want copied,* and the second
position is *where you want it copied to*.

- Now, say we want to change behaviour of the program. In our example,
we display more info for each file instead of just showing the file names.
The `-l` in that case is known as an optional argument.

- That's a snippet of the help text. It's very useful in that you can
come across a program you have never used before, and can figure out
how it works simply by reading its help text.

## The basics

Let us start with a very simple example which does (almost) nothing:

```
import argparse
parser = argparse.ArgumentParser()
parser.parse_args()
```

Following is a result of running the code:

```shell-session
$ python prog.py
$ python prog.py --help
usage: prog.py [-h]

options:
  -h, --help  show this help message and exit
$ python prog.py --verbose
usage: prog.py [-h]
prog.py: error: unrecognized arguments: --verbose
$ python prog.py foo
usage: prog.py [-h]
prog.py: error: unrecognized arguments: foo
```

Here is what is happening:

- Running the script without any options results in nothing displayed to
stdout. Not so useful.

- The second one starts to display the usefulness of the `argparse`
module. We have done almost nothing, but already we get a nice help message.

- The `--help` option, which can also be shortened to `-h`, is the only
option we get for free (i.e. no need to specify it). Specifying anything
else results in an error. But even then, we do get a useful usage message,
also for free.

## Introducing Positional arguments

An example:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("echo")
args = parser.parse_args()
print(args.echo)
```

And running the code:

```shell-session
$ python prog.py
usage: prog.py [-h] echo
prog.py: error: the following arguments are required: echo
$ python prog.py --help
usage: prog.py [-h] echo

positional arguments:
  echo

options:
  -h, --help  show this help message and exit
$ python prog.py foo
foo
```

Here is what's happening:

- We've added the `add_argument()` method, which is what we use to specify
which command-line options the program is willing to accept. In this case,
I've named it `echo` so that it's in line with its function.

- Calling our program now requires us to specify an option.

- The `parse_args()` method actually returns some data from the
options specified, in this case, `echo`.

- The variable is some form of 'magic' that `argparse` performs for free
(i.e. no need to specify which variable that value is stored in).
You will also notice that its name matches the string argument given
to the method, `echo`.

Note however that, although the help display looks nice and all, it currently
is not as helpful as it can be. For example we see that we got `echo` as a
positional argument, but we don't know what it does, other than by guessing or
by reading the source code. So, let's make it a bit more useful:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("echo", help="echo the string you use here")
args = parser.parse_args()
print(args.echo)
```

And we get:

```shell-session
$ python prog.py -h
usage: prog.py [-h] echo

positional arguments:
  echo        echo the string you use here

options:
  -h, --help  show this help message and exit
```

Now, how about doing something even more useful:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("square", help="display a square of a given number")
args = parser.parse_args()
print(args.square**2)
```

Following is a result of running the code:

```shell-session
$ python prog.py 4
Traceback (most recent call last):
  File "prog.py", line 5, in <module>
    print(args.square**2)
TypeError: unsupported operand type(s) for ** or pow(): 'str' and 'int'
```

That didn't go so well. That's because `argparse` treats the options we
give it as strings, unless we tell it otherwise. So, let's tell
`argparse` to treat that input as an integer:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("square", help="display a square of a given number",
                    type=int)
args = parser.parse_args()
print(args.square**2)
```

Following is a result of running the code:

```shell-session
$ python prog.py 4
16
$ python prog.py four
usage: prog.py [-h] square
prog.py: error: argument square: invalid int value: 'four'
```

That went well. The program now even helpfully quits on bad illegal input
before proceeding.

## Introducing Optional arguments

So far we have been playing with positional arguments. Let us
have a look on how to add optional ones:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--verbosity", help="increase output verbosity")
args = parser.parse_args()
if args.verbosity:
    print("verbosity turned on")
```

And the output:

```shell-session
$ python prog.py --verbosity 1
verbosity turned on
$ python prog.py
$ python prog.py --help
usage: prog.py [-h] [--verbosity VERBOSITY]

options:
  -h, --help            show this help message and exit
  --verbosity VERBOSITY
                        increase output verbosity
$ python prog.py --verbosity
usage: prog.py [-h] [--verbosity VERBOSITY]
prog.py: error: argument --verbosity: expected one argument
```

Here is what is happening:

- The program is written so as to display something when `--verbosity` is
specified and display nothing when not.

- To show that the option is actually optional, there is no error when running
the program without it. Note that by default, if an optional argument isn't
used, the relevant variable, in this case `args.verbosity`, is
given `None` as a value, which is the reason it fails the truth
test of the `if` statement.

- The help message is a bit different.

- When using the `--verbosity` option, one must also specify some value,
any value.

The above example accepts arbitrary integer values for `--verbosity`, but for
our simple program, only two values are actually useful, `True` or `False`.
Let's modify the code accordingly:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--verbose", help="increase output verbosity",
                    action="store_true")
args = parser.parse_args()
if args.verbose:
    print("verbosity turned on")
```

And the output:

```shell-session
$ python prog.py --verbose
verbosity turned on
$ python prog.py --verbose 1
usage: prog.py [-h] [--verbose]
prog.py: error: unrecognized arguments: 1
$ python prog.py --help
usage: prog.py [-h] [--verbose]

options:
  -h, --help  show this help message and exit
  --verbose   increase output verbosity
```

Here is what is happening:

- The option is now more of a flag than something that requires a value.
We even changed the name of the option to match that idea.
Note that we now specify a new keyword, `action`, and give it the value
`"store_true"`. This means that, if the option is specified,
assign the value `True` to `args.verbose`.
Not specifying it implies `False`.

- It complains when you specify a value, in true spirit of what flags
actually are.

- Notice the different help text.

### Short options

If you are familiar with command line usage,
you will notice that I haven't yet touched on the topic of short
versions of the options. It's quite simple:

```
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("-v", "--verbose", help="increase output verbosity",
                    action="store_true")
args = parser.parse_args()
if args.verbose:
    print("verbosity turned on")
```

And here goes:

```shell-session
$ python prog.py -v
verbosity turned on
$ python prog.py --help
usage: prog.py [-h] [-v]

options:
  -h, --help     show this help message and exit
  -v, --verbose  increase output verbosity
```

Note that the new ability is also reflected in the help text.
