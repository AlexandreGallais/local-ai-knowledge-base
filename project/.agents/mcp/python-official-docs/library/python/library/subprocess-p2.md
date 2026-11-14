---
title: "subprocess --- Subprocess management (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/subprocess.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# subprocess --- Subprocess management (part 2 of 6)

## Using the `subprocess` Module

The recommended approach to invoking subprocesses is to use the `run()`
function for all use cases it can handle. For more advanced use cases, the
underlying `Popen` interface can be used directly.

### `run(args, *, stdin=None, input=None, stdout=None, stderr=None,\`

```python
capture_output=False, shell=False, cwd=None, timeout=None, \
check=False, encoding=None, errors=None, text=None, env=None, \
universal_newlines=None, **other_popen_kwargs)
```

Run the command described by *args*.  Wait for command to complete, then
return a `CompletedProcess` instance.

The arguments shown above are merely the most common ones, described below
in frequently-used-arguments (hence the use of keyword-only notation
in the abbreviated signature). The full function signature is largely the
same as that of the `Popen` constructor - most of the arguments to
this function are passed through to that interface. (*timeout*,  *input*,
*check*, and *capture_output* are not.)

If *capture_output* is true, stdout and stderr will be captured.
When used, the internal `Popen` object is automatically created with
*stdout* and *stderr* both set to `PIPE`.
The *stdout* and *stderr* arguments may not be supplied at the same time as *capture_output*.
If you wish to capture and combine both streams into one,
set *stdout* to `PIPE`
and *stderr* to `STDOUT`,
instead of using *capture_output*.

A *timeout* may be specified in seconds, it is internally passed on to
`Popen.communicate()`. If the timeout expires, the child process will be
killed and waited for. The `TimeoutExpired` exception will be
re-raised after the child process has terminated. The initial process
creation itself cannot be interrupted on many platform APIs so you are not
guaranteed to see a timeout exception until at least after however long
process creation takes.

The *input* argument is passed to `Popen.communicate()` and thus to the
subprocess's stdin.  If used it must be a byte sequence, or a string if
*encoding* or *errors* is specified or *text* is true.  When
used, the internal `Popen` object is automatically created with
*stdin* set to `PIPE`,
and the *stdin* argument may not be used as well.

If *check* is true, and the process exits with a non-zero exit code, a
`CalledProcessError` exception will be raised. Attributes of that
exception hold the arguments, the exit code, and stdout and stderr if they
were captured.

If *encoding* or *errors* are specified, or *text* is true,
file objects for stdin, stdout and stderr are opened in text mode using the
specified *encoding* and *errors* or the `io.TextIOWrapper` default.
The *universal_newlines* argument is equivalent  to *text* and is provided
for backwards compatibility. By default, file objects are opened in binary mode.

If *env* is not `None`, it must be a mapping that defines the environment
variables for the new process; these are used instead of the default
behavior of inheriting the current process' environment. It is passed
directly to `Popen`. This mapping can be str to str on any platform
or bytes to bytes on POSIX platforms much like `os.environ` or
`os.environb`.

Examples:

```
>>> subprocess.run(["ls", "-l"])  # doesn't capture output
CompletedProcess(args=['ls', '-l'], returncode=0)

>>> subprocess.run("exit 1", shell=True, check=True)
Traceback (most recent call last):
  ...
subprocess.CalledProcessError: Command 'exit 1' returned non-zero exit status 1

>>> subprocess.run(["ls", "-l", "/dev/null"], capture_output=True)
CompletedProcess(args=['ls', '-l', '/dev/null'], returncode=0,
stdout=b'crw-rw-rw- 1 root root 1, 3 Jan 23 16:23 /dev/null\n', stderr=b'')
```

> *Added in version 3.5.*

> *Changed in version 3.6.*
> Added *encoding* and *errors* parameters

> *Changed in version 3.7.*
> Added the *text* parameter, as a more understandable alias of *universal_newlines*.
> Added the *capture_output* parameter.

> *Changed in version 3.12.*
> Changed Windows shell search order for `shell=True`. The current
> directory and `%PATH%` are replaced with `%COMSPEC%` and
> `%SystemRoot%\System32\cmd.exe`. As a result, dropping a
> malicious program named `cmd.exe` into a current directory no
> longer works.

### class `CompletedProcess`

The return value from `run()`, representing a process that has finished.

### `args`

The arguments used to launch the process. This may be a list or a string.

### `returncode`

Exit status of the child process. Typically, an exit status of 0 indicates
that it ran successfully.

A negative value `-N` indicates that the child was terminated by signal
`N` (POSIX only).

### `stdout`

Captured stdout from the child process. A bytes sequence, or a string if
`run()` was called with an encoding, errors, or text=True.
`None` if stdout was not captured.

If you ran the process with `stderr=subprocess.STDOUT`, stdout and
stderr will be combined in this attribute, and `stderr` will be
`None`.

### `stderr`

Captured stderr from the child process. A bytes sequence, or a string if
`run()` was called with an encoding, errors, or text=True.
`None` if stderr was not captured.

### `check_returncode()`

If `returncode` is non-zero, raise a `CalledProcessError`.

> *Added in version 3.5.*

### `DEVNULL`

Special value that can be used as the *stdin*, *stdout* or *stderr* argument
to `Popen` and indicates that the special file `os.devnull`
will be used.

> *Added in version 3.3.*

### `PIPE`

Special value that can be used as the *stdin*, *stdout* or *stderr* argument
to `Popen` and indicates that a pipe to the standard stream should be
opened.  Most useful with `Popen.communicate()`.

### `STDOUT`

Special value that can be used as the *stderr* argument to `Popen` and
indicates that standard error should go into the same handle as standard
output.

### exception `SubprocessError`

Base class for all other exceptions from this module.

> *Added in version 3.3.*

### exception `TimeoutExpired`

Subclass of `SubprocessError`, raised when a timeout expires
while waiting for a child process.

### `cmd`

Command that was used to spawn the child process.

### `timeout`

Timeout in seconds.

### `output`

Output of the child process if it was captured by `run()` or
`check_output()`.  Otherwise, `None`.  This is always
`bytes` when any output was captured regardless of the
`text=True` setting.  It may remain `None` instead of `b''`
when no output was observed.

### `stdout`

Alias for output, for symmetry with `stderr`.

### `stderr`

Stderr output of the child process if it was captured by `run()`.
Otherwise, `None`.  This is always `bytes` when stderr output
was captured regardless of the `text=True` setting.  It may remain
`None` instead of `b''` when no stderr output was observed.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> *stdout* and *stderr* attributes added

### exception `CalledProcessError`

Subclass of `SubprocessError`, raised when a process run by
`check_call()`, `check_output()`, or `run()` (with `check=True`)
returns a non-zero exit status.

### `returncode`

Exit status of the child process, an integer.  If the process
exited due to a signal, this will be the negative signal number.

### `cmd`

Command that was used to spawn the child process.

### `output`

Output of the child process if it was captured by `run()` or
`check_output()`.  Otherwise, `None`.

### `stdout`

Alias for output, for symmetry with `stderr`.

### `stderr`

Stderr output of the child process if it was captured by `run()`.
Otherwise, `None`.

> *Changed in version 3.5.*
> *stdout* and *stderr* attributes added

### Frequently Used Arguments

To support a wide variety of use cases, the `Popen` constructor (and
the convenience functions) accept a large number of optional arguments. For
most typical use cases, many of these arguments can be safely left at their
default values. The arguments that are most commonly needed are:

*args* is required for all calls and should be a string, or a sequence of
program arguments. Providing a sequence of arguments is generally
preferred, as it allows the module to take care of any required escaping
and quoting of arguments (e.g. to permit spaces in file names). If passing
a single string, either *shell* must be `True` (see below) or else
the string must simply name the program to be executed without specifying
any arguments.

*stdin*, *stdout* and *stderr* specify the executed program's standard input,
standard output and standard error file handles, respectively.  Valid values
are `None`, `PIPE`, `DEVNULL`, an existing file descriptor (a
positive integer), and an existing file object with a valid file
descriptor.  With the default settings of `None`, no redirection will
occur.  `PIPE` indicates that a new pipe to the child should be
created.  `DEVNULL` indicates that the special file `os.devnull`
will be used.  Additionally, *stderr* can be `STDOUT`, which indicates
that the stderr data from the child process should be captured into the same
file handle as for *stdout*.

If *encoding* or *errors* are specified, or *text* (also known as
*universal_newlines*) is true,
the file objects *stdin*, *stdout* and *stderr* will be opened in text
mode using the *encoding* and *errors* specified in the call or the
defaults for `io.TextIOWrapper`.

For *stdin*, line ending characters `'\n'` in the input will be converted
to the default line separator `os.linesep`. For *stdout* and *stderr*,
all line endings in the output will be converted to `'\n'`.  For more
information see the documentation of the `io.TextIOWrapper` class
when the *newline* argument to its constructor is `None`.

If text mode is not used, *stdin*, *stdout* and *stderr* will be opened as
binary streams. No encoding or line ending conversion is performed.

> *Changed in version 3.6.*
> Added the *encoding* and *errors* parameters.

> *Changed in version 3.7.*
> Added the *text* parameter as an alias for *universal_newlines*.

> **Note:** The newlines attribute of the file objects `Popen.stdin`,
> `Popen.stdout` and `Popen.stderr` are not updated by
> the `Popen.communicate()` method.

If *shell* is `True`, the specified command will be executed through
the shell.  This can be useful if you are using Python primarily for the
enhanced control flow it offers over most system shells and still want
convenient access to other shell features such as shell pipes, filename
wildcards, environment variable expansion, and expansion of `~` to a
user's home directory.  However, note that Python itself offers
implementations of many shell-like features (in particular, `glob`,
`fnmatch`, `os.walk()`, `os.path.expandvars()`,
`os.path.expanduser()`, and `shutil`).

> *Changed in version 3.3.*
> When *universal_newlines* is `True`, the class uses the encoding
> `locale.getpreferredencoding(False)`
> instead of `locale.getpreferredencoding()`.  See the
> `io.TextIOWrapper` class for more information on this change.

> **Note:** Read the Security Considerations section before using `shell=True`.

These options, along with all of the other options, are described in more
detail in the `Popen` constructor documentation.

### Popen Constructor

The underlying process creation and management in this module is handled by
the `Popen` class. It offers a lot of flexibility so that developers
are able to handle the less common cases not covered by the convenience
functions.
