---
title: "subprocess --- Subprocess management (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/subprocess.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# subprocess --- Subprocess management (part 5 of 6)

## Windows Popen Helpers

The `STARTUPINFO` class and following constants are only available
on Windows.

### class `STARTUPINFO(*, dwFlags=0, hStdInput=None, hStdOutput=None, \`

```python
hStdError=None, wShowWindow=0, lpAttributeList=None)
```

Partial support of the Windows
STARTUPINFO
structure is used for `Popen` creation.  The following attributes can
be set by passing them as keyword-only arguments.

> *Changed in version 3.7.*
> Keyword-only argument support was added.

### `dwFlags`

A bit field that determines whether certain `STARTUPINFO`
attributes are used when the process creates a window.:

```
si = subprocess.STARTUPINFO()
si.dwFlags = subprocess.STARTF_USESTDHANDLES | subprocess.STARTF_USESHOWWINDOW
```

### `hStdInput`

If `dwFlags` specifies `STARTF_USESTDHANDLES`, this attribute
is the standard input handle for the process. If
`STARTF_USESTDHANDLES` is not specified, the default for standard
input is the keyboard buffer.

### `hStdOutput`

If `dwFlags` specifies `STARTF_USESTDHANDLES`, this attribute
is the standard output handle for the process. Otherwise, this attribute
is ignored and the default for standard output is the console window's
buffer.

### `hStdError`

If `dwFlags` specifies `STARTF_USESTDHANDLES`, this attribute
is the standard error handle for the process. Otherwise, this attribute is
ignored and the default for standard error is the console window's buffer.

### `wShowWindow`

If `dwFlags` specifies `STARTF_USESHOWWINDOW`, this attribute
can be any of the values that can be specified in the `nCmdShow`
parameter for the
ShowWindow
function, except for `SW_SHOWDEFAULT`. Otherwise, this attribute is
ignored.

`SW_HIDE` is provided for this attribute. It is used when
`Popen` is called with `shell=True`.

### `lpAttributeList`

A dictionary of additional attributes for process creation as given in
`STARTUPINFOEX`, see
UpdateProcThreadAttribute.

Supported attributes:

**handle_list**
Sequence of handles that will be inherited. *close_fds* must be true if
non-empty.

The handles must be temporarily made inheritable by
`os.set_handle_inheritable()` when passed to the `Popen`
constructor, else `OSError` will be raised with Windows error
`ERROR_INVALID_PARAMETER` (87).

> **Warning:** In a multithreaded process, use caution to avoid leaking handles
> that are marked inheritable when combining this feature with
> concurrent calls to other process creation functions that inherit
> all handles such as `os.system()`.  This also applies to
> standard handle redirection, which temporarily creates inheritable
> handles.

> *Added in version 3.7.*

### Windows Constants

The `subprocess` module exposes the following constants.

### `STD_INPUT_HANDLE`

The standard input device. Initially, this is the console input buffer,
`CONIN$`.

### `STD_OUTPUT_HANDLE`

The standard output device. Initially, this is the active console screen
buffer, `CONOUT$`.

### `STD_ERROR_HANDLE`

The standard error device. Initially, this is the active console screen
buffer, `CONOUT$`.

### `SW_HIDE`

Hides the window. Another window will be activated.

### `STARTF_USESTDHANDLES`

Specifies that the `STARTUPINFO.hStdInput`,
`STARTUPINFO.hStdOutput`, and `STARTUPINFO.hStdError` attributes
contain additional information.

### `STARTF_USESHOWWINDOW`

Specifies that the `STARTUPINFO.wShowWindow` attribute contains
additional information.

### `STARTF_FORCEONFEEDBACK`

A `STARTUPINFO.dwFlags` parameter to specify that the
*Working in Background* mouse cursor will be displayed while a
process is launching. This is the default behavior for GUI
processes.

> *Added in version 3.13.*

### `STARTF_FORCEOFFFEEDBACK`

A `STARTUPINFO.dwFlags` parameter to specify that the mouse
cursor will not be changed when launching a process.

> *Added in version 3.13.*

### `CREATE_NEW_CONSOLE`

The new process has a new console, instead of inheriting its parent's
console (the default).

### `CREATE_NEW_PROCESS_GROUP`

A `Popen` `creationflags` parameter to specify that a new process
group will be created. This flag is necessary for using `os.kill()`
on the subprocess.

This flag is ignored if `CREATE_NEW_CONSOLE` is specified.

### `ABOVE_NORMAL_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have an above average priority.

> *Added in version 3.7.*

### `BELOW_NORMAL_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have a below average priority.

> *Added in version 3.7.*

### `HIGH_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have a high priority.

> *Added in version 3.7.*

### `IDLE_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have an idle (lowest) priority.

> *Added in version 3.7.*

### `NORMAL_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have a normal priority. (default)

> *Added in version 3.7.*

### `REALTIME_PRIORITY_CLASS`

A `Popen` `creationflags` parameter to specify that a new process
will have realtime priority.
You should almost never use REALTIME_PRIORITY_CLASS, because this interrupts
system threads that manage mouse input, keyboard input, and background disk
flushing. This class can be appropriate for applications that "talk" directly
to hardware or that perform brief tasks that should have limited interruptions.

> *Added in version 3.7.*

### `CREATE_NO_WINDOW`

A `Popen` `creationflags` parameter to specify that a new process
will not create a window.

> *Added in version 3.7.*

### `DETACHED_PROCESS`

A `Popen` `creationflags` parameter to specify that a new process
will not inherit its parent's console.
This value cannot be used with CREATE_NEW_CONSOLE.

> *Added in version 3.7.*

### `CREATE_DEFAULT_ERROR_MODE`

A `Popen` `creationflags` parameter to specify that a new process
does not inherit the error mode of the calling process. Instead, the new
process gets the default error mode.
This feature is particularly useful for multithreaded shell applications
that run with hard errors disabled.

> *Added in version 3.7.*

### `CREATE_BREAKAWAY_FROM_JOB`

A `Popen` `creationflags` parameter to specify that a new process
is not associated with the job.

> *Added in version 3.7.*

## Older high-level API

Prior to Python 3.5, these three functions comprised the high level API to
subprocess. You can now use `run()` in many cases, but lots of existing code
calls these functions.

### `call(args, *, stdin=None, stdout=None, stderr=None, \`

```python
shell=False, cwd=None, timeout=None, **other_popen_kwargs)
```

Run the command described by *args*.  Wait for command to complete, then
return the `returncode` attribute.

Code needing to capture stdout or stderr should use `run()` instead:

```
run(...).returncode
```

To suppress stdout or stderr, supply a value of `DEVNULL`.

The arguments shown above are merely some common ones.
The full function signature is the
same as that of the `Popen` constructor - this function passes all
supplied arguments other than *timeout* directly through to that interface.

> **Note:** Do not use `stdout=PIPE` or `stderr=PIPE` with this
> function.  The child process will block if it generates enough
> output to a pipe to fill up the OS pipe buffer as the pipes are
> not being read from.

> *Changed in version 3.3.*
> *timeout* was added.

> *Changed in version 3.12.*
> Changed Windows shell search order for `shell=True`. The current
> directory and `%PATH%` are replaced with `%COMSPEC%` and
> `%SystemRoot%\System32\cmd.exe`. As a result, dropping a
> malicious program named `cmd.exe` into a current directory no
> longer works.

### `check_call(args, *, stdin=None, stdout=None, stderr=None, \`

```python
shell=False, cwd=None, timeout=None, \
**other_popen_kwargs)
```

Run command with arguments.  Wait for command to complete. If the return
code was zero then return, otherwise raise `CalledProcessError`. The
`CalledProcessError` object will have the return code in the
`returncode` attribute.
If `check_call()` was unable to start the process it will propagate the exception
that was raised.

Code needing to capture stdout or stderr should use `run()` instead:

```
run(..., check=True)
```

To suppress stdout or stderr, supply a value of `DEVNULL`.

The arguments shown above are merely some common ones.
The full function signature is the
same as that of the `Popen` constructor - this function passes all
supplied arguments other than *timeout* directly through to that interface.

> **Note:** Do not use `stdout=PIPE` or `stderr=PIPE` with this
> function.  The child process will block if it generates enough
> output to a pipe to fill up the OS pipe buffer as the pipes are
> not being read from.

> *Changed in version 3.3.*
> *timeout* was added.

> *Changed in version 3.12.*
> Changed Windows shell search order for `shell=True`. The current
> directory and `%PATH%` are replaced with `%COMSPEC%` and
> `%SystemRoot%\System32\cmd.exe`. As a result, dropping a
> malicious program named `cmd.exe` into a current directory no
> longer works.

### `check_output(args, *, stdin=None, stderr=None, shell=False, \`

```python
cwd=None, encoding=None, errors=None, \
universal_newlines=None, timeout=None, text=None, \
**other_popen_kwargs)
```

Run command with arguments and return its output.

If the return code was non-zero it raises a `CalledProcessError`. The
`CalledProcessError` object will have the return code in the
`returncode` attribute and any output in the
`output` attribute.

This is equivalent to:

```
run(..., check=True, stdout=PIPE).stdout
```

The arguments shown above are merely some common ones.
The full function signature is largely the same as that of `run()` -
most arguments are passed directly through to that interface.
One API deviation from `run()` behavior exists: passing `input=None`
will behave the same as `input=b''` (or `input=''`, depending on other
arguments) rather than using the parent's standard input file handle.

By default, this function will return the data as encoded bytes. The actual
encoding of the output data may depend on the command being invoked, so the
decoding to text will often need to be handled at the application level.

This behaviour may be overridden by setting *text*, *encoding*, *errors*,
or *universal_newlines* to `True` as described in
frequently-used-arguments and `run()`.

To also capture standard error in the result, use
`stderr=subprocess.STDOUT`:

```
>>> subprocess.check_output(
...     "ls non_existent_file; exit 0",
...     stderr=subprocess.STDOUT,
...     shell=True)
'ls: non_existent_file: No such file or directory\n'
```

> *Added in version 3.1.*

> *Changed in version 3.3.*
> *timeout* was added.

> *Changed in version 3.4.*
> Support for the *input* keyword argument was added.

> *Changed in version 3.6.*
> *encoding* and *errors* were added.  See `run()` for details.

> *Added in version 3.7.*
> *text* was added as a more readable alias for *universal_newlines*.

> *Changed in version 3.12.*
> Changed Windows shell search order for `shell=True`. The current
> directory and `%PATH%` are replaced with `%COMSPEC%` and
> `%SystemRoot%\System32\cmd.exe`. As a result, dropping a
> malicious program named `cmd.exe` into a current directory no
> longer works.

## Replacing Older Functions with the `subprocess` Module

In this section, "a becomes b" means that b can be used as a replacement for a.

> **Note:** All "a" functions in this section fail (more or less) silently if the
> executed program cannot be found; the "b" replacements raise `OSError`
> instead.
>
> In addition, the replacements using `check_output()` will fail with a
> `CalledProcessError` if the requested operation produces a non-zero
> return code. The output is still available as the
> `output` attribute of the raised exception.

In the following examples, we assume that the relevant functions have already
been imported from the `subprocess` module.

### Replacing `/bin/sh` shell command substitution

```bash
output=$(mycmd myarg)
```

becomes:

```
output = check_output(["mycmd", "myarg"])
```

### Replacing shell pipeline

```bash
output=$(dmesg | grep hda)
```

becomes:

```
p1 = Popen(["dmesg"], stdout=PIPE)
p2 = Popen(["grep", "hda"], stdin=p1.stdout, stdout=PIPE)
p1.stdout.close()  # Allow p1 to receive a SIGPIPE if p2 exits.
output = p2.communicate()[0]
```

The `p1.stdout.close()` call after starting the p2 is important in order for
p1 to receive a SIGPIPE if p2 exits before p1.

Alternatively, for trusted input, the shell's own pipeline support may still
be used directly:

```bash
output=$(dmesg | grep hda)
```

becomes:

```
output = check_output("dmesg | grep hda", shell=True)
```

### Replacing `os.system()`

```
sts = os.system("mycmd" + " myarg")
# becomes
retcode = call("mycmd" + " myarg", shell=True)
```

Notes:

- Calling the program through the shell is usually not required.
- The `call()` return value is encoded differently to that of
`os.system()`.

- The `os.system()` function ignores SIGINT and SIGQUIT signals while
the command is running, but the caller must do this separately when
using the `subprocess` module.

A more realistic example would look like this:

```
try:
    retcode = call("mycmd" + " myarg", shell=True)
    if retcode < 0:
        print("Child was terminated by signal", -retcode, file=sys.stderr)
    else:
        print("Child returned", retcode, file=sys.stderr)
except OSError as e:
    print("Execution failed:", e, file=sys.stderr)
```

### Replacing the `os.spawn()` family

P_NOWAIT example:

```
pid = os.spawnlp(os.P_NOWAIT, "/bin/mycmd", "mycmd", "myarg")
==>
pid = Popen(["/bin/mycmd", "myarg"]).pid
```

P_WAIT example:

```
retcode = os.spawnlp(os.P_WAIT, "/bin/mycmd", "mycmd", "myarg")
==>
retcode = call(["/bin/mycmd", "myarg"])
```

Vector example:

```
os.spawnvp(os.P_NOWAIT, path, args)
==>
Popen([path] + args[1:])
```

Environment example:

```
os.spawnlpe(os.P_NOWAIT, "/bin/mycmd", "mycmd", "myarg", env)
==>
Popen(["/bin/mycmd", "myarg"], env={"PATH": "/usr/bin"})
```

### Replacing `os.popen()`

Return code handling translates as follows:

```
pipe = os.popen(cmd, 'w')
...
rc = pipe.close()
if rc is not None and rc >> 8:
    print("There were some errors")
==>
process = Popen(cmd, stdin=PIPE)
...
process.stdin.close()
if process.wait() != 0:
    print("There were some errors")
```
