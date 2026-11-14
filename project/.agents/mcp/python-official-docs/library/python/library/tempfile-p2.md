---
title: "tempfile --- Generate temporary files and directories (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tempfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tempfile --- Generate temporary files and directories (part 2 of 2)

### `tempdir`

When set to a value other than `None`, this variable defines the
default value for the *dir* argument to the functions defined in this
module, including its type, bytes or str.  It cannot be a
path-like object.

If `tempdir` is `None` (the default) at any call to any of the above
functions except `gettempprefix()` it is initialized following the
algorithm described in `gettempdir()`.

> **Note:** Beware that if you set `tempdir` to a bytes value, there is a
> nasty side effect: The global default return type of
> `mkstemp()` and `mkdtemp()` changes to bytes when no
> explicit `prefix`, `suffix`, or `dir` arguments of type
> str are supplied. Please do not write code expecting or
> depending on this. This awkward behavior is maintained for
> compatibility with the historical implementation.

## Examples

Here are some examples of typical usage of the `tempfile` module:

```
>>> import tempfile

# create a temporary file and write some data to it
>>> fp = tempfile.TemporaryFile()
>>> fp.write(b'Hello world!')
# read data from file
>>> fp.seek(0)
>>> fp.read()
b'Hello world!'
# close the file, it will be removed
>>> fp.close()

# create a temporary file using a context manager
>>> with tempfile.TemporaryFile() as fp:
...     fp.write(b'Hello world!')
...     fp.seek(0)
...     fp.read()
b'Hello world!'
>>>
# file is now closed and removed

# create a temporary file using a context manager
# close the file, use the name to open the file again
>>> with tempfile.NamedTemporaryFile(delete_on_close=False) as fp:
...     fp.write(b'Hello world!')
...     fp.close()
... # the file is closed, but not removed
... # open the file again by using its name
...     with open(fp.name, mode='rb') as f:
...         f.read()
b'Hello world!'
>>>
# file is now removed

# create a temporary directory using the context manager
>>> with tempfile.TemporaryDirectory() as tmpdirname:
...     print('created temporary directory', tmpdirname)
>>>
# directory and contents have been removed
```

## Deprecated functions and variables

A historical way to create temporary files was to first generate a
file name with the `mktemp()` function and then create a file
using this name. Unfortunately this is not secure, because a different
process may create a file with this name in the time between the call
to `mktemp()` and the subsequent attempt to create the file by the
first process. The solution is to combine the two steps and create the
file immediately. This approach is used by `mkstemp()` and the
other functions described above.

### `mktemp(suffix='', prefix='tmp', dir=None)`

> *Deprecated since version 2.3.*
> Use `mkstemp()` instead.

Return an absolute pathname of a file that did not exist at the time the
call is made.  The *prefix*, *suffix*, and *dir* arguments are similar
to those of `mkstemp()`, except that bytes file names, `suffix=None`
and `prefix=None` are not supported.

> **Warning:** Use of this function may introduce a security hole in your program.  By
> the time you get around to doing anything with the file name it returns,
> someone else may have beaten you to the punch.  `mktemp()` usage can
> be replaced easily with `NamedTemporaryFile()`, passing it the
> `delete=False` parameter:
>
>
> ```
> >>> f = NamedTemporaryFile(delete=False)
> >>> f.name
> '/tmp/tmptjujjt'
> >>> f.write(b"Hello World!\n")
> 13
> >>> f.close()
> >>> os.unlink(f.name)
> >>> os.path.exists(f.name)
> False
> ```
>
