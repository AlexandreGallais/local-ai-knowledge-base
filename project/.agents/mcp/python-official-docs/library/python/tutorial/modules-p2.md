---
title: "Modules (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/tutorial/modules.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Modules (part 2 of 2)

## The `dir()` Function

The built-in function `dir()` is used to find out which names a module
defines.  It returns a sorted list of strings:

```
>>> import fibo, sys
>>> dir(fibo)
['__name__', 'fib', 'fib2']
>>> dir(sys)  # doctest: +NORMALIZE_WHITESPACE
['__breakpointhook__', '__displayhook__', '__doc__', '__excepthook__',
 '__interactivehook__', '__loader__', '__name__', '__package__', '__spec__',
 '__stderr__', '__stdin__', '__stdout__', '__unraisablehook__',
 '_clear_type_cache', '_current_frames', '_debugmallocstats', '_framework',
 '_getframe', '_git', '_home', '_xoptions', 'abiflags', 'addaudithook',
 'api_version', 'argv', 'audit', 'base_exec_prefix', 'base_prefix',
 'breakpointhook', 'builtin_module_names', 'byteorder', 'call_tracing',
 'callstats', 'copyright', 'displayhook', 'dont_write_bytecode', 'exc_info',
 'excepthook', 'exec_prefix', 'executable', 'exit', 'flags', 'float_info',
 'float_repr_style', 'get_asyncgen_hooks', 'get_coroutine_origin_tracking_depth',
 'getallocatedblocks', 'getdefaultencoding', 'getdlopenflags',
 'getfilesystemencodeerrors', 'getfilesystemencoding', 'getprofile',
 'getrecursionlimit', 'getrefcount', 'getsizeof', 'getswitchinterval',
 'gettrace', 'hash_info', 'hexversion', 'implementation', 'int_info',
 'intern', 'is_finalizing', 'last_traceback', 'last_type', 'last_value',
 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path', 'path_hooks',
 'path_importer_cache', 'platform', 'prefix', 'ps1', 'ps2', 'pycache_prefix',
 'set_asyncgen_hooks', 'set_coroutine_origin_tracking_depth', 'setdlopenflags',
 'setprofile', 'setrecursionlimit', 'setswitchinterval', 'settrace', 'stderr',
 'stdin', 'stdout', 'thread_info', 'unraisablehook', 'version', 'version_info',
 'warnoptions']
```

Without arguments, `dir()` lists the names you have defined currently:

```
>>> a = [1, 2, 3, 4, 5]
>>> import fibo
>>> fib = fibo.fib
>>> dir()
['__builtins__', '__name__', 'a', 'fib', 'fibo', 'sys']
```

Note that it lists all types of names: variables, modules, functions, etc.

`dir()` does not list the names of built-in functions and variables.  If you
want a list of those, they are defined in the standard module
`builtins`:

```
>>> import builtins
>>> dir(builtins)  # doctest: +NORMALIZE_WHITESPACE
['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException',
 'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning',
 'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError',
 'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning',
 'EOFError', 'Ellipsis', 'EnvironmentError', 'Exception', 'False',
 'FileExistsError', 'FileNotFoundError', 'FloatingPointError',
 'FutureWarning', 'GeneratorExit', 'IOError', 'ImportError',
 'ImportWarning', 'IndentationError', 'IndexError', 'InterruptedError',
 'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError',
 'MemoryError', 'NameError', 'None', 'NotADirectoryError', 'NotImplemented',
 'NotImplementedError', 'OSError', 'OverflowError',
 'PendingDeprecationWarning', 'PermissionError', 'ProcessLookupError',
 'ReferenceError', 'ResourceWarning', 'RuntimeError', 'RuntimeWarning',
 'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError',
 'SystemExit', 'TabError', 'TimeoutError', 'True', 'TypeError',
 'UnboundLocalError', 'UnicodeDecodeError', 'UnicodeEncodeError',
 'UnicodeError', 'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning',
 'ValueError', 'Warning', 'ZeroDivisionError', '_', '__build_class__',
 '__debug__', '__doc__', '__import__', '__name__', '__package__', 'abs',
 'all', 'any', 'ascii', 'bin', 'bool', 'bytearray', 'bytes', 'callable',
 'chr', 'classmethod', 'compile', 'complex', 'copyright', 'credits',
 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit',
 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr',
 'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass',
 'iter', 'len', 'license', 'list', 'locals', 'map', 'max', 'memoryview',
 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property',
 'quit', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice',
 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars',
 'zip']
```

## Packages

Packages are a way of structuring Python's module namespace by using "dotted
module names".  For example, the module name `A.B` designates a submodule
named `B` in a package named `A`.  Just like the use of modules saves the
authors of different modules from having to worry about each other's global
variable names, the use of dotted module names saves the authors of multi-module
packages like NumPy or Pillow from having to worry about
each other's module names.

Suppose you want to design a collection of modules (a "package") for the uniform
handling of sound files and sound data.  There are many different sound file
formats (usually recognized by their extension, for example: `.wav`,
`.aiff`, `.au`), so you may need to create and maintain a growing
collection of modules for the conversion between the various file formats.
There are also many different operations you might want to perform on sound data
(such as mixing, adding echo, applying an equalizer function, creating an
artificial stereo effect), so in addition you will be writing a never-ending
stream of modules to perform these operations.  Here's a possible structure for
your package (expressed in terms of a hierarchical filesystem):

```text
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

When importing the package, Python searches through the directories on
`sys.path` looking for the package subdirectory.

The `__init__.py` files are required to make Python treat directories
containing the file as packages (unless using a namespace package, a
relatively advanced feature). This prevents directories with a common name,
such as `string`, from unintentionally hiding valid modules that occur later
on the module search path. In the simplest case, `__init__.py` can just be
an empty file, but it can also execute initialization code for the package or
set the `__all__` variable, described later.

Users of the package can import individual modules from the package, for
example:

```
import sound.effects.echo
```

This loads the submodule `sound.effects.echo`.  It must be referenced with
its full name.:

```
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

An alternative way of importing the submodule is:

```
from sound.effects import echo
```

This also loads the submodule `echo`, and makes it available without its
package prefix, so it can be used as follows:

```
echo.echofilter(input, output, delay=0.7, atten=4)
```

Yet another variation is to import the desired function or variable directly:

```
from sound.effects.echo import echofilter
```

Again, this loads the submodule `echo`, but this makes its function
`echofilter()` directly available:

```
echofilter(input, output, delay=0.7, atten=4)
```

Note that when using `from package import item`, the item can be either a
submodule (or subpackage) of the package, or some  other name defined in the
package, like a function, class or variable.  The `import` statement first
tests whether the item is defined in the package; if not, it assumes it is a
module and attempts to load it.  If it fails to find it, an `ImportError`
exception is raised.

Contrarily, when using syntax like `import item.subitem.subsubitem`, each item
except for the last must be a package; the last item can be a module or a
package but can't be a class or function or variable defined in the previous
item.

### Importing * From a Package

Now what happens when the user writes `from sound.effects import *`?  Ideally,
one would hope that this somehow goes out to the filesystem, finds which
submodules are present in the package, and imports them all.  This could take a
long time and importing sub-modules might have unwanted side-effects that should
only happen when the sub-module is explicitly imported.

The only solution is for the package author to provide an explicit index of the
package.  The `import` statement uses the following convention: if a package's
`__init__.py` code defines a list named `__all__`, it is taken to be the
list of module names that should be imported when `from package import *` is
encountered.  It is up to the package author to keep this list up-to-date when a
new version of the package is released.  Package authors may also decide not to
support it, if they don't see a use for importing * from their package.  For
example, the file `sound/effects/__init__.py` could contain the following
code:

```
__all__ = ["echo", "surround", "reverse"]
```

This would mean that `from sound.effects import *` would import the three
named submodules of the `sound.effects` package.

Be aware that submodules might become shadowed by locally defined names. For
example, if you added a `reverse` function to the
`sound/effects/__init__.py` file, the `from sound.effects import *`
would only import the two submodules `echo` and `surround`, but *not* the
`reverse` submodule, because it is shadowed by the locally defined
`reverse` function:

```
__all__ = [
    "echo",      # refers to the 'echo.py' file
    "surround",  # refers to the 'surround.py' file
    "reverse",   # !!! refers to the 'reverse' function now !!!
]

def reverse(msg: str):  # <-- this name shadows the 'reverse.py' submodule
    return msg[::-1]    #     in the case of a 'from sound.effects import *'
```

If `__all__` is not defined, the statement `from sound.effects import *`
does *not* import all submodules from the package `sound.effects` into the
current namespace; it only ensures that the package `sound.effects` has
been imported (possibly running any initialization code in `__init__.py`)
and then imports whatever names are defined in the package.  This includes any
names defined (and submodules explicitly loaded) by `__init__.py`.  It
also includes any submodules of the package that were explicitly loaded by
previous `import` statements.  Consider this code:

```
import sound.effects.echo
import sound.effects.surround
from sound.effects import *
```

In this example, the `echo` and `surround` modules are imported in the
current namespace because they are defined in the `sound.effects` package
when the `from...import` statement is executed.  (This also works when
`__all__` is defined.)

Although certain modules are designed to export only names that follow certain
patterns when you use `import *`, it is still considered bad practice in
production code.

Remember, there is nothing wrong with using ``from package import
specific_submodule``!  In fact, this is the recommended notation unless the
importing module needs to use submodules with the same name from different
packages.

### Intra-package References

When packages are structured into subpackages (as with the `sound` package
in the example), you can use absolute imports to refer to submodules of siblings
packages.  For example, if the module `sound.filters.vocoder` needs to use
the `echo` module in the `sound.effects` package, it can use ``from
sound.effects import echo``.

You can also write relative imports, with the `from module import name` form
of import statement.  These imports use leading dots to indicate the current and
parent packages involved in the relative import.  From the `surround`
module for example, you might use:

```
from . import echo
from .. import formats
from ..filters import equalizer
```

Note that relative imports are based on the name of the current module's package.
Since the main module does not have a package, modules intended for use
as the main module of a Python application must always use absolute imports.

**Footnotes**
