---
title: "pdb --- The Python Debugger (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pdb.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pdb --- The Python Debugger (part 2 of 3)

## Debugger commands

The commands recognized by the debugger are listed below.  Most commands can be
abbreviated to one or two letters as indicated; e.g. `h(elp)` means that
either `h` or `help` can be used to enter the help command (but not `he`
or `hel`, nor `H` or `Help` or `HELP`).  Arguments to commands must be
separated by whitespace (spaces or tabs).  Optional arguments are enclosed in
square brackets (`[]`) in the command syntax; the square brackets must not be
typed.  Alternatives in the command syntax are separated by a vertical bar
(`|`).

Entering a blank line repeats the last command entered.  Exception: if the last
command was a list command, the next 11 lines are listed.

Commands that the debugger doesn't recognize are assumed to be Python statements
and are executed in the context of the program being debugged.  Python
statements can also be prefixed with an exclamation point (`!`).  This is a
powerful way to inspect the program being debugged; it is even possible to
change a variable or call a function.  When an exception occurs in such a
statement, the exception name is printed but the debugger's state is not
changed.

> *Changed in version 3.13.*
> Expressions/Statements whose prefix is a pdb command are now correctly
> identified and executed.

The debugger supports aliases.  Aliases can have
parameters which allows one a certain level of adaptability to the context under
examination.

Multiple commands may be entered on a single line, separated by `;;`.  (A
single `;` is not used as it is the separator for multiple commands in a line
that is passed to the Python parser.)  No intelligence is applied to separating
the commands; the input is split at the first `;;` pair, even if it is in the
middle of a quoted string. A workaround for strings with double semicolons
is to use implicit string concatenation `';'';'` or `";"";"`.

To set a temporary global variable, use a *convenience variable*. A *convenience
variable* is a variable whose name starts with `$`.  For example, `$foo = 1`
sets a global variable `$foo` which you can use in the debugger session.  The
*convenience variables* are cleared when the program resumes execution so it's
less likely to interfere with your program compared to using normal variables
like `foo = 1`.

There are four preset *convenience variables*:

- `$_frame`: the current frame you are debugging
- `$_retval`: the return value if the frame is returning
- `$_exception`: the exception if the frame is raising an exception
- `$_asynctask`: the asyncio task if pdb stops in an async function

> *Added in version 3.12.*
> Added the *convenience variable* feature.

> *Added in version 3.14.*
> Added the `$_asynctask` convenience variable.

If a file `.pdbrc` exists in the user's home directory or in the current
directory, it is read with `'utf-8'` encoding and executed as if it had been
typed at the debugger prompt, with the exception that empty lines and lines
starting with `#` are ignored.  This is particularly useful for aliases.  If both
files exist, the one in the home directory is read first and aliases defined there
can be overridden by the local file.

> *Changed in version 3.2.*
> `.pdbrc` can now contain commands that continue debugging, such as
> continue or next.  Previously, these commands had no
> effect.

> *Changed in version 3.11.*
> `.pdbrc` is now read with `'utf-8'` encoding. Previously, it was read
> with the system locale encoding.

### pdbcommand `h(elp) [command]`

Without argument, print the list of available commands.  With a *command* as
argument, print help about that command.  `help pdb` displays the full
documentation (the docstring of the `pdb` module).  Since the *command*
argument must be an identifier, `help exec` must be entered to get help on
the `!` command.

### pdbcommand `w(here) [count]`

Print a stack trace, with the most recent frame at the bottom.  if *count*
is 0, print the current frame entry. If *count* is negative, print the least
recent - *count* frames. If *count* is positive, print the most recent
*count* frames.  An arrow (`>`)
indicates the current frame, which determines the context of most commands.

> *Changed in version 3.14.*
> *count* argument is added.

### pdbcommand `d(own) [count]`

Move the current frame *count* (default one) levels down in the stack trace
(to a newer frame).

### pdbcommand `u(p) [count]`

Move the current frame *count* (default one) levels up in the stack trace (to
an older frame).

### pdbcommand `b(reak) [([filename:]lineno | function) [, condition]]`

With a *lineno* argument, set a break at line *lineno* in the current file.
The line number may be prefixed with a *filename* and a colon,
to specify a breakpoint in another file (possibly one that hasn't been loaded
yet).  The file is searched on `sys.path`.  Acceptable forms of *filename*
are `/abspath/to/file.py`, `relpath/file.py`, `module` and
`package.module`.

With a *function* argument, set a break at the first executable statement within
that function. *function* can be any expression that evaluates to a function
in the current namespace.

If a second argument is present, it is an expression which must evaluate to
true before the breakpoint is honored.

Without argument, list all breaks, including for each breakpoint, the number
of times that breakpoint has been hit, the current ignore count, and the
associated condition if any.

Each breakpoint is assigned a number to which all the other
breakpoint commands refer.

### pdbcommand `tbreak [([filename:]lineno | function) [, condition]]`

Temporary breakpoint, which is removed automatically when it is first hit.
The arguments are the same as for break.

### pdbcommand `cl(ear) [filename:lineno | bpnumber ...]`

With a *filename:lineno* argument, clear all the breakpoints at this line.
With a space separated list of breakpoint numbers, clear those breakpoints.
Without argument, clear all breaks (but first ask confirmation).

### pdbcommand `disable bpnumber [bpnumber ...]`

Disable the breakpoints given as a space separated list of breakpoint
numbers.  Disabling a breakpoint means it cannot cause the program to stop
execution, but unlike clearing a breakpoint, it remains in the list of
breakpoints and can be (re-)enabled.

### pdbcommand `enable bpnumber [bpnumber ...]`

Enable the breakpoints specified.

### pdbcommand `ignore bpnumber [count]`

Set the ignore count for the given breakpoint number.  If *count* is omitted,
the ignore count is set to 0.  A breakpoint becomes active when the ignore
count is zero.  When non-zero, the *count* is decremented each time the
breakpoint is reached and the breakpoint is not disabled and any associated
condition evaluates to true.

### pdbcommand `condition bpnumber [condition]`

Set a new *condition* for the breakpoint, an expression which must evaluate
to true before the breakpoint is honored.  If *condition* is absent, any
existing condition is removed; i.e., the breakpoint is made unconditional.

### pdbcommand `commands [bpnumber]`

Specify a list of commands for breakpoint number *bpnumber*.  The commands
themselves appear on the following lines.  Type a line containing just
`end` to terminate the commands. An example:

```
(Pdb) commands 1
(com) p some_variable
(com) end
(Pdb)
```

To remove all commands from a breakpoint, type `commands` and follow it
immediately with `end`; that is, give no commands.

With no *bpnumber* argument, `commands` refers to the most recently set
breakpoint that still exists.

You can use breakpoint commands to start your program up again.  Simply use
the continue command, or step,
or any other command that resumes execution.

Specifying any command resuming execution
(currently continue, step, next,
return, until, jump, quit and their abbreviations)
terminates the command list (as if
that command was immediately followed by end). This is because any time you
resume execution (even with a simple next or step), you may encounter another
breakpoint—which could have its own command list, leading to ambiguities about
which list to execute.

If the list of commands contains the `silent` command, or a command that
resumes execution, then the breakpoint message containing information about
the frame is not displayed.

> *Changed in version 3.14.*
> Frame information will not be displayed if a command that resumes execution
> is present in the command list.

### pdbcommand `s(tep)`

Execute the current line, stop at the first possible occasion (either in a
function that is called or on the next line in the current function).

### pdbcommand `n(ext)`

Continue execution until the next line in the current function is reached or
it returns.  (The difference between next and step is
that step stops inside a called function, while next
executes called functions at (nearly) full speed, only stopping at the next
line in the current function.)

### pdbcommand `unt(il) [lineno]`

Without argument, continue execution until the line with a number greater
than the current one is reached.

With *lineno*, continue execution until a line with a number greater or
equal to *lineno* is reached.  In both cases, also stop when the current frame
returns.

> *Changed in version 3.2.*
> Allow giving an explicit line number.

### pdbcommand `r(eturn)`

Continue execution until the current function returns.

### pdbcommand `c(ont(inue))`

Continue execution, only stop when a breakpoint is encountered.

### pdbcommand `j(ump) lineno`

Set the next line that will be executed.  Only available in the bottom-most
frame.  This lets you jump back and execute code again, or jump forward to
skip code that you don't want to run.

It should be noted that not all jumps are allowed -- for instance it is not
possible to jump into the middle of a `for` loop or out of a
`finally` clause.

### pdbcommand `l(ist) [first[, last]]`

List source code for the current file.  Without arguments, list 11 lines
around the current line or continue the previous listing.  With `.` as
argument, list 11 lines around the current line.  With one argument,
list 11 lines around at that line.  With two arguments, list the given range;
if the second argument is less than the first, it is interpreted as a count.

The current line in the current frame is indicated by `->`.  If an
exception is being debugged, the line where the exception was originally
raised or propagated is indicated by `>>`, if it differs from the current
line.

> *Changed in version 3.2.*
> Added the `>>` marker.

### pdbcommand `ll | longlist`

List all source code for the current function or frame.  Interesting lines
are marked as for list.

> *Added in version 3.2.*

### pdbcommand `a(rgs)`

Print the arguments of the current function and their current values.

### pdbcommand `p expression`

Evaluate *expression* in the current context and print its value.

> **Note:** `print()` can also be used, but is not a debugger command --- this executes the
> Python `print()` function.

### pdbcommand `pp expression`

Like the p command, except the value of *expression* is
pretty-printed using the `pprint` module.

### pdbcommand `whatis expression`

Print the type of *expression*.

### pdbcommand `source expression`

Try to get source code of *expression* and display it.

> *Added in version 3.2.*

### pdbcommand `display [expression]`

Display the value of *expression* if it changed, each time execution stops
in the current frame.

Without *expression*, list all display expressions for the current frame.

> **Note:** Display evaluates *expression* and compares to the result of the previous
> evaluation of *expression*, so when the result is mutable, display may not
> be able to pick up the changes.

Example:

```
lst = []
breakpoint()
pass
lst.append(1)
print(lst)
```

Display won't realize `lst` has been changed because the result of evaluation
is modified in place by `lst.append(1)` before being compared:

```
> example.py(3)<module>()
-> pass
(Pdb) display lst
display lst: []
(Pdb) n
> example.py(4)<module>()
-> lst.append(1)
(Pdb) n
> example.py(5)<module>()
-> print(lst)
(Pdb)
```

You can do some tricks with copy mechanism to make it work:

```
> example.py(3)<module>()
-> pass
(Pdb) display lst[:]
display lst[:]: []
(Pdb) n
> example.py(4)<module>()
-> lst.append(1)
(Pdb) n
> example.py(5)<module>()
-> print(lst)
display lst[:]: [1]  [old: []]
(Pdb)
```

> *Added in version 3.2.*

### pdbcommand `undisplay [expression]`

Do not display *expression* anymore in the current frame.  Without
*expression*, clear all display expressions for the current frame.

> *Added in version 3.2.*

### pdbcommand `interact`

Start an interactive interpreter (using the `code` module) in a new
global namespace initialised from the local and global namespaces for the
current scope. Use `exit()` or `quit()` to exit the interpreter and
return to the debugger.

> **Note:** As `interact` creates a new dedicated namespace for code execution,
> assignments to variables will not affect the original namespaces.
> However, modifications to any referenced mutable objects will be reflected
> in the original namespaces as usual.

> *Added in version 3.2.*

> *Changed in version 3.13.*
> `exit()` and `quit()` can be used to exit the interact
> command.

> *Changed in version 3.13.*
> interact directs its output to the debugger's
> output channel rather than `sys.stderr`.

### pdbcommand `alias [name [command]]`

Create an alias called *name* that executes *command*.  The *command* must
*not* be enclosed in quotes.  Replaceable parameters can be indicated by
`%1`, `%2`, ... and `%9`, while `%*` is replaced by all the parameters.
If *command* is omitted, the current alias for *name* is shown. If no
arguments are given, all aliases are listed.

Aliases may be nested and can contain anything that can be legally typed at
the pdb prompt.  Note that internal pdb commands *can* be overridden by
aliases.  Such a command is then hidden until the alias is removed.  Aliasing
is recursively applied to the first word of the command line; all other words
in the line are left alone.

As an example, here are two useful aliases (especially when placed in the
`.pdbrc` file):

```
# Print instance variables (usage "pi classInst")
alias pi for k in %1.__dict__.keys(): print(f"%1.{k} = {%1.__dict__[k]}")
# Print instance variables in self
alias ps pi self
```

### pdbcommand `unalias name`

Delete the specified alias *name*.

### pdbcommand `! statement`

Execute the (one-line) *statement* in the context of the current stack frame.
The exclamation point can be omitted unless the first word of the statement
resembles a debugger command, e.g.:

```none
(Pdb) ! n=42
(Pdb)
```

To set a global variable, you can prefix the assignment command with a
`global` statement on the same line, e.g.:

```none
(Pdb) global list_options; list_options = ['-l']
(Pdb)
```
