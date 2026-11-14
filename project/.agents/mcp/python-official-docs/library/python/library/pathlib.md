---
title: "pathlib --- Object-oriented filesystem paths (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pathlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `pathlib` --- Object-oriented filesystem paths

Module `pathlib`.

> *Added in version 3.4.*

**Source code:** Lib/pathlib/

This module offers classes representing filesystem paths with semantics
appropriate for different operating systems.  Path classes are divided
between pure paths, which provide purely computational
operations without I/O, and concrete paths, which
inherit from pure paths but also provide I/O operations.

If you've never used this module before or just aren't sure which class is
right for your task, `Path` is most likely what you need. It instantiates
a concrete path for the platform the code is running on.

Pure paths are useful in some special cases; for example:

1. If you want to manipulate Windows paths on a Unix machine (or vice versa).
You cannot instantiate a `WindowsPath` when running on Unix, but you
can instantiate `PureWindowsPath`.
1. You want to make sure that your code only manipulates paths without actually
accessing the OS. In this case, instantiating one of the pure classes may be
useful since those simply don't have any OS-accessing operations.

> **See also:** PEP 428: The pathlib module -- object-oriented filesystem paths.

> **See also:** For low-level path manipulation on strings, you can also use the
> `os.path` module.

## Basic use

Importing the main class:

```
>>> from pathlib import Path
```

Listing subdirectories:

```
>>> p = Path('.')
>>> [x for x in p.iterdir() if x.is_dir()]
[PosixPath('.hg'), PosixPath('docs'), PosixPath('dist'),
 PosixPath('__pycache__'), PosixPath('build')]
```

Listing Python source files in this directory tree:

```
>>> list(p.glob('**/*.py'))
[PosixPath('test_pathlib.py'), PosixPath('setup.py'),
 PosixPath('pathlib.py'), PosixPath('docs/conf.py'),
 PosixPath('build/lib/pathlib.py')]
```

Navigating inside a directory tree:

```
>>> p = Path('/etc')
>>> q = p / 'init.d' / 'reboot'
>>> q
PosixPath('/etc/init.d/reboot')
>>> q.resolve()
PosixPath('/etc/rc.d/init.d/halt')
```

Querying path properties:

```
>>> q.exists()
True
>>> q.is_dir()
False
```

Opening a file:

```
>>> with q.open() as f: f.readline()
...
'#!/bin/bash\n'
```

## Exceptions

### exception `UnsupportedOperation`

An exception inheriting `NotImplementedError` that is raised when an
unsupported operation is called on a path object.

> *Added in version 3.13.*
