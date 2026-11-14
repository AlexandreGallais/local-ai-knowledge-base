---
title: "pathlib --- Object-oriented filesystem paths (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pathlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pathlib --- Object-oriented filesystem paths (part 3 of 6)

### `PurePath.relative_to(other, walk_up=False)`

Compute a version of this path relative to the path represented by
*other*.  If it's impossible, `ValueError` is raised:

```
>>> p = PurePosixPath('<example-value>')
>>> p.relative_to('/')
PurePosixPath('<example-value>')
>>> p.relative_to('/etc')
PurePosixPath('<example-value>')
>>> p.relative_to('/usr')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "pathlib.py", line 941, in relative_to
    raise ValueError(error_message.format(str(self), str(formatted)))
ValueError: '<example-value>' is not in the subpath of '<example-value>' OR one path is relative and the other is absolute.
```

When *walk_up* is false (the default), the path must start with *other*.
When the argument is true, `..` entries may be added to form the
relative path. In all other cases, such as the paths referencing
different drives, `ValueError` is raised.:

```
>>> p.relative_to('/usr', walk_up=True)
PurePosixPath('<example-value>')
>>> p.relative_to('foo', walk_up=True)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "pathlib.py", line 941, in relative_to
    raise ValueError(error_message.format(str(self), str(formatted)))
ValueError: '<example-value>' is not on the same drive as '<example-value>' OR one path is relative and the other is absolute.
```

> **Warning:** This function is part of `PurePath` and works with strings.
> It does not check or access the underlying file structure.
> This can impact the *walk_up* option as it assumes that no symlinks
> are present in the path; call `resolve()` first if
> necessary to resolve symlinks.

> *Changed in version 3.12.*
> The *walk_up* parameter was added (old behavior is the same as `walk_up=False`).

> *Deprecated since version 3.12, removed in version 3.14.*
> Passing additional positional arguments is deprecated; if supplied,
> they are joined with *other*.

### `PurePath.with_name(name)`

Return a new path with the `name` changed.  If the original path
doesn't have a name, ValueError is raised:

```
>>> p = PureWindowsPath('c:/Downloads/pathlib.tar.gz')
>>> p.with_name('setup.py')
PureWindowsPath('c:/Downloads/setup.py')
>>> p = PureWindowsPath('c:/')
>>> p.with_name('setup.py')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/antoine/cpython/default/Lib/pathlib.py", line 751, in with_name
    raise ValueError("%r has an empty name" % (self,))
ValueError: PureWindowsPath('c:/') has an empty name
```

### `PurePath.with_stem(stem)`

Return a new path with the `stem` changed.  If the original path
doesn't have a name, ValueError is raised:

```
>>> p = PureWindowsPath('c:/Downloads/draft.txt')
>>> p.with_stem('final')
PureWindowsPath('c:/Downloads/final.txt')
>>> p = PureWindowsPath('c:/Downloads/pathlib.tar.gz')
>>> p.with_stem('lib')
PureWindowsPath('c:/Downloads/lib.gz')
>>> p = PureWindowsPath('c:/')
>>> p.with_stem('')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/antoine/cpython/default/Lib/pathlib.py", line 861, in with_stem
    return self.with_name(stem + self.suffix)
  File "/home/antoine/cpython/default/Lib/pathlib.py", line 851, in with_name
    raise ValueError("%r has an empty name" % (self,))
ValueError: PureWindowsPath('c:/') has an empty name
```

> *Added in version 3.9.*

### `PurePath.with_suffix(suffix)`

Return a new path with the `suffix` changed.  If the original path
doesn't have a suffix, the new *suffix* is appended instead.  If the
*suffix* is an empty string, the original suffix is removed:

```
>>> p = PureWindowsPath('c:/Downloads/pathlib.tar.gz')
>>> p.with_suffix('.bz2')
PureWindowsPath('c:/Downloads/pathlib.tar.bz2')
>>> p = PureWindowsPath('README')
>>> p.with_suffix('.txt')
PureWindowsPath('README.txt')
>>> p = PureWindowsPath('README.txt')
>>> p.with_suffix('')
PureWindowsPath('README')
```

> *Changed in version 3.14.*
> A single dot ("`.`") is considered a valid suffix. In previous
> versions, `ValueError` is raised if a single dot is supplied.

### `PurePath.with_segments(*pathsegments)`

Create a new path object of the same type by combining the given
*pathsegments*. This method is called whenever a derivative path is created,
such as from `parent` and `relative_to()`. Subclasses may
override this method to pass <example-value> to derivative paths, for example:

```
from pathlib import PurePosixPath

class MyPath(PurePosixPath):
    def __init__(self, *pathsegments, session_id):
        super().__init__(*pathsegments)
        self.session_id = session_id

    def with_segments(self, *pathsegments):
        return type(self)(*pathsegments, session_id=self.session_id)

etc = MyPath('/etc', session_id=42)
hosts = etc / 'hosts'
print(hosts.session_id)  # 42
```

> *Added in version 3.12.*
