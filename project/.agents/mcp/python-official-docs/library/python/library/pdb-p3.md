---
title: "pdb --- The Python Debugger (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pdb.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pdb --- The Python Debugger (part 3 of 3)

### pdbcommand `run [args ...]`

```python
restart [args ...]
```

Restart the debugged Python program.  If *args* is supplied, it is split
with `shlex` and the result is used as the new `sys.argv`.
History, breakpoints, actions and debugger options are preserved.
restart is an alias for run.

> *Changed in version 3.14.*
> run and restart commands are disabled when the
> debugger is invoked in `'inline'` mode.

### pdbcommand `q(uit)`

Quit from the debugger.  The program being executed is aborted.
An end-of-file input is equivalent to quit.

A confirmation prompt will be shown if the debugger is invoked in
`'inline'` mode. Either `y`, `Y`, `<Enter>` or `EOF`
will confirm the quit.

> *Changed in version 3.14.*
> A confirmation prompt will be shown if the debugger is invoked in
> `'inline'` mode. After the confirmation, the debugger will call
> `sys.exit()` immediately, instead of raising `bdb.BdbQuit`
> in the next trace event.

### pdbcommand `debug code`

Enter a recursive debugger that steps through *code*
(which is an arbitrary expression or statement to be
executed in the current environment).

### pdbcommand `retval`

Print the return value for the last return of the current function.

### pdbcommand `exceptions [excnumber]`

List or jump between chained exceptions.

When using `pdb.pm()`  or `Pdb.post_mortem(...)` with a chained exception
instead of a traceback, it allows the user to move between the
chained exceptions using `exceptions` command to list exceptions, and
`exceptions <number>` to switch to that exception.

Example:

```
def out():
    try:
        middle()
    except Exception as e:
        raise ValueError("reraise middle() error") from e

def middle():
    try:
        return inner(0)
    except Exception as e:
        raise ValueError("Middle fail")

def inner(x):
    1 / x

out()
```

calling `pdb.pm()` will allow to move between exceptions:

```
> example.py(5)out()
-> raise ValueError("reraise middle() error") from e

(Pdb) exceptions
  0 ZeroDivisionError('division by zero')
  1 ValueError('Middle fail')
> 2 ValueError('reraise middle() error')

(Pdb) exceptions 0
> example.py(16)inner()
-> 1 / x

(Pdb) up
> example.py(10)middle()
-> return inner(0)
```

> *Added in version 3.13.*

**Footnotes**
