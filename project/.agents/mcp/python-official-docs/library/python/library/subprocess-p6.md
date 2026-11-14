---
title: "subprocess --- Subprocess management (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/subprocess.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# subprocess --- Subprocess management (part 6 of 6)

## Legacy Shell Invocation Functions

This module also provides the following legacy functions from the 2.x
`commands` module. These operations implicitly invoke the system shell and
none of the guarantees described above regarding security and exception
handling consistency are valid for these functions.

### `getstatusoutput(cmd, *, encoding=None, errors=None)`

Return `(exitcode, output)` of executing *cmd* in a shell.

Execute the string *cmd* in a shell with `check_output()` and
return a 2-tuple `(exitcode, output)`.
*encoding* and *errors* are used to decode output;
see the notes on frequently-used-arguments for more details.

A trailing newline is stripped from the output.
The exit code for the command can be interpreted as the return code
of subprocess.  Example:

```
>>> subprocess.getstatusoutput('ls /bin/ls')
(0, '/bin/ls')
>>> subprocess.getstatusoutput('cat /bin/junk')
(1, 'cat: /bin/junk: No such file or directory')
>>> subprocess.getstatusoutput('/bin/junk')
(127, 'sh: /bin/junk: not found')
>>> subprocess.getstatusoutput('/bin/kill $$')
(-15, '')
```

> **Availability:** Unix, Windows.

> *Changed in version 3.3.4.*
> Windows support was added.
> The function now returns (exitcode, output) instead of (status, output)
> as it did in Python 3.3.3 and earlier.  exitcode has the same value as
> `returncode`.

> *Changed in version 3.11.*
> Added the *encoding* and *errors* parameters.

### `getoutput(cmd, *, encoding=None, errors=None)`

Return output (stdout and stderr) of executing *cmd* in a shell.

Like `getstatusoutput()`, except the exit code is ignored and the return
value is a string containing the command's output.  Example:

```
>>> subprocess.getoutput('ls /bin/ls')
'/bin/ls'
```

> **Availability:** Unix, Windows.

> *Changed in version 3.3.4.*
> Windows support added

> *Changed in version 3.11.*
> Added the *encoding* and *errors* parameters.

## Notes

### Timeout Behavior

When using the `timeout` parameter in functions like `run()`,
`Popen.wait()`, or `Popen.communicate()`,
users should be aware of the following behaviors:

1. **Process Creation Delay**: The initial process creation itself cannot be interrupted
on many platform APIs. This means that even when specifying a timeout, you are not
guaranteed to see a timeout exception until at least after however long process
creation takes.

1. **Extremely Small Timeout Values**: Setting very small timeout values (such as a few
milliseconds) may result in almost immediate `TimeoutExpired` exceptions because
process creation and system scheduling inherently require time.

### Converting an argument sequence to a string on Windows

On Windows, an *args* sequence is converted to a string that can be parsed
using the following rules (which correspond to the rules used by the MS C
runtime):

1. Arguments are delimited by white space, which is either a
space or a tab.

1. A string surrounded by double quotation marks is
interpreted as a single argument, regardless of white space
contained within.  A quoted string can be embedded in an
argument.

1. A double quotation mark preceded by a backslash is
interpreted as a literal double quotation mark.

1. Backslashes are interpreted literally, unless they
immediately precede a double quotation mark.

1. If backslashes immediately precede a double quotation mark,
every pair of backslashes is interpreted as a literal
backslash.  If the number of backslashes is odd, the last
backslash escapes the next double quotation mark as
described in rule 3.

> **See also:** `shlex`
> Module which provides function to parse and escape command lines.

### Disable use of `posix_spawn()`

On Linux, `subprocess` defaults to using the `vfork()` system call
internally when it is safe to do so rather than `fork()`. This greatly
improves performance.

```
subprocess._USE_POSIX_SPAWN = False  # See CPython issue gh-NNNNNN.
```

It is safe to set this to false on any Python version. It will have no
effect on older or newer versions where unsupported. Do not assume the attribute
is available to read. Despite the name, a true value does not indicate the
corresponding function will be used, only that it may be.

Please file issues any time you have to use these private knobs with a way to
reproduce the issue you were seeing. Link to that issue from a comment in your
code.

> *Added in version 3.8.*
