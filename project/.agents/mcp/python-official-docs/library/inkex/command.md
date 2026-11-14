# inkex.command

This API provides methods for calling Inkscape to execute a given
Inkscape command. This may be needed for various compiling options
(e.g., png), running other extensions or performing other options only
available via the shell API.

Best practice is to avoid using this API except when absolutely necessary,
since it is resource-intensive to invoke a new Inkscape instance.

However, in any circumstance when it is necessary to call Inkscape, it
is strongly recommended that you do so through this API, rather than calling
it yourself, to take advantage of the security settings and testing functions.

## class CommandNotFound

```python
class CommandNotFound(IOError)
```

Command is not found

## class ProgramRunError

```python
class ProgramRunError(ValueError)
```

A specialized ValueError that is raised when a call to an external command fails.
It stores additional information about a failed call to an external program.

If only the ``program`` parameter is given, it is interpreted as the error message.
Otherwise, the error message is compiled from all constructor parameters.

## which

```python
def which(program)
```

Attempt different methods of trying to find if the program exists.

## write_svg

```python
def write_svg(svg, *filename)
```

Writes an svg to the given filename

## to_arg

```python
def to_arg(arg, oldie=False)
```

Convert a python argument to a command line argument

## to_args

```python
def to_args(prog, *positionals, **arguments)
```

Compile arguments and keyword arguments into a list of strings which Popen will
understand.

:param prog:
    Program executable prepended to the output.
:type first: ``str``

:Arguments:
    * (``str``) -- String added as given
    * (``tuple``) -- Ordered version of Keyword Arguments, see below

:Keyword Arguments:
    * *name* (``str``) --
      Becomes ``--name="val"``
    * *name* (``bool``) --
      Becomes ``--name``
    * *name* (``list``) --
      Becomes ``--name="val1"`` ...
    * *n* (``str``) --
      Becomes ``-n=val``
    * *n* (``bool``) --
      Becomes ``-n``

:return: Returns a list of compiled arguments ready for Popen.
:rtype: ``list[str]``

## to_args_sorted

```python
def to_args_sorted(prog, *positionals, **arguments)
```

same as :func:`to_args`, but keyword arguments are sorted beforehand

.. versionadded:: 1.2

## call

```python
def call(program, *args, **kwargs)
```

Generic caller to open any program and return its stdout::

    stdout = call('executable', arg1, arg2, dash_dash_arg='foo', d=True, ...)

Will raise :class:`ProgramRunError` if return code is not 0.

Keyword arguments:
    return_binary: Should stdout return raw bytes (default: False)

        .. versionadded:: 1.1
    stdin: The string or bytes containing the stdin (default: None)

All other arguments converted using :func:`to_args` function.

## inkscape

```python
def inkscape(svg_file, *args, **kwargs)
```

Call Inkscape with the given svg_file and the given arguments, see call().

Returns the stdout of the call.

.. versionchanged:: 1.3
    If the "actions" kwargs parameter is passed, it is checked whether the length of
    the action string might lead to issues with the Windows CLI call character
    limit. In this case, Inkscape is called in `--shell`
    mode and the actions are fed in via stdin. This avoids violating the character
    limit for command line arguments on Windows, which results in errors like this:
    `[WinError 206] The filename or extension is too long`.
    This workaround is also possible when calling Inkscape with long arguments
    to `--export-id` and `--query-id`, by converting the call to the appropriate
    action sequence. The stdout is cleaned to resemble non-interactive mode.

## inkscape_command

```python
def inkscape_command(svg, select=None, actions=None, *args, **kwargs)
```

Executes Inkscape batch actions with the given <svg> input and returns a new <svg>.

inkscape_command('<svg...>', [select=...], [actions=...], [...])

## take_snapshot

```python
def take_snapshot(svg, dirname, name="snapshot", ext="png", dpi=96, **kwargs)
```

Take a snapshot of the given svg file.

Resulting filename is yielded back, after generator finishes, the
file is deleted so you must deal with the file inside the for loop.

## is_inkscape_available

```python
def is_inkscape_available()
```

Return true if the Inkscape executable is available.